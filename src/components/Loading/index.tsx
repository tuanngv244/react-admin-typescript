import { Box, CircularProgress, SxProps } from "@mui/material";
import React, { ReactNode } from "react";
import { LoadingOverlayStyled } from "./styled";

interface LoadingProps {
  isLoading?: boolean;
  children: ReactNode;
  styles?: SxProps;
  isFullSize?: boolean;
  className?: string;
  isLoadingForPage?: boolean;
}

const Loading: React.FC<LoadingProps> = ({
  children,
  isLoading = false,
  isLoadingForPage = false,
  styles,
  isFullSize,
  className,
}) => {
  const loadingPageStyles: SxProps = isLoadingForPage
    ? {
        width: "100vw",
        height: "100vh",
        position: "fixed",
      }
    : {};

  return (
    <Box
      sx={{
        width: isFullSize ? "100%" : "fit-content",
        height: isFullSize ? "100%" : "fit-content",
        position: "relative",
        ...styles,
      }}
      component={"div"}
      className={className}
    >
      {isLoading && (
        <Box
          sx={{
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 2,
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
