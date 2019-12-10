import React from 'react';
import { useField } from 'react-final-form';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import { useChoices } from 'ra-core';

const RadioButtonGroupInputItem = ({
    choice,
    optionText,
    optionValue,
    source,
    translateChoice,
}) => {
    const { getChoiceText, getChoiceValue } = useChoices({
        optionText,
        optionValue,
        translateChoice,
    });
    const label = getChoiceText(choice);
    const value = getChoiceValue(choice);
    const {
        input: { type, onChange, ...inputProps },
    } = useField(source, {
        type: 'radio',
        value,
    });

    const nodeId = `${source}_${label}`;

    return (
        <FormControlLabel
            label={label}
            htmlFor={nodeId}
            control={
                <Radio
                    id={nodeId}
                    color="primary"
                    onChange={() => onChange(value)}
                    {...inputProps}
                />
            }
        />
    );
};

export default RadioButtonGroupInputItem;
