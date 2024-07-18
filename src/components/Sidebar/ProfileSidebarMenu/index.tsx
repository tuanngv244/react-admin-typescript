import {
  Avatar,
  Box,
  IconButton,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";

import img1 from "@/assets/profile/user-1.jpg";
import { AppState } from "@/store";
import { IconPower } from "@tabler/icons-react";
import { useSelector } from "react-redux";

export const ProfileMenuSideBar = () => {
  const customizer = useSelector((state: AppState) => state.customizer);

  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up("lg"));
  const hideMenu = lgUp
    ? customizer.isCollapse && !customizer.isSidebarHover
    : "";

  const _onLogout = () => {
    // Code function log here
  };

  return (
    <Box
      display={"flex"}
      alignItems="center"
      gap={2}
      sx={{ m: 3, p: 2, bgcolor: `${"secondary.light"}`, maxWidth: "270px" }}
    >
      {!hideMenu ? (
        <>
          <Avatar alt="Remy Sharp" src={img1} />

          <Box>
            <Typography variant="h6">Tran Nghia </Typography>
            <Typography variant="caption">CEO & Founder</Typography>
          </Box>
          <Box sx={{ ml: "auto" }}>
            <Tooltip title="Logout" placement="top">
              <IconButton
                onClick={_onLogout}
                color="primary"
                aria-label="logout"
                size="small"
              >
                <IconPower size="20" />
              </IconButton>
            </Tooltip>
          </Box>
        </>
      ) : (
        ""
      )}
    </Box>
  );
};
