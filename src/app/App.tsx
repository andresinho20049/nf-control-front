import { darkScrollbar, GlobalStyles } from "@mui/material";
import { AppThemeProvider, AuthenticationProvider, SnackBarProvider } from "./context";
import './form/TranslateYup';
import { Rotas } from "./routes/Rotas";

const App = () => {
  return (
    <AppThemeProvider>
      <SnackBarProvider>
        <GlobalStyles styles={{ ...darkScrollbar() }} />
        <AuthenticationProvider>
          <Rotas />
        </AuthenticationProvider>
      </SnackBarProvider>
    </AppThemeProvider>
  );
}

export default App;
