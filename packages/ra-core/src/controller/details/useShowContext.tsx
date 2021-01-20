import { useContext } from 'react';
import merge from 'lodash/merge';

import { Record } from '../../types';
import { ShowContext } from './ShowContext';
import { ShowControllerProps } from './useShowController';

/**
 * Hook to read the show controller props from the ShowContext.
 *
 * Mostly used within a <ShowContext.Provider> (e.g. as a descendent of <Show>).
 *
 * But you can also use it without a <ShowContext.Provider>. In this case, it is up to you
 * to pass all the necessary props.
 *
 * The given props will take precedence over context values.
 *
 * @typedef {Object} ShowControllerProps
 *
 * @returns {ShowControllerProps} create controller props
 *
 * @see useShowController for how it is filled
 *
 */
export const useShowContext = <RecordType extends Record = Record>(
    props?: Partial<ShowControllerProps<RecordType>>
): Partial<ShowControllerProps<RecordType>> => {
    // Can't find a way to specify the RecordType when ShowContext is declared
    // @ts-ignore
    const context = useContext<ShowControllerProps<RecordType>>(ShowContext);

    // Props take precedence over the context
    // @ts-ignore
    return props != null
        ? merge({}, context, extractShowContextProps(props))
        : context;
};

/**
 * Extract only the show controller props
 *
 * @param {Object} props props passed to the useShowContext hook
 *
 * @returns {ShowControllerProps} show controller props
 */
const extractShowContextProps = ({
    basePath,
    record,
    defaultTitle,
    loaded,
    loading,
    resource,
    version,
}) => ({
    basePath,
    record,
    defaultTitle,
    loaded,
    loading,
    resource,
    version,
});
