import { Box, BoxProps, styled } from "@mui/material";

const BoxWrapStyled = styled(Box)<
  BoxProps & { wbox: number | string; hbox: number }
>(({ wbox, hbox }) => ({
  position: "relative",
  width: wbox,
  height: hbox,
  borderRadius: "4px",
  overflow: "hidden",
  border: `1px dashed #1D71F2`,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  "&:hover": {
    ".btnDelete": {
      opacity: 1,
      visibility: "visible",
      transition: "all .25s",
    },
  },
}));

const InputUploadHidden = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const BoxPreviewImageStyled = styled(Box)<
  BoxProps & { src: string; component: string }
>({
  width: "100%",
  height: "100%",
  objectFit: "contain",
  position: "absolute",
  top: 0,
  left: 0,
  borderRadius: "4px",
  overflow: "hidden",
  padding: "0 4px",
});

const BoxDeleteStyled = styled(Box)({
  width: "100%",
  height: "100%",
  position: "absolute",
  top: 0,
  left: 0,
  backgroundColor: "rgba(0,0,0,0.3)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  opacity: 0,
  visibility: "hidden",
  transition: "all .25s",
});

export {
  BoxWrapStyled,
  InputUploadHidden,
  BoxPreviewImageStyled,
  BoxDeleteStyled,
};
