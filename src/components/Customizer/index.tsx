import Scrollbar from "@/components/ScrollBar";
import { AppState } from "@/store";
import { setDarkMode, setTheme } from "@/store/customizer/CustomizerSlice";
import DarkModeTwoToneIcon from "@mui/icons-material/DarkModeTwoTone";
import WbSunnyTwoToneIcon from "@mui/icons-material/WbSunnyTwoTone";
import { ThemeColor } from "@/constants/theme";
import {
  Divider,
  Drawer,
  Fab,
  Grid,
  IconButton,
  Stack,
  Tooltip,
  Typography,
  styled,
} from "@mui/material";
import Box, { BoxProps } from "@mui/material/Box";
import { IconCheck, IconSettings, IconX } from "@tabler/icons-react";
import { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const SidebarWidth = "320px";
interface colors {
  id: number;
  bgColor: string;
  disp?: string;
}
const Customizer: FC = () => {
  const [showDrawer, setShowDrawer] = useState(false);
  const customizer = useSelector((state: AppState) => state.customizer);

  const dispatch = useDispatch();

  const StyledBox = styled(Box)<BoxProps>(({ theme }) => ({
    boxShadow: theme.shadows[8],
    padding: "20px",
    cursor: "pointer",
    justifyContent: "center",
    display: "flex",
    transition: "0.1s ease-in",
    border: "1px solid rgba(145, 158, 171, 0.12)",
    "&:hover": {
      transform: "scale(1.05)",
    },
  }));

  const thColors: colors[] = [
    {
      id: 1,
      bgColor: "#5D87FF",
      disp: ThemeColor.BLUE_THEME,
    },
    {
      id: 2,
      bgColor: "#0074BA",
      disp: ThemeColor.AQUA_THEME,
    },
    {
      id: 3,
      bgColor: "#763EBD",
      disp: ThemeColor.PURPLE_THEME,
    },
    {
      id: 4,
      bgColor: "#0A7EA4",
      disp: ThemeColor.GREEN_THEME,
    },
    {
      id: 5,
      bgColor: "#01C0C8",
      disp: ThemeColor.CYAN_THEME,
    },
    {
      id: 6,
      bgColor: "#FA896B",
      disp: ThemeColor.ORANGE_THEME,
    },
  ];

  return (
    <div>
      {/* Button to open customizer */}
      <Tooltip title="Settings">
        <Fab
          color="primary"
          aria-label="settings"
          sx={{ position: "fixed", right: "25px", bottom: "15px" }}
          onClick={() => setShowDrawer(true)}
        >
          <IconSettings stroke={1.5} />
        </Fab>
      </Tooltip>
      <Drawer
        anchor="right"
        open={showDrawer}
        onClose={() => setShowDrawer(false)}
        PaperProps={{
          sx: {
            width: SidebarWidth,
          },
        }}
      >
        {/* Customizer Sidebar */}
        <Scrollbar sx={{ height: "calc(100vh - 5px)" }}>
          <Box
            p={2}
            display="flex"
            justifyContent={"space-between"}
            alignItems="center"
          >
            <Typography variant="h4">Settings</Typography>

            <IconButton color="inherit" onClick={() => setShowDrawer(false)}>
              <IconX size="1rem" />
            </IconButton>
          </Box>
          <Divider />
          <Box p={3}>
            {/* Dark light theme setting */}
            <Typography variant="h6" gutterBottom>
              Theme Option
            </Typography>
            <Stack direction={"row"} gap={2} my={2}>
              <StyledBox
                onClick={() => dispatch(setDarkMode("light"))}
                display="flex"
                gap={1}
              >
                <WbSunnyTwoToneIcon
                  color={
                    customizer.activeMode === "light" ? "primary" : "inherit"
                  }
                />
                Light
              </StyledBox>
              <StyledBox
                onClick={() => dispatch(setDarkMode("dark"))}
                display="flex"
                gap={1}
              >
                <DarkModeTwoToneIcon
                  color={
                    customizer.activeMode === "dark" ? "primary" : "inherit"
                  }
                />
                Dark
              </StyledBox>
            </Stack>
            <Box pt={3} />

            {/* Theme Color setting */}
            <Typography variant="h6" gutterBottom>
              Theme Colors
            </Typography>
            <Grid container spacing={2}>
              {thColors.map((thcolor) => (
                <Grid item xs={4} key={thcolor.id}>
                  <StyledBox onClick={() => dispatch(setTheme(thcolor.disp))}>
                    <Tooltip title={`${thcolor.disp}`} placement="top">
                      <Box
                        sx={{
                          backgroundColor: thcolor.bgColor,
                          width: "25px",
                          height: "25px",
                          borderRadius: "60px",
                          alignItems: "center",
                          justifyContent: "center",
                          display: "flex",
                          color: "white",
                        }}
                        aria-label={`${thcolor.bgColor}`}
                      >
                        {customizer.activeTheme === thcolor.disp ? (
                          <IconCheck width={13} />
                        ) : (
                          ""
                        )}
                      </Box>
                    </Tooltip>
                  </StyledBox>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Scrollbar>
      </Drawer>
    </div>
  );
};

export default Customizer;
