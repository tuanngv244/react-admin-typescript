import { FormHelperText, TextFieldProps } from '@mui/material';
import React, { ReactNode } from 'react';
import { TextFieldStyled } from './styled';
import Label from '../Label';

type Props = TextFieldProps & {
    label?: string;
    errorMessage?: string;
    renderInput?: (props: TextFieldProps) => ReactNode;
};

const Input: React.FC<Props> = ({
    label,
    errorMessage,
    renderInput,
    fullWidth = false,
    ...props
}) => {
    return (
        <React.Fragment>
            {label && <Label>{label}</Label>}
            {renderInput ? (
                renderInput(props)
            ) : (
                <TextFieldStyled fullWidth={fullWidth} {...props} />
            )}
            {errorMessage && (
                <FormHelperText error id="standard-weight-helper-text-email-login">
                    {errorMessage}
                </FormHelperText>
            )}
        </React.Fragment>
    );
};

export default Input;
