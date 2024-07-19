import Checkbox from "@/components/Checkbox";
import Input from "@/components/Input";
import { Paths } from "@/constants/paths";
import { useAppDispatch } from "@/store";
import { authActions } from "@/store/auth/AuthSlice";
import { ILoginFormData } from "@/types/auth";
import {
  Box,
  Button,
  FormControlLabel,
  FormGroup,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginFormData>({});

  const _onLogin = async (data: ILoginFormData) => {
    return await dispatch(
      authActions.handleLogin({
        payload: data,
        onSuccess: () => navigate(Paths.ROOT),
        onFailed: () => alert("Login failed!"),
      })
    );
  };

  return (
    <React.Fragment>
      <Typography fontWeight="700" variant="h3" mb={1}>
        {t("AUTH.welcomeToCFD")}
      </Typography>

      {t("AUTH.yourAdminDashboard")}

      <form onSubmit={handleSubmit(_onLogin)}>
        <Input
          label={t("AUTH.email")}
          placeholder={t("AUTH.email")}
          fullWidth
          inputProps={{
            ...register("email", {
              required: t("MESSAGE_ERROR.requiredEmail"),
            }),
          }}
          errorMessage={errors?.email?.message}
        />
        <Input
          placeholder={t("AUTH.password")}
          fullWidth
          label={t("AUTH.password")}
          type="password"
          inputProps={{
            ...register("password", {
              required: t("MESSAGE_ERROR.requiredPassword"),
            }),
          }}
          errorMessage={errors?.password?.message}
        />
        <Stack
          justifyContent="space-between"
          direction="row"
          alignItems="center"
          my={2}
        >
          <FormGroup>
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label={t("AUTH.rememberThisDevice")}
            />
          </FormGroup>
          <Typography
            component={Link}
            to="/auth/forgot-password"
            fontWeight="500"
            sx={{
              textDecoration: "none",
              color: "primary.main",
            }}
          >
            {t("AUTH.forgotPassword?")}
          </Typography>
        </Stack>
        <Box>
          <Button
            color="primary"
            variant="contained"
            size="large"
            fullWidth
            type="submit"
          >
            {t("AUTH.signIn")}
          </Button>
        </Box>
      </form>
    </React.Fragment>
  );
};

export default Login;
