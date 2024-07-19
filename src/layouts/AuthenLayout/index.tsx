import ImgLogo from "@/assets/logo/logo.png";
import { Box, Grid } from "@mui/material";
import { Outlet } from "react-router-dom";

const AuthenLayout = () => {
  return (
    <Grid container spacing={0} sx={{ overflowX: "hidden" }}>
      <Grid
        item
        xs={12}
        sm={12}
        lg={7}
        xl={8}
        sx={{
          position: "relative",
          "&:before": {
            content: '""',
            background: "radial-gradient(#d2f1df, #d3d7fa, #bad8f4)",
            backgroundSize: "400% 400%",
            animation: "gradient 15s ease infinite",
            position: "absolute",
            height: "100%",
            width: "100%",
            opacity: "0.3",
          },
        }}
      >
        <Box position="relative">
          <Box
            alignItems="center"
            justifyContent="center"
            height={"100dvh"}
            sx={{
              display: {
                xs: "none",
                lg: "flex",
              },
            }}
          >
            <img
              src={ImgLogo}
              alt="bg"
              style={{
                width: "100%",
                maxWidth: "227px",
              }}
            />
          </Box>
        </Box>
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
        lg={5}
        xl={4}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Box p={4}>
          <Outlet />
        </Box>
      </Grid>
    </Grid>
  );
};

export default AuthenLayout;
