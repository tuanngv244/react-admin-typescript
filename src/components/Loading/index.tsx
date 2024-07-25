import { Box, CircularProgress, SxProps } from "@mui/material";
import React, { ReactNode } from "react";
import { LoadingOverlayStyled } from "./styled";

interface LoadingProps {
  isLoading: boolean;
  children: ReactNode;
  styles?: SxProps;
  isLoadingForPage?: boolean;
}

const Loading: React.FC<LoadingProps> = ({
  children,
  isLoading,
  isLoadingForPage = false,
  styles,
}) => {
  const loadingPageStyles: SxProps = isLoadingForPage
    ? {
        width: "100vw",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 1,
      }
    : {};

  return (
    <Box
      sx={{
        width: "fit-content",
        height: "fit-content",
        position: "relative",
        ...styles,
      }}
    >
      {isLoading && (
        <Box
          sx={{
            width: "100%",
            height: "100%",
            ...loadingPageStyles,
          }}
        >
          <LoadingOverlayStyled>
            <CircularProgress size={32} thickness={5} />
          </LoadingOverlayStyled>
        </Box>
      )}
      {children}
    </Box>
  );
};

export default Loading;
