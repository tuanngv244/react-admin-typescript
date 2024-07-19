import { TypographyProps } from '@mui/material';
import { LabelStyled } from './styled';
import React from 'react';

const Label: React.FC<TypographyProps> = (props) => {
    return (
        <LabelStyled variant="subtitle1" sx={{ marginTop: '18px' }} component="label" {...props} />
    );
};

export default Label;
