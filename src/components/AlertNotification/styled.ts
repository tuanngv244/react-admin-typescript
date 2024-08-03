import { Alert, Box, styled } from "@mui/material";

const MainStyled = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "6px 0",
  position: "fixed",
  zIndex: 1000,
  bottom: 80,
  right: 10,
  maxWidth: "300px",
});

const AlertStyled = styled(Alert)({});

export { MainStyled, AlertStyled };
