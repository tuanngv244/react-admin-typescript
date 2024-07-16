import { ThemeMode } from "@/constants/theme";
import * as locales from "@mui/material/locale";
import { createTheme } from "@mui/material/styles";
import _ from "lodash";
import components from "./Components";
import DarkThemeColors from "./DarkThemeColors";
import { baseDarkTheme, baselightTheme } from "./DefaultColors";
import LightThemeColors from "./LightThemeColors";
import { darkshadows, shadows } from "./Shadows";
import Typography from "./Typography";
import { useAppSelector } from "@/store";

export const useTheme = () => {
  const customizer = useAppSelector((state) => state.customizer);
  const { activeTheme, activeMode, borderRadius } = customizer || {};
  const lightThemeOptions = LightThemeColors.find(
    (theme) => theme.name === activeTheme
  );
  const darkThemeOptions = DarkThemeColors.find(
    (theme) => theme.name === activeTheme
  );
  const defaultTheme =
    activeMode === ThemeMode.DARK ? baseDarkTheme : baselightTheme;
  const defaultShadow = activeMode === ThemeMode.DARK ? darkshadows : shadows;
  const themeSelect =
    activeMode === ThemeMode.DARK ? darkThemeOptions : lightThemeOptions;

  const baseMode = {
    palette: {
      mode: activeMode,
    },
    shape: {
      borderRadius: borderRadius,
    },
    shadows: defaultShadow,
    typography: Typography,
  };

  const theme = createTheme(
    _.merge({}, baseMode, defaultTheme, locales, themeSelect, {
      direction: "ltr",
    })
  );
  theme.components = components(theme);

  return theme;
};
