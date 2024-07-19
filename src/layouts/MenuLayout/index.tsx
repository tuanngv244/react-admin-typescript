import { FC, useEffect } from "react";
import { styled, Container, Box, useTheme } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { AppState, useAppDispatch } from "@/store";
import Header from "@/components/Header";
import Customizer from "@/components/Customizer";
import Sidebar from "@/components/Sidebar";
import tokenMethod from "@/utils/token";
import { authActions } from "@/store/auth/AuthSlice";

const MainWrapper = styled("div")(() => ({
  display: "flex",
  minHeight: "100vh",
  width: "100%",
}));

const PageWrapper = styled("div")(() => ({
  display: "flex",
  flexGrow: 1,
  paddingBottom: "60px",
  flexDirection: "column",
  zIndex: 1,
  width: "100%",
  backgroundColor: "transparent",
}));

const ContainerStyled = styled(Container)({
  maxWidth: "none !important",
});

const MenuLayout: FC = () => {
  const customizer = useSelector((state: AppState) => state.customizer);
  const theme = useTheme();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (tokenMethod.get()?.id) {
      dispatch(authActions.handleGetProfile(tokenMethod.get().id));
    }
  }, []);
  return (
    <MainWrapper>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <PageWrapper
        className="page-wrapper"
        sx={{
          ...(customizer.isCollapse && {
            [theme.breakpoints.up("lg")]: {
              ml: `${customizer.MiniSidebarWidth}px`,
            },
          }),
        }}
      >
        {/* Header */}
        <Header />

        {/* PageContent */}
        <ContainerStyled>
          {/* ------------------------------------------- */}
          {/* PageContent */}
          {/* ------------------------------------------- */}
          <Box sx={{ minHeight: "calc(100vh - 170px)" }}>
            <Outlet />
          </Box>
        </ContainerStyled>
        <Customizer />
      </PageWrapper>
    </MainWrapper>
  );
};

export default MenuLayout;
