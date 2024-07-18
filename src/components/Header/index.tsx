import {
  AppBar,
  Box,
  IconButton,
  Stack,
  Toolbar,
  styled,
  useMediaQuery,
} from "@mui/material";
import { IconMenu2 } from "@tabler/icons-react";
import { AppState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleMobileSidebar,
  toggleSidebar,
} from "@/store/customizer/CustomizerSlice";
import ProfileHeader from "@/components/Header/ProfileHeader";

const Header = () => {
  // Check responsive
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up("lg"));
  // drawer
  const customizer = useSelector((state: AppState) => state.customizer);
  const dispatch = useDispatch();

  const AppBarStyled = styled(AppBar)(({ theme }) => ({
    boxShadow: "none",
    background: theme.palette.background.paper,
    justifyContent: "center",
    backdropFilter: "blur(4px)",
    border: "none",
    [theme.breakpoints.up("lg")]: {
      minHeight: customizer.TopbarHeight,
    },
  }));

  const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
    width: "100%",
    color: theme.palette.text.secondary,
  }));

  return (
    <AppBarStyled position="sticky" color="default">
      <ToolbarStyled>
        {/* ------------------------------------------- */}
        {/* Toggle Button Sidebar */}
        {/* ------------------------------------------- */}
        <IconButton
          color="inherit"
          aria-label="menu"
          onClick={
            lgUp
              ? () => dispatch(toggleSidebar())
              : () => dispatch(toggleMobileSidebar())
          }
        >
          <IconMenu2 size="20" />
        </IconButton>
        <Box flexGrow={1} />
        <Stack spacing={1} direction="row" alignItems="center">
          <ProfileHeader />
        </Stack>
      </ToolbarStyled>
    </AppBarStyled>
  );
};

export default Header;
