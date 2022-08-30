import { FieldValues } from 'react-hook-form';
import isObject from 'lodash/isObject';
import merge from 'lodash/merge';
import reduce from 'lodash/reduce';
import { ValidationErrorMessageWithArgs } from './validate';

// Flattening an object into path keys:
// https://github.com/lodash/lodash/issues/2240#issuecomment-418820848
export const flattenErrors = (obj, path: string[] = []) =>
    !isObject(obj)
        ? { [path.join('.')]: obj }
        : reduce(
              obj,
              (cum, next, key) => {
                  if (
                      (obj[key] as ValidationErrorMessageWithArgs).message !=
                          null &&
                      (obj[key] as ValidationErrorMessageWithArgs).args != null
                  ) {
                      return merge(cum, { [key]: obj[key] });
                  }
                  return merge(cum, flattenErrors(next, [...path, key]));
              },
              {}
          );
/**
 * Convert a simple validation function that returns an object matching the form shape with errors
 * to a validation resolver compatible with react-hook-form.
 *
 * @example
 * const validate = (values: any) => {
 *     if (values.username == null || values.username.trim() === '') {
 *         return { username: 'Required' };
 *     }
 * }
 *
 * const validationResolver = getSimpleValidationResolver(validate);
 *
 * const UserForm = () => (
 *     <Form
 *         defaultValues={{ username: 'John' }}
 *         validationResolver={validationResolver}
 *     >
 *         <TextField source="username" />
 *     </Form>
 * );
 */
export const getSimpleValidationResolver = (validate: ValidateForm) => async (
    data: FieldValues
) => {
    const errors = await validate(data);

    // If there are no errors, early return the form values
    if (!errors || isEmptyObject(errors)) {
        return { values: data, errors: {} };
    }

    // Else, we return an error object shaped liked errors but having for each leaf
    // `type: 'manual'` and a `message` prop like react-hook-form expects it
    const transformedErrors = transformErrorFields(errors);

    // If, after transformation, there are no errors, return the form values
    if (!transformedErrors || isEmptyObject(transformedErrors)) {
        return { values: data, errors: {} };
    }

    // Else return the errors and no value
    return {
        values: {},
        errors: transformedErrors,
    };
};

const transformErrorFields = (error: object) => {
    return Object.keys(error).reduce((acc, field) => {
        // Handle arrays
        if (Array.isArray(error[field])) {
            let arrayHasErrors = false;
            const transformedArrayErrors = error[field].map(item => {
                if (!isEmptyObject(item)) {
                    arrayHasErrors = true;
                }
                return transformErrorFields(item);
            });
            if (!arrayHasErrors) {
                return acc;
            }
            return {
                ...acc,
                [field]: transformedArrayErrors,
            };
        }

        // Handle objects
        if (isEmptyObject(error[field])) {
            return acc;
        }
        if (
            typeof error[field] === 'object' &&
            !isRaTranslationObj(error[field])
        ) {
            return {
                ...acc,
                [field]: transformErrorFields(error[field]),
            };
        }

        // Handle leaf (primary type or RaTranslationObj)
        return {
            ...acc,
            [field]: addTypeAndMessage(error[field]),
        };
    }, {} as FieldValues);
};

const addTypeAndMessage = (error: object) => ({
    type: 'manual',
    message: error,
});

const isRaTranslationObj = (obj: object) =>
    Object.keys(obj).includes('message') && Object.keys(obj).includes('args');

const isEmptyObject = (obj: object) =>
    Object.getOwnPropertyNames(obj).length === 0;

export type ValidateForm = (
    data: FieldValues
) => FieldValues | Promise<FieldValues>;
