import * as React from 'react';
import { Admin } from 'react-admin';
import { Resource, required, useCreate, useRecordContext } from 'ra-core';
import polyglotI18nProvider from 'ra-i18n-polyglot';
import englishMessages from 'ra-language-english';
import fakeRestDataProvider from 'ra-data-fakerest';
import { createMemoryHistory } from 'history';
import {
    Dialog,
    DialogContent,
    TextField,
    DialogActions,
    Button,
    Stack,
} from '@mui/material';
import { useFormContext } from 'react-hook-form';

import { AdminContext } from '../AdminContext';
import { Create, Edit } from '../detail';
import { SimpleForm } from '../form';
import {
    AutocompleteArrayInput,
    AutocompleteArrayInputProps,
} from './AutocompleteArrayInput';
import { ReferenceArrayInput } from './ReferenceArrayInput';
import { useCreateSuggestionContext } from './useSupportCreateSuggestion';
import { TextInput } from './TextInput';
import { ArrayInput, SimpleFormIterator } from './ArrayInput';
import { AdminUI } from '../AdminUI';
import { Datagrid, List } from '../list';
import { TextField as RATextField } from '../field';

export default { title: 'ra-ui-materialui/input/AutocompleteArrayInput' };

const i18nProvider = polyglotI18nProvider(() => englishMessages);

export const Basic = () => (
    <AdminContext i18nProvider={i18nProvider}>
        <Create
            resource="posts"
            record={{ roles: ['u001', 'u003'] }}
            sx={{ width: 600 }}
        >
            <SimpleForm>
                <AutocompleteArrayInput
                    source="roles"
                    choices={[
                        { id: 'admin', name: 'Admin' },
                        { id: 'u001', name: 'Editor' },
                        { id: 'u002', name: 'Moderator' },
                        { id: 'u003', name: 'Reviewer' },
                    ]}
                />
            </SimpleForm>
        </Create>
    </AdminContext>
);

export const OnChange = ({
    onChange = (value, records) => console.log({ value, records }),
}: Pick<AutocompleteArrayInputProps, 'onChange'>) => (
    <AdminContext i18nProvider={i18nProvider}>
        <Create
            resource="posts"
            record={{ roles: ['u001', 'u003'] }}
            sx={{ width: 600 }}
        >
            <SimpleForm>
                <AutocompleteArrayInput
                    source="roles"
                    choices={[
                        { id: 'admin', name: 'Admin' },
                        { id: 'u001', name: 'Editor' },
                        { id: 'u002', name: 'Moderator' },
                        { id: 'u003', name: 'Reviewer' },
                    ]}
                    onChange={onChange}
                />
            </SimpleForm>
        </Create>
    </AdminContext>
);

const choices = [
    { id: 'admin', name: 'Admin' },
    { id: 'u001', name: 'Editor' },
    { id: 'u002', name: 'Moderator' },
    { id: 'u003', name: 'Reviewer' },
];

