import { Box, styled } from "@mui/material";

export const BoxHeadStyled = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

export const BoxLeftHeadStyled = styled(Box)({
  display: "inline-flex",
  alignItems: "center",
  gap: "8px",
});

export const ArrowStyled = styled(Box)({
  width: "24px",
  height: "24px",
  cursor: "pointer",
});
