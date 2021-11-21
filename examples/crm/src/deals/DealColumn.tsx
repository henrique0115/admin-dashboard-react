import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';
import { Droppable } from 'react-beautiful-dnd';
import { Identifier, RecordMap } from 'react-admin';

import { DealCard } from './DealCard';
import { stageNames } from './stages';
import { Deal } from '../types';

const PREFIX = 'DealColumn';

const classes = {
    root: `${PREFIX}-root`,
    droppable: `${PREFIX}-droppable`,
};

const Root = styled('div')({
    [`&.${classes.root}`]: {
        flex: 1,
        paddingTop: 8,
        paddingBottom: 16,
        backgroundColor: '#eaeaee',
        '&:first-child': {
            paddingLeft: 5,
            borderTopLeftRadius: 5,
        },
        '&:last-child': {
            paddingRight: 5,
            borderTopRightRadius: 5,
        },
    },
    [`& .${classes.droppable}`]: {
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 5,
        padding: 5,
        '&.isDraggingOver': {
            backgroundColor: '#dadadf',
        },
    },
});

export const DealColumn = ({
    stage,
    dealIds,
    data,
}: {
    stage: string;
    dealIds: Identifier[];
    data: RecordMap<Deal>;
}) => {
    return (
        <Root className={classes.root}>
            <Typography align="center" variant="subtitle1">
                {/* @ts-ignore */}
                {stageNames[stage]}
            </Typography>
            <Droppable droppableId={stage}>
                {(droppableProvided, snapshot) => (
                    <div
                        ref={droppableProvided.innerRef}
                        {...droppableProvided.droppableProps}
                        className={
                            classes.droppable +
                            (snapshot.isDraggingOver ? ' isDraggingOver' : '')
                        }
                    >
                        {dealIds.map((id, index) => (
                            <DealCard key={id} index={index} deal={data[id]} />
                        ))}
                        {droppableProvided.placeholder}
                    </div>
                )}
            </Droppable>
        </Root>
    );
};
