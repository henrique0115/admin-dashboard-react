import { FC, ReactElement } from 'react';
import {
    Exporter,
    SortPayload,
    Record as RaRecord,
    ResourceComponentProps,
    ResourceComponentPropsWithId,
} from 'ra-core';

export interface ListProps extends ResourceComponentProps {
    children?: ReactElement;
    actions?: ReactElement | false;
    aside?: ReactElement;
    bulkActionButtons?: ReactElement | false;
    classes?: any;
    className?: string;
    component?: FC<{ className?: string }>;
    empty?: ReactElement | false;
    exporter?: Exporter | false;
    filter?: any;
    filterDefaultValues?: any;
    filters?: ReactElement;
    pagination?: ReactElement | false;
    perPage?: number;
    sort?: SortPayload;
    title?: string | ReactElement;
}

export interface EditProps extends ResourceComponentPropsWithId {
    children?: ReactElement;
    actions?: ReactElement | false;
    aside?: ReactElement;
    classes?: any;
    className?: string;
    component?: FC<{ className?: string }>;
    undoable?: boolean;
    onSuccess?: (data: RaRecord) => void;
    onFailure?: (error: any) => void;
    transform?: (data: RaRecord) => RaRecord;
    title?: string | ReactElement;
}

export interface CreateProps extends ResourceComponentPropsWithId {
    children?: ReactElement;
    actions?: ReactElement | false;
    aside?: ReactElement;
    classes?: any;
    className?: string;
    component?: FC<{ className?: string }>;
    onSuccess?: (data: RaRecord) => void;
    onFailure?: (error: any) => void;
    transform?: (data: RaRecord) => RaRecord;
    title?: string | ReactElement;
}

export interface ShowProps extends ResourceComponentPropsWithId {
    children?: ReactElement;
    actions?: ReactElement | false;
    aside?: ReactElement;
    classes?: any;
    className?: string;
    component?: FC<{ className?: string }>;
    title?: string | ReactElement;
}

/**
 * Generic type for the classes prop allowing to override material-ui styles
 *
 * @see https://github.com/mui-org/material-ui/issues/17973#issuecomment-639281445
 *
 * @example
 *
 * const useStyles = makeStyles({
 *     root: {
 *         ...
 *     }
 * })
 *
 * const DummyComponent: FC<DummyComponentProps> = (props) => {
 *     const classes = useStyles();
 *     // ...
 *     return (
 *         <div className={classes.root}>
 *             // ...
 *         </div>
 *     );
 * }
 *
 * interface DummyComponentProps {
 *	    classes?: ClassesOverride<typeof useStyles>;
 * }
 */
export type ClassesOverride<
    UseStyles extends (props: any) => Record<string, string>
> = Partial<Record<keyof ReturnType<UseStyles>, string>>;
