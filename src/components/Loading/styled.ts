import { Box, styled } from "@mui/material";

export const LoadingOverlayStyled = styled(Box)({
  width: "100%",
  height: "100%",
  position: "absolute",
  top: 0,
  left: 0,
  backgroundColor: "white",
  zIndex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});
