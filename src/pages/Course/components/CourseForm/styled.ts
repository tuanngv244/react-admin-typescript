import { Box, Button, Card, styled } from '@mui/material';

const SubmitButtonStyled = styled(Button)({
    width: '100%',
    marginTop: '25px',
});

const CardStyled = styled(Card)({
    padding: '12px',
    borderRadius: '6px',
    boxShadow: '0 2px 3px 0 rgba(0,0,0,.05)',
});

const ListVerticalStyled = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    gap: '16px',
});
const BoxFormStyled = styled(Box)({
    display: 'flex',
    gap: '30px',
    width: '100%',
});

const WrapDisableStyled = styled(Box)(({ theme }) => ({
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    zIndex: 99,
    opacity: 0.2,
    backgroundColor: `${theme.palette.primary.light}`,
}));

export { BoxFormStyled, CardStyled, ListVerticalStyled, SubmitButtonStyled, WrapDisableStyled };
