import * as React from 'react';
import { AdminContext } from '../AdminContext';
import fakeRestDataProvider from 'ra-data-fakerest';
import { Resource } from 'ra-core';
import {
    AdminUI,
    Create,
    Datagrid,
    Edit,
    EditButton,
    List,
    PrevNextButton,
    Show,
    ShowButton,
    SimpleForm,
    SimpleShowLayout,
    TextField,
    TextInput,
    TopToolbar,
} from 'react-admin';
import englishMessages from 'ra-language-english';
import polyglotI18nProvider from 'ra-i18n-polyglot';
import generateData from 'data-generator-retail';

export default { title: 'ra-ui-materialui/button/PrevNextButton' };

const i18nProvider = polyglotI18nProvider(() => englishMessages, 'en');

const defaultCustomerData = {
    address: null,
    zipcode: null,
    stateAbbr: null,
    birthday: null,
    first_seen: '2021-08-22T23:43:18.742Z',
    last_seen: '2023-04-22T07:24:29.127Z',
    has_ordered: false,
    latest_purchase: null,
    has_newsletter: true,
    groups: [],
    nb_commands: 0,
    total_spent: 0,
};

const data = generateData();

const dataProvider = fakeRestDataProvider({
    ...data,
    ...{
        customers: [
            // add some persisted customers to the data
            ...data.customers,
            ...[
                {
                    id: 901,
                    first_name: 'Martin',
                    last_name: 'McFly',
                    email: 'Martin.McFly@yahoo.com',
                    city: 'Hill Valley',
                    ...defaultCustomerData,
                },
                {
                    id: 902,
                    first_name: 'Emmett',
                    last_name: 'Brown',
                    email: 'Emmett.Brown@yahoo.com',
                    city: 'Hill Valley',
                    ...defaultCustomerData,
                },
                {
                    id: 903,
                    first_name: 'Biff',
                    last_name: 'Tannen',
                    email: 'Biff.Tannen@yahoo.com',
                    city: 'Hill Valley',
                    ...defaultCustomerData,
                },
                {
                    id: 904,
                    first_name: 'Clara',
                    last_name: 'Clayton',
                    email: 'Clara.Clayton@yahoo.com',
                    city: 'Hill Valley',
                    ...defaultCustomerData,
                },
                {
                    id: 905,
                    first_name: 'Martin',
                    last_name: 'Scorsese',
                    email: 'Martin.Scorsese@yahoo.com',
                    city: 'New York',
                    ...defaultCustomerData,
                },
            ],
        ],
    },
});

const MyTopToolbar = ({ children }) => (
    <TopToolbar
        sx={{
            justifyContent: 'space-between',
        }}
    >
        {children}
    </TopToolbar>
);

export const Basic = () => (
    <AdminContext dataProvider={dataProvider} i18nProvider={i18nProvider}>
        <AdminUI>
            <Resource
                name="customers"
                list={
                    <List>
                        <Datagrid rowClick="edit">
                            <TextField source="id" />
                            <TextField source="first_name" />
                            <TextField source="last_name" />
                            <TextField source="email" />
                            <TextField source="city" />
                        </Datagrid>
                    </List>
                }
                edit={
                    <Edit
                        actions={
                            <MyTopToolbar>
                                <PrevNextButton />
                                <ShowButton />
                            </MyTopToolbar>
                        }
                    >
                        <SimpleForm>
                            <TextInput source="first_name" />
                            <TextInput source="last_name" />
                            <TextInput source="email" />
                            <TextInput source="city" />
                        </SimpleForm>
                    </Edit>
                }
                show={
                    <Show
                        actions={
                            <MyTopToolbar>
                                <PrevNextButton />
                                <PrevNextButton linkType="show" />
                            </MyTopToolbar>
                        }
                    >
                        <SimpleShowLayout>
                            <TextField source="id" />
                            <TextField source="first_name" />
                            <TextField source="last_name" />
                            <TextField source="email" />
                            <TextField source="city" />
                        </SimpleShowLayout>
                    </Show>
                }
            />
        </AdminUI>
    </AdminContext>
);

