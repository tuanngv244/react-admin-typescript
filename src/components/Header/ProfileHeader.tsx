import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  Menu,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import { IconMail } from "@tabler/icons-react";
import ProfileImg from "@/assets/profile/user-1.jpg";
import { useTranslation } from "react-i18next";

const ProfileHeader = () => {
  const [modalSetting, setModalSetting] = useState(null);
  const { t } = useTranslation();
  const showModal = (event: any) => {
    setModalSetting(event.currentTarget);
  };
  const handleCloseModal = () => {
    setModalSetting(null);
  };

  const _onLogout = () => {
    // Code function logout here
  };

  return (
    <Box>
      <IconButton
        size="large"
        aria-label="show 11 new notifications"
        color="inherit"
        aria-controls="msgs-menu"
        aria-haspopup="true"
        sx={{
          ...(typeof modalSetting === "object" && {
            color: "primary.main",
          }),
        }}
        onClick={showModal}
      >
        <Avatar
          src={ProfileImg}
          alt={ProfileImg}
          sx={{
            width: 35,
            height: 35,
          }}
        />
      </IconButton>
      <Menu
        id="msgs-menu"
        anchorEl={modalSetting}
        keepMounted
        open={Boolean(modalSetting)}
        onClose={handleCloseModal}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        sx={{
          "& .MuiMenu-paper": {
            width: "360px",
            p: 4,
          },
        }}
      >
        <Typography variant="h5">User Profile</Typography>
        <Stack direction="row" py={3} spacing={2} alignItems="center">
          <Avatar
            src={ProfileImg}
            alt={ProfileImg}
            sx={{ width: 95, height: 95 }}
          />
          <Box>
            <Typography
              variant="subtitle2"
              color="textPrimary"
              fontWeight={600}
            >
              Tran Nghia
            </Typography>
            <Typography variant="subtitle2" color="textSecondary">
              CEO & Founder
            </Typography>
            <Typography
              variant="subtitle2"
              color="textSecondary"
              display="flex"
              alignItems="center"
              gap={1}
            >
              <IconMail width={15} height={15} />
              contact@cfdstudio.vn
            </Typography>
          </Box>
        </Stack>
        <Divider />
        <Box key={"Profile"}>
          <Box sx={{ py: 2, px: 0 }} className="hover-text-primary">
            <Link to={"/"}>
              <Stack direction="row" spacing={2}>
                <Box
                  width="45px"
                  height="45px"
                  bgcolor="primary.light"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Avatar
                    alt={""}
                    sx={{
                      width: 24,
                      height: 24,
                      borderRadius: 0,
                    }}
                  />
                </Box>
                <Box>
                  <Typography
                    variant="subtitle2"
                    fontWeight={600}
                    color="textPrimary"
                    className="text-hover"
                    noWrap
                    sx={{
                      width: "240px",
                    }}
                  >
                    {t("My Profile")}
                  </Typography>
                  <Typography
                    color="textSecondary"
                    variant="subtitle2"
                    sx={{
                      width: "240px",
                    }}
                    noWrap
                  >
                    {t("Account Settings")}
                  </Typography>
                </Box>
              </Stack>
            </Link>
          </Box>
        </Box>
        <Box mt={2}>
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            onClick={_onLogout}
          >
            Logout
          </Button>
        </Box>
      </Menu>
    </Box>
  );
};

export default ProfileHeader;
