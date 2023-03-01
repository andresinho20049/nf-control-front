import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from "react";
import usePersistedState from "../hooks/UsePersistedState";
import { IPayloadData, IUserLogin } from "../interface";
import { AuthService } from "../services";
import { WithAxios } from "../services/api/WithAxios";

interface IAuthenticationData {
    token: string | null;
    isAuthenticated: boolean;
    login: (login: IUserLogin) => Promise<Error | void>;
    logout: () => void;
    userLogged: IPayloadData | null
}

export const AuthenticationContext = createContext({} as IAuthenticationData);

export const useAuthenticationContext = () => {
    return useContext(AuthenticationContext);
}

interface IAuthenticationProviderProps {
    children: ReactNode
}

export const AuthenticationProvider = ({ children }: IAuthenticationProviderProps) => {
    const [token, setToken] = usePersistedState<string | null>('auth', null);
    const [userLogged, setUserLogged] = useState<IPayloadData | null>(null);

    const handleLogin = useCallback(async (login: IUserLogin): Promise<void | Error> => {

        try {
            const accessToken = await AuthService.login(login);
            setToken(accessToken);

        } catch (error: any) {
            return new Error(error?.message || "Login Invalido!");
        }

    }, [])

    const handleLogout = useCallback(() => {
        if (token !== null)
            AuthService.logout(token);

        setToken(null);
    }, [token]);

    useMemo(() => {
        const payload = AuthService.parseToken(token);
        setUserLogged(payload);
    }, [token]);

    const isAuthenticated = useMemo(() => {
        return !!userLogged && Date.now() < userLogged?.exp * 1000;
    }, [userLogged]);

    return (
        <AuthenticationContext.Provider value={{ token, isAuthenticated, login: handleLogin, logout: handleLogout, userLogged }}>
            <WithAxios>
                {children}
            </WithAxios>
        </AuthenticationContext.Provider>
    )
}