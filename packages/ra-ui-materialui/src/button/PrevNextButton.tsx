import * as React from 'react';
import {
    useCreatePath,
    useGetRecordId,
    useListIdsContext,
    useResourceContext,
} from 'ra-core';
import IconButton from '@mui/material/IconButton';
import { NavigateBefore, NavigateNext } from '@mui/icons-material';
import { useNavigate } from 'react-router';

export const PrevNextButton = (props: PrevNextButtonProps) => {
    const { linkType = 'edit' } = props;
    const { ids, total } = useListIdsContext();
    const navigate = useNavigate();
    const recordId = useGetRecordId();
    const resource = useResourceContext();
    const createPath = useCreatePath();

    if (!recordId) return null;

    const index = ids.indexOf(recordId);
    const previousId = index > 0 ? ids[index - 1] : null;
    const nextId =
        index !== -1 && index < ids.length - 1 ? ids[index + 1] : null;

    const handleClickPrev = () => {
        const link = createPath({
            type: linkType,
            resource,
            id: previousId,
        });
        navigate(link);
    };

    const handleClickNext = () => {
        const link = createPath({
            type: linkType,
            resource,
            id: nextId,
        });
        navigate(link);
    };

    return (
        <>
            <IconButton
                disabled={!previousId}
                aria-label="previous"
                onClick={handleClickPrev}
            >
                <NavigateBefore />
            </IconButton>
            {index + 1} / {total}
            <IconButton
                disabled={!nextId}
                aria-label="next"
                onClick={handleClickNext}
            >
                <NavigateNext />
            </IconButton>
        </>
    );
};

export interface PrevNextButtonProps {
    linkType?: 'edit' | 'show';
}
