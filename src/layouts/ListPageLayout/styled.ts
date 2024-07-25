import { Box, OutlinedInput, styled } from "@mui/material";

const BoxRightHeadStyled = styled(Box)({
  display: "inline-flex",
  alignItems: "center",
  gap: "8px",
});

const BoxHeadStyled = styled(Box)({
  padding: "10px 0",
  display: "inline-flex",
  width: "100%",
  columnGap: "8px",
  alignItems: "center",
  justifyContent: "space-between",
  margin: "10px 0 ",
});

const OutlinedInputStyled = styled(OutlinedInput)({
  minWidth: "300px",
  height: "42.25px",
});

export { BoxRightHeadStyled, BoxHeadStyled, OutlinedInputStyled };
