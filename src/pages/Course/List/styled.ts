import { Chip, ChipProps, Typography, styled } from "@mui/material";

const StyledChip = styled(Chip)<ChipProps>(({ theme }) => ({
  borderRadius: "8px",
  color: theme.palette.success.main,
  fontWeight: 100,
}));

const TypographyStyled = styled(Typography)({
  fontSize: "0.75rem",
});

export { StyledChip, TypographyStyled };
