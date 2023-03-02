import { createContext, ReactNode, useCallback, useContext, useState } from "react";

interface IFormDialogContextData {
    data: Object | null;
    dialogOpened: IDialogType;
    handleOpen: (dialog: IDialogType, data?: Object) => void;
    handleClose: () => void;
}

export type IDialogType = 'invoice' | 'expense' | null;

const FormDialogContext = createContext({} as IFormDialogContextData);

export const useFormDialogContext = () => {
    return useContext(FormDialogContext);
}

interface IFormDialogProviderProps{
    children: ReactNode
}

export const FormDialogProvider = ({ children }: IFormDialogProviderProps) => {

    const [dialogOpened, setDialogOpened] = useState<IDialogType>(null);
    const [data, setData] = useState<Object | null>(null);

    const handleOpen = useCallback((dialog: IDialogType, data?: Object) => {
        setDialogOpened(dialog);
        setData(data || null);
    }, [data, dialogOpened]);

    const handleClose = useCallback(() => {
        setData(null);
        setDialogOpened(null);
    }, [data, dialogOpened]);

    return (
        <FormDialogContext.Provider value={{ data, dialogOpened, handleOpen, handleClose }}>
            {children}
        </FormDialogContext.Provider>
    )
}