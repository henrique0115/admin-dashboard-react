import * as React from 'react';
import { useEffect, useState } from 'react';
import inflection from 'inflection';
import {
    EditBase,
    InferredElement,
    useResourceContext,
    useEditContext,
    getElementsFromRecords,
} from 'ra-core';

import { EditProps } from '../types';
import { EditView } from './EditView';
import { editFieldTypes } from './editFieldTypes';

export const EditGuesser = (props: EditProps) => {
    const {
        resource,
        id,
        mutationMode,
        mutationOptions,
        queryOptions,
        redirect,
        transform,
        disableAuthentication,
        ...rest
    } = props;
    return (
        <EditBase
            resource={resource}
            id={id}
            mutationMode={mutationMode}
            mutationOptions={mutationOptions}
            queryOptions={queryOptions}
            redirect={redirect}
            transform={transform}
            disableAuthentication={disableAuthentication}
        >
            <EditViewGuesser {...rest} />
        </EditBase>
    );
};

const EditViewGuesser = props => {
    const resource = useResourceContext(props);
    const { record } = useEditContext();
    const [inferredChild, setInferredChild] = useState(null);
    useEffect(() => {
        if (record && !inferredChild) {
            const inferredElements = getElementsFromRecords(
                [record],
                editFieldTypes
            );
            const inferredChild = new InferredElement(
                editFieldTypes.form,
                null,
                inferredElements
            );
            setInferredChild(inferredChild.getElement());

            if (process.env.NODE_ENV === 'production') return;

            const representation = inferredChild.getRepresentation();
            const components = ['Edit']
                .concat(
                    Array.from(
                        new Set(
                            Array.from(representation.matchAll(/<([^\/\s>]+)/g))
                                .map(match => match[1])
                                .filter(component => component !== 'span')
                        )
                    )
                )
                .sort();

            // eslint-disable-next-line no-console
            console.log(
                `Guessed Edit:

import { ${components.join(', ')} } from 'react-admin';

export const ${inflection.capitalize(
                    inflection.singularize(resource)
                )}Edit = () => (
    <Edit>
${representation}
    </Edit>
);`
            );
        }
    }, [record, inferredChild, resource]);

    return <EditView {...props}>{inferredChild}</EditView>;
};

EditViewGuesser.propTypes = EditView.propTypes;