export const WithStoreKey = () => (
    <AdminContext dataProvider={dataProvider} i18nProvider={i18nProvider}>
        <AdminUI>
            <Resource
                name="customers"
                list={
                    <List storeKey="withStoreKey">
                        <Datagrid rowClick="edit">
                            <TextField source="id" />
                            <TextField source="first_name" />
                            <TextField source="last_name" />
                            <TextField source="email" />
                            <TextField source="city" />
                        </Datagrid>
                    </List>
                }
                edit={
                    <Edit
                        actions={
                            <MyTopToolbar>
                                <PrevNextButton storeKey="withStoreKey" />
                                <ShowButton />
                            </MyTopToolbar>
                        }
                    >
                        <SimpleForm>
                            <TextInput source="first_name" />
                            <TextInput source="last_name" />
                            <TextInput source="email" />
                            <TextInput source="city" />
                        </SimpleForm>
                    </Edit>
                }
                show={
                    <Show
                        actions={
                            <MyTopToolbar>
                                <PrevNextButton
                                    linkType="show"
                                    storeKey="withStoreKey"
                                />
                                <EditButton />
                            </MyTopToolbar>
                        }
                    >
                        <SimpleShowLayout>
                            <TextField source="id" />
                            <TextField source="first_name" />
                            <TextField source="last_name" />
                            <TextField source="email" />
                            <TextField source="city" />
                        </SimpleShowLayout>
                    </Show>
                }
            />
        </AdminUI>
    </AdminContext>
);

export const WithFilter = () => (
    <AdminContext dataProvider={dataProvider} i18nProvider={i18nProvider}>
        <AdminUI>
            <Resource
                name="customers"
                list={
                    <List
                        filter={{ city: 'Hill Valley' }}
                        filters={[
                            <TextInput label="Search" source="q" alwaysOn />,
                        ]}
                        sort={{ field: 'first_name', order: 'DESC' }}
                    >
                        <Datagrid rowClick="edit">
                            <TextField source="id" />
                            <TextField source="first_name" />
                            <TextField source="last_name" />
                            <TextField source="email" />
                            <TextField source="city" />
                        </Datagrid>
                    </List>
                }
                edit={
                    <Edit
                        actions={
                            <MyTopToolbar>
                                <PrevNextButton
                                    listParams={{
                                        filter: { city: 'Hill Valley' },
                                        sort: 'first_name',
                                        order: 'DESC',
                                    }}
                                />
                                <ShowButton />
                            </MyTopToolbar>
                        }
                    >
                        <SimpleForm>
                            <TextInput source="first_name" />
                            <TextInput source="last_name" />
                            <TextInput source="email" />
                            <TextInput source="city" />
                        </SimpleForm>
                    </Edit>
                }
                show={
                    <Show
                        actions={
                            <MyTopToolbar>
                                <PrevNextButton
                                    linkType="show"
                                    listParams={{
                                        filter: { city: 'Hill Valley' },
                                        sort: 'first_name',
                                        order: 'DESC',
                                    }}
                                />
                                <EditButton />
                            </MyTopToolbar>
                        }
                    >
                        <SimpleShowLayout>
                            <TextField source="id" />
                            <TextField source="first_name" />
                            <TextField source="last_name" />
                            <TextField source="email" />
                            <TextField source="city" />
                        </SimpleShowLayout>
                    </Show>
                }
            />
        </AdminUI>
    </AdminContext>
);

export const WithLimit = () => (
    <AdminContext dataProvider={dataProvider} i18nProvider={i18nProvider}>
        <AdminUI>
            <Resource
                name="customers"
                list={
                    <List>
                        <Datagrid rowClick="edit">
                            <TextField source="id" />
                            <TextField source="first_name" />
                            <TextField source="last_name" />
                            <TextField source="email" />
                            <TextField source="city" />
                        </Datagrid>
                    </List>
                }
                edit={
                    <Edit
                        actions={
                            <MyTopToolbar>
                                <PrevNextButton limit={500} />
                                <ShowButton />
                            </MyTopToolbar>
                        }
                    >
                        <SimpleForm>
                            <TextInput source="first_name" />
                            <TextInput source="last_name" />
                            <TextInput source="email" />
                            <TextInput source="city" />
                        </SimpleForm>
                    </Edit>
                }
                show={
                    <Show
                        actions={
                            <MyTopToolbar>
                                <PrevNextButton linkType="show" limit={500} />
                                <ShowButton />
                            </MyTopToolbar>
                        }
                    >
                        <SimpleShowLayout>
                            <TextField source="id" />
                            <TextField source="first_name" />
                            <TextField source="last_name" />
                            <TextField source="email" />
                            <TextField source="city" />
                        </SimpleShowLayout>
                    </Show>
                }
            />
        </AdminUI>
    </AdminContext>
);

export const ShouldNotDisplayed = () => (
    <AdminContext dataProvider={dataProvider} i18nProvider={i18nProvider}>
        <Create
            resource="customers"
            actions={
                <MyTopToolbar>
                    <PrevNextButton />
                </MyTopToolbar>
            }
        >
            <SimpleForm>
                <TextInput source="first_name" />
                <TextInput source="last_name" />
                <TextInput source="email" />
                <TextInput source="city" />
            </SimpleForm>
        </Create>
    </AdminContext>
);
