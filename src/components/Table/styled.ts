import { Box, Popover, Toolbar, Typography, styled } from "@mui/material";

const BoxFilterIconStyled = styled(Box)({
  width: "20px",
  height: "20px",
  cursor: "pointer",
  svg: {
    width: "inherit",
    height: "inherit",
  },
});

const PanelPopoverStyled = styled(Popover)({
  ".MuiPopover-paper": {
    minWidth: "400px",
    borderRadius: "4px",
    boxShadow: "0px 12px 24px -4px #919EAB1F",
  },
});

const HeaderPanelStyled = styled(Box)({
  padding: "10px",
  borderBottom: "1px solid #e5eaef",
  borderRadius: "0",
  h6: {
    margin: 0,
    fontSize: "16px",
    fontWeight: 600,
    fontFamily: "Arial",
  },
});
const BodyPanelStyled = styled(Box)({
  padding: "10px",
  display: "flex",
  flexDirection: "column",
  gap: "12px",
});
const FooterPanelStyled = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  borderTop: "1px solid #e5eaef",
  padding: "10px",
  gap: "4px",
  borderRadius: "0",
});

const LabelItemStyled = styled(Typography)({
  fontSize: "12px",
  marginBottom: "5px",
  fontFamily: "Arial",
});

const TypographyStyled = styled(Typography)({
  textTransform: "capitalize",
  fontWeight: "600",
});

const WrapToolbarStyled = styled(Toolbar)({
  minHeight: "56px !important",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  borderBottom: "1px solid #e5eaef",
});
const WrapFilter = styled(`div`)({
  position: "relative",
  width: "fit-content",
  display: "flex",
});

export {
  BoxFilterIconStyled,
  PanelPopoverStyled,
  HeaderPanelStyled,
  BodyPanelStyled,
  FooterPanelStyled,
  LabelItemStyled,
  WrapToolbarStyled,
  TypographyStyled,
  WrapFilter,
};
