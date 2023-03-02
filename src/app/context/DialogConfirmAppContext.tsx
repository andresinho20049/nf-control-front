import { createContext, ReactNode, useCallback, useContext, useState } from "react";

interface IDialogConfirmAppContextData {
    openDialog: boolean,
    handleOpenDialog: (id?: number) => void
    handleConfirmDialog: (func: (id?:number) => void) => void
    handleCloseDialog: () => void
}

export const DialogConfirmAppContext = createContext({} as IDialogConfirmAppContextData);

interface IDialogConfirmAppProviderProps {
    children: ReactNode
}

export const useDialogConfirmAppContext = () => {
    return useContext(DialogConfirmAppContext);
}

export const DialogConfirmAppProvider = ({ children }: IDialogConfirmAppProviderProps) => {
    
    const [openDialog, setOpenDialog] = useState(false);
    const [idParam, setIdParam] = useState<number | undefined>(undefined);

    const handleOpenDialog = useCallback((id?: number) => {
        setOpenDialog(true);
        setIdParam(id);
    }, [openDialog, idParam])

    const handleConfirmDialog = useCallback((func: (id?:number) => void) => {
        func(idParam);
        handleCloseDialog();
    }, [openDialog, idParam])

    const handleCloseDialog = useCallback(() => {
        setIdParam(undefined);
        setOpenDialog(false);
    }, [openDialog])

    return (
        <DialogConfirmAppContext.Provider value={{openDialog, handleOpenDialog, handleConfirmDialog, handleCloseDialog}}>
            {children}
        </DialogConfirmAppContext.Provider>
    )
}