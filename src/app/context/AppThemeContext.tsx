import { createContext, ReactNode, useCallback, useContext, useMemo } from "react";
import usePersistedState from "../hooks/UsePersistedState";
import { DarkTheme, LightTheme } from "../theme";
import { ThemeProvider } from "@mui/material";

interface IAppThemeContextData {
    isDark: boolean;
    toggleIsDark: () => void;
}

export const AppThemeContext = createContext({} as IAppThemeContextData);

export const useAppThemeContext = () => {
    return useContext(AppThemeContext);
}

interface IAppThemeProviderProps {
    children: ReactNode
}

export const AppThemeProvider = ({ children }: IAppThemeProviderProps) => {
    const [isDark, setThemeIsDark] = usePersistedState<boolean>("themeIsDark", false);

    const toggleIsDark = useCallback(() => {
        setThemeIsDark((prev) => !prev);
    }, []);

    const theme = useMemo(() => {
        return isDark ? DarkTheme : LightTheme
    }, [isDark]);

    return (
        <AppThemeContext.Provider value={{ isDark, toggleIsDark }}>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </AppThemeContext.Provider>
    )
}