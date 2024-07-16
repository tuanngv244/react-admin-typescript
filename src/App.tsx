import "@/languages/index";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { useTheme } from "./theme";

function App() {
  const theme = useTheme();
  console.log("theme", theme);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      Content
    </ThemeProvider>
  );
}

export default App;
