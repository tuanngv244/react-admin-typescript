import { Checkbox as CheckboxMui, CheckboxProps } from '@mui/material';
import React from 'react';
import { BPCheckedIconStyled, BPIconStyled } from './styled';

const Checkbox: React.FC<CheckboxProps> = (props) => {
    return (
        <CheckboxMui
            disableRipple
            color={props.color ? props.color : 'default'}
            checkedIcon={
                <BPCheckedIconStyled
                    sx={{
                        backgroundColor: props.color ? `${props.color}.main` : 'primary.main',
                    }}
                />
            }
            icon={<BPIconStyled />}
            {...props}
        />
    );
};

export default Checkbox;
