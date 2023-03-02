import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material"
import { useDialogConfirmAppContext } from "../../../context/DialogConfirmAppContext"

interface IDialogConfirmProps {
    titleDialog: string;
    contentText: string;

    handleActionDialog: (id?: number) => void
}

export const DialogConfirm = ({
    titleDialog,
    contentText,

    handleActionDialog
}: IDialogConfirmProps) => {

    const { openDialog, handleCloseDialog, handleConfirmDialog } = useDialogConfirmAppContext();

    return (
        <Dialog
            maxWidth="sm"
            fullWidth={true}
            open={openDialog}
            onClose={handleCloseDialog}
        >
            <DialogTitle>
                {titleDialog}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {contentText}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" onClick={handleCloseDialog}>Cancelar</Button>
                <Button variant="contained" onClick={() => handleConfirmDialog(handleActionDialog)} autoFocus>
                    Confirmar
                </Button>
            </DialogActions>
        </Dialog>
    )
}