const CreateRole = () => {
    const { filter, onCancel, onCreate } = useCreateSuggestionContext();
    const [value, setValue] = React.useState(filter || '');

    const handleSubmit = event => {
        event.preventDefault();
        const newOption = { id: value, name: value };
        choices.push(newOption);
        setValue('');
        onCreate(newOption);
    };

    return (
        <Dialog open onClose={onCancel}>
            <form onSubmit={handleSubmit}>
                <DialogContent>
                    <TextField
                        label="Role name"
                        value={value}
                        onChange={event => setValue(event.target.value)}
                        autoFocus
                    />
                </DialogContent>
                <DialogActions>
                    <Button type="submit">Save</Button>
                    <Button onClick={onCancel}>Cancel</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export const CreateProp = () => (
    <AdminContext i18nProvider={i18nProvider}>
        <Create
            resource="users"
            record={{ roles: ['u001', 'u003'] }}
            sx={{ width: 600 }}
        >
            <SimpleForm>
                <AutocompleteArrayInput
                    source="roles"
                    choices={choices}
                    sx={{ width: 400 }}
                    create={<CreateRole />}
                />
            </SimpleForm>
        </Create>
    </AdminContext>
);

const dataProvider = {
    getOne: () =>
        Promise.resolve({
            data: {
                id: 1,
                title: 'War and Peace',
                author: [1, 2],
                summary:
                    "War and Peace broadly focuses on Napoleon's invasion of Russia, and the impact it had on Tsarist society. The book explores themes such as revolution, revolution and empire, the growth and decline of various states and the impact it had on their economies, culture, and society.",
                year: 1869,
            },
        }),
    update: (_resource, params) => Promise.resolve(params),
} as any;

const history = createMemoryHistory({ initialEntries: ['/books/1'] });

const BookEdit = () => {
    const choices = [
        { id: 1, name: 'Leo Tolstoy' },
        { id: 2, name: 'Victor Hugo' },
        { id: 3, name: 'William Shakespeare' },
        { id: 4, name: 'Charles Baudelaire' },
        { id: 5, name: 'Marcel Proust' },
    ];
    return (
        <Edit
            mutationMode="pessimistic"
            mutationOptions={{
                onSuccess: data => {
                    console.log(data);
                },
            }}
        >
            <SimpleForm>
                <AutocompleteArrayInput
                    source="author"
                    choices={choices}
                    validate={required()}
                    fullWidth
                />
            </SimpleForm>
        </Edit>
    );
};

export const InEdit = () => (
    <Admin dataProvider={dataProvider} history={history}>
        <Resource name="books" edit={BookEdit} />
    </Admin>
);

const BookEditCustomText = () => {
    const choices = [
        { id: 1, fullName: 'Leo Tolstoy' },
        { id: 2, fullName: 'Victor Hugo' },
        { id: 3, fullName: 'William Shakespeare' },
        { id: 4, fullName: 'Charles Baudelaire' },
        { id: 5, fullName: 'Marcel Proust' },
    ];
    return (
        <Edit
            mutationMode="pessimistic"
            mutationOptions={{
                onSuccess: data => {
                    console.log(data);
                },
            }}
        >
            <SimpleForm>
                <AutocompleteArrayInput
                    source="author"
                    optionText="fullName"
                    choices={choices}
                    fullWidth
                />
            </SimpleForm>
        </Edit>
    );
};

export const CustomText = () => (
    <Admin dataProvider={dataProvider} history={history}>
        <Resource name="books" edit={BookEditCustomText} />
    </Admin>
);

const BookEditCustomTextFunction = () => {
    const choices = [
        { id: 1, fullName: 'Leo Tolstoy' },
        { id: 2, fullName: 'Victor Hugo' },
        { id: 3, fullName: 'William Shakespeare' },
        { id: 4, fullName: 'Charles Baudelaire' },
        { id: 5, fullName: 'Marcel Proust' },
    ];
    return (
        <Edit
            mutationMode="pessimistic"
            mutationOptions={{
                onSuccess: data => {
                    console.log(data);
                },
            }}
        >
            <SimpleForm>
                <AutocompleteArrayInput
                    source="author"
                    optionText={choice => choice?.fullName}
                    choices={choices}
                    fullWidth
                />
            </SimpleForm>
        </Edit>
    );
};

export const CustomTextFunction = () => (
    <Admin dataProvider={dataProvider} history={history}>
        <Resource name="books" edit={BookEditCustomTextFunction} />
    </Admin>
);

const CustomOption = () => {
    const record = useRecordContext();
    return (
        <div>
            {record?.fullName}&nbsp;<i>({record?.language})</i>
        </div>
    );
};

const BookEditCustomOptions = () => {
    const choices = [
        { id: 1, fullName: 'Leo Tolstoy', language: 'Russian' },
        { id: 2, fullName: 'Victor Hugo', language: 'French' },
        { id: 3, fullName: 'William Shakespeare', language: 'English' },
        { id: 4, fullName: 'Charles Baudelaire', language: 'French' },
        { id: 5, fullName: 'Marcel Proust', language: 'French' },
    ];
    return (
        <Edit
            mutationMode="pessimistic"
            mutationOptions={{
                onSuccess: data => {
                    console.log(data);
                },
            }}
        >
            <SimpleForm>
                <AutocompleteArrayInput
                    source="author"
                    optionText={<CustomOption />}
                    inputText={record =>
                        `${record.fullName} (${record.language})`
                    }
                    matchSuggestion={(searchText, record) => {
                        const searchTextLower = searchText.toLowerCase();
                        return (
                            record.fullName
                                .toLowerCase()
                                .includes(searchTextLower) ||
                            record.language
                                .toLowerCase()
                                .includes(searchTextLower)
                        );
                    }}
                    choices={choices}
                    fullWidth
                />
            </SimpleForm>
        </Edit>
    );
};

export const CustomOptions = () => (
    <Admin dataProvider={dataProvider} history={history}>
        <Resource name="books" edit={BookEditCustomOptions} />
    </Admin>
);

const choicesForCreationSupport = [
    { id: 1, name: 'Leo Tolstoy' },
    { id: 2, name: 'Victor Hugo' },
    { id: 3, name: 'William Shakespeare' },
    { id: 4, name: 'Charles Baudelaire' },
    { id: 5, name: 'Marcel Proust' },
];
const BookEditWithCreationSupport = () => (
    <Edit
        mutationMode="pessimistic"
        mutationOptions={{
            onSuccess: data => {
                console.log(data);
            },
        }}
    >
        <SimpleForm>
            <AutocompleteArrayInput
                source="author"
                choices={choicesForCreationSupport}
                onCreate={filter => {
                    const newAuthorName = window.prompt(
                        'Enter a new author',
                        filter
                    );

                    if (newAuthorName) {
                        const newAuthor = {
                            id: choicesForCreationSupport.length + 1,
                            name: newAuthorName,
                        };
                        choicesForCreationSupport.push(newAuthor);
                        return newAuthor;
                    }
                }}
                fullWidth
            />
        </SimpleForm>
    </Edit>
);

export const CreationSupport = () => (
    <Admin dataProvider={dataProvider} history={history}>
        <Resource name="books" edit={BookEditWithCreationSupport} />
    </Admin>
);

const authors = [
    { id: 1, name: 'Leo Tolstoy', language: 'Russian' },
    { id: 2, name: 'Victor Hugo', language: 'French' },
    { id: 3, name: 'William Shakespeare', language: 'English' },
    { id: 4, name: 'Charles Baudelaire', language: 'French' },
    { id: 5, name: 'Marcel Proust', language: 'French' },
];

const dataProviderWithAuthors = {
    getOne: () =>
        Promise.resolve({
            data: {
                id: 1,
                title: 'War and Peace',
                author: [1, 2],
                summary:
                    "War and Peace broadly focuses on Napoleon's invasion of Russia, and the impact it had on Tsarist society. The book explores themes such as revolution, revolution and empire, the growth and decline of various states and the impact it had on their economies, culture, and society.",
                year: 1869,
            },
        }),
    getMany: (_resource, params) =>
        Promise.resolve({
            data: authors.filter(author => params.ids.includes(author.id)),
        }),
    getList: (_resource, params) =>
        new Promise(resolve => {
            // eslint-disable-next-line eqeqeq
            if (params.filter.q == undefined) {
                setTimeout(
                    () =>
                        resolve({
                            data: authors,
                            total: authors.length,
                        }),
                    500
                );
                return;
            }

            const filteredAuthors = authors.filter(author =>
                author.name
                    .toLowerCase()
                    .includes(params.filter.q.toLowerCase())
            );

            setTimeout(
                () =>
                    resolve({
                        data: filteredAuthors,
                        total: filteredAuthors.length,
                    }),
                500
            );
        }),
    update: (_resource, params) => Promise.resolve(params),
    create: (_resource, params) => {
        const newAuthor = {
            id: authors.length + 1,
            name: params.data.name,
            language: params.data.language,
        };
        authors.push(newAuthor);
        return Promise.resolve({ data: newAuthor });
    },
} as any;

const BookEditWithReference = () => (
    <Edit
        mutationMode="pessimistic"
        mutationOptions={{
            onSuccess: data => {
                console.log(data);
            },
        }}
    >
        <SimpleForm>
            <ReferenceArrayInput reference="authors" source="author">
                <AutocompleteArrayInput fullWidth optionText="name" />
            </ReferenceArrayInput>
        </SimpleForm>
    </Edit>
);

export const InsideReferenceArrayInput = () => (
    <Admin dataProvider={dataProviderWithAuthors} history={history}>
        <Resource name="authors" />
        <Resource name="books" edit={BookEditWithReference} />
    </Admin>
);

const LanguageChangingAuthorInput = ({ onChange }) => {
    const { setValue } = useFormContext();
    const handleChange = (value, records) => {
        setValue(
            'language',
            records?.map(record => record.language)
        );
        onChange(value, records);
    };
    return (
        <ReferenceArrayInput reference="authors" source="author">
            <AutocompleteArrayInput
                fullWidth
                optionText="name"
                onChange={handleChange}
                label="Authors"
            />
        </ReferenceArrayInput>
    );
};

export const InsideReferenceArrayInputOnChange = ({
    onChange = (value, records) => console.log({ value, records }),
}: Pick<AutocompleteArrayInputProps, 'onChange'>) => (
    <Admin
        dataProvider={dataProviderWithAuthors}
        history={createMemoryHistory({ initialEntries: ['/books/create'] })}
    >
        <Resource name="authors" />
        <Resource
            name="books"
            create={() => (
                <Create
                    mutationOptions={{
                        onSuccess: data => {
                            console.log(data);
                        },
                    }}
                    redirect={false}
                >
                    <SimpleForm>
                        <LanguageChangingAuthorInput onChange={onChange} />
                        <ArrayInput source="language" label="Languages">
                            <SimpleFormIterator>
                                <TextInput source="." label="Language" />
                            </SimpleFormIterator>
                        </ArrayInput>
                    </SimpleForm>
                </Create>
            )}
        />
    </Admin>
);

const CreateAuthor = () => {
    const { filter, onCancel, onCreate } = useCreateSuggestionContext();
    const [name, setName] = React.useState(filter || '');
    const [language, setLanguage] = React.useState('');
    const [create] = useCreate();

    const handleSubmit = event => {
        event.preventDefault();
        create(
            'authors',
            {
                data: {
                    name,
                    language,
                },
            },
            {
                onSuccess: ({ data }) => {
                    setName('');
                    setLanguage('');
                    onCreate(data);
                },
            }
        );
    };

    return (
        <Dialog open onClose={onCancel}>
            <form onSubmit={handleSubmit}>
                <DialogContent>
                    <Stack gap={4}>
                        <TextField
                            name="name"
                            label="The author name"
                            value={name}
                            onChange={event => setName(event.target.value)}
                            autoFocus
                        />
                        <TextField
                            name="language"
                            label="The author language"
                            value={language}
                            onChange={event => setLanguage(event.target.value)}
                            autoFocus
                        />
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button type="submit">Save</Button>
                    <Button onClick={onCancel}>Cancel</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

const BookEditWithReferenceAndCreationSupport = () => (
    <Edit
        mutationMode="pessimistic"
        mutationOptions={{
            onSuccess: data => {
                console.log(data);
            },
        }}
    >
        <SimpleForm>
            <ReferenceArrayInput reference="authors" source="author">
                <AutocompleteArrayInput
                    create={<CreateAuthor />}
                    fullWidth
                    optionText="name"
                />
            </ReferenceArrayInput>
        </SimpleForm>
    </Edit>
);

export const InsideReferenceArrayInputWithCreationSupport = () => (
    <Admin dataProvider={dataProviderWithAuthors} history={history}>
        <Resource name="authors" />
        <Resource name="books" edit={BookEditWithReferenceAndCreationSupport} />
    </Admin>
);

const booksDataProvider = fakeRestDataProvider({
    books: [
        {
            id: 1,
            title: 'War and Peace',
            author: 'Leo Tolstoy',
            year: 1869,
        },
        {
            id: 2,
            title: 'Pride and Predjudice',
            author: 'Jane Austen',
            year: 1813,
        },
        {
            id: 3,
            title: 'The Picture of Dorian Gray',
            author: 'Oscar Wilde',
            year: 1890,
        },
        {
            id: 4,
            title: 'Le Petit Prince',
            author: 'Antoine de Saint-Exupéry',
            year: 1943,
        },
        {
            id: 5,
            title: "Alice's Adventures in Wonderland",
            author: 'Lewis Carroll',
            year: 1865,
        },
        {
            id: 6,
            title: 'Madame Bovary',
            author: 'Gustave Flaubert',
            year: 1856,
        },
        {
            id: 7,
            title: 'The Lord of the Rings',
            author: 'J. R. R. Tolkien',
            year: 1954,
        },
        {
            id: 8,
            title: "Harry Potter and the Philosopher's Stone",
            author: 'J. K. Rowling',
            year: 1997,
        },
        {
            id: 9,
            title: 'The Alchemist',
            author: 'Paulo Coelho',
            year: 1988,
        },
        {
            id: 10,
            title: 'A Catcher in the Rye',
            author: 'J. D. Salinger',
            year: 1951,
        },
        {
            id: 11,
            title: 'Ulysses',
            author: 'James Joyce',
            year: 1922,
        },
    ],
    authors: [],
});

const listHistory = createMemoryHistory({ initialEntries: ['/books'] });

const postFilters: React.ReactElement[] = [
    <AutocompleteArrayInput
        label="Authors"
        source="author"
        choices={[
            { id: 'Leo Tolstoy', name: 'Leo' },
            { id: 'Jane Austen', name: 'Jane' },
            { id: 'Oscar Wilde', name: 'Oscar' },
            { id: 'Antoine de Saint-Exupéry', name: 'Antoine' },
            { id: 'Lewis Carroll', name: 'Lewis' },
            { id: 'Gustave Flaubert', name: 'Gustave' },
            { id: 'J. R. R. Tolkien', name: 'J. R. R.' },
            { id: 'J. K. Rowling', name: 'J. K.' },
            { id: 'Paulo Coelho', name: 'Paulo' },
            { id: 'J. D. Salinger', name: 'J. D.' },
            { id: 'James Joyce', name: 'James' },
        ]}
        alwaysOn
        multiple
    />,
];
export const AsListFilter = () => (
    <AdminContext
        dataProvider={booksDataProvider}
        i18nProvider={i18nProvider}
        history={listHistory}
    >
        <AdminUI>
            <Resource
                name="books"
                list={
                    <List filters={postFilters}>
                        <Datagrid>
                            <RATextField source="id" />
                            <RATextField source="title" />
                            <RATextField source="author" />
                            <RATextField source="year" />
                        </Datagrid>
                    </List>
                }
            />
        </AdminUI>
    </AdminContext>
);
