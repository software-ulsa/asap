import { CssBaseline, ThemeProvider } from "@mui/material";
import useSettings from "../../hooks/useSettings";

const MainTheme = ({ children }) => {
  const { settings } = useSettings();
  let activeTheme = { ...settings.themes[settings.activeTheme] };

  return (
    <ThemeProvider theme={activeTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default MainTheme;
