import { createContext, ReactNode, useCallback, useContext, useState } from "react";

interface IFormDialogContextData {
    id?: number;
    dialogOpened: IDialogType;
    handleOpen: (dialog: IDialogType, id?: number) => void;
    handleClose: () => void;
}

export type IDialogType = 'invoice' | 'expense' | 'category' | 'partner' | null;

const FormDialogContext = createContext({} as IFormDialogContextData);

export const useFormDialogContext = () => {
    return useContext(FormDialogContext);
}

interface IFormDialogProviderProps{
    children: ReactNode
}

export const FormDialogProvider = ({ children }: IFormDialogProviderProps) => {

    const [dialogOpened, setDialogOpened] = useState<IDialogType>(null);
    const [id, setId] = useState<number>();

    const handleOpen = useCallback((dialog: IDialogType, id?: number) => {
        setDialogOpened(dialog);
        setId(id);
    }, [id, dialogOpened]);

    const handleClose = useCallback(() => {
        setId(undefined);
        setDialogOpened(null);
    }, [id, dialogOpened]);

    return (
        <FormDialogContext.Provider value={{ id, dialogOpened, handleOpen, handleClose }}>
            {children}
        </FormDialogContext.Provider>
    )
}