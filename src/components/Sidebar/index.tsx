import { useMediaQuery, Box, Drawer, useTheme } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import {
  hoverSidebar,
  toggleMobileSidebar,
} from "@/store/customizer/CustomizerSlice";
import { AppState } from "@/store";
import Logo from "@/components/Logo";
import SidebarMain from "./SidebarMain";
import { ProfileMenuSideBar } from "./ProfileSidebarMenu";
import Scrollbar from "@/components/ScrollBar";

const Sidebar = () => {
  // Check Device  > 1200 : Desktop
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up("lg"));

  const customizer = useSelector((state: AppState) => state.customizer);

  const dispatch = useDispatch();

  const theme = useTheme();

  // width sidebar open and side close
  const toggleWidth =
    customizer.isCollapse && !customizer.isSidebarHover
      ? customizer.MiniSidebarWidth
      : customizer.SidebarWidth;

  const onHoverEnter = () => {
    if (customizer.isCollapse) {
      dispatch(hoverSidebar(true));
    }
  };

  const onHoverLeave = () => {
    dispatch(hoverSidebar(false));
  };

  // Case Desktop
  if (lgUp) {
    return (
      <Box
        sx={{
          width: toggleWidth,
          flexShrink: 0,
          ...(customizer.isCollapse && {
            position: "absolute",
          }),
        }}
      >
        {/* Sidebar for desktop */}
        <Drawer
          anchor="left"
          open
          onMouseEnter={onHoverEnter}
          onMouseLeave={onHoverLeave}
          variant="permanent"
          PaperProps={{
            sx: {
              transition: theme.transitions.create("width", {
                duration: theme.transitions.duration.shortest,
              }),
              width: toggleWidth,
              boxSizing: "border-box",
            },
          }}
        >
          {/* Sidebar Box */}
          <Box
            sx={{
              height: "100%",
            }}
          >
            {/* Logo */}
            <Box px={3}>
              <Logo />
            </Box>

            <Scrollbar sx={{ height: "calc(100% - 190px)" }}>
              {/* Main Sidebar */}
              <SidebarMain />
            </Scrollbar>
            <ProfileMenuSideBar />
          </Box>
        </Drawer>
      </Box>
    );
  }

  // Case mobile
  return (
    <Drawer
      anchor="left"
      open={customizer.isMobileSidebar}
      onClose={() => dispatch(toggleMobileSidebar())}
      variant="temporary"
      PaperProps={{
        sx: {
          width: customizer.SidebarWidth,
          border: "0 !important",
          boxShadow: (theme) => theme.shadows[8],
        },
      }}
    >
      <Box px={2}>
        <Logo />
      </Box>
      <SidebarMain />
    </Drawer>
  );
};

export default Sidebar;
