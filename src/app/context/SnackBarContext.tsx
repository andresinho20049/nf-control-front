import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from "react";
import { AlertColor } from "@mui/material/Alert";


interface ISnackBarContextData {
    msg: string | null,
    showMsg: (msg: string, severity?: AlertColor | undefined) => void,
    isMsg: boolean,
    severity: AlertColor,
    handleClose: () => void
}

export const SnackBarContext = createContext({} as ISnackBarContextData);

export const useSnackBarContext = () => useContext(SnackBarContext);

interface ISnackBarProviderProps {
    children: ReactNode
}

export const SnackBarProvider = ({children}:ISnackBarProviderProps) => {

    const [msg, setMsg] = useState<string | null>(null);
    const [severity, setSeverity] = useState<AlertColor>('error');

    const showMsg = useCallback((msg: string, severity: AlertColor = 'error') => {
        setMsg(msg);
        setSeverity(severity);
    }, [msg, severity]);

    const handleClose = useCallback(() => {
        setMsg(null);
    }, [msg])

    const isMsg = useMemo(() => {
        return !!msg;
    }, [msg]);
    
    return (
        <SnackBarContext.Provider value={{msg, showMsg, isMsg, severity, handleClose}}>
            {children}
        </SnackBarContext.Provider>
    )

}