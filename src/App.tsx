import { useTheme } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { useRoutes } from "react-router-dom";
import routes from "./configs/routes";
import ScrollToTop from "./components/ScrollToTop";
import { initLanguage } from "./languages";
import { useEffect } from "react";

function App() {
  const theme = useTheme();
  const routing = useRoutes(routes);

  useEffect(() => {
    initLanguage();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ScrollToTop>{routing}</ScrollToTop>
    </ThemeProvider>
  );
}

export default App;
