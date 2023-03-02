import { Form } from '@unform/web';
import { VAutocomplete, VTextField } from '../..';
import { useDialogCategory } from './UseDialogCategory';
import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid } from '@mui/material';


export const DialogCategory = () => {

    const { 
        title,
        open,

        isLoading,

        formRef,
        handleSave,
        handleClose,
        handleSummit

    } = useDialogCategory();

    return (
        <Dialog open={open}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Os valores do Dash serão ajustado após os dados serem persistidos.
                </DialogContentText>
                <Box
                    sx={{
                        my: 4,
                        mx: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Form ref={formRef} onSubmit={handleSummit}>
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>

                            <Grid container spacing={2} xs={12}>
                                <Grid item sx={{display: "none"}}>
                                    <VTextField
                                        fullWidth
                                        id="id"
                                        name="id"
                                        variant="standard"
                                        type="number"
                                        disabled={isLoading}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <VTextField
                                        autoFocus
                                        fullWidth
                                        id="name"
                                        label="Name"
                                        name="name"
                                        variant="standard"
                                        type="text"
                                        disabled={isLoading}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <VTextField
                                        fullWidth
                                        id="description"
                                        label="Descrição"
                                        name="description"
                                        variant="standard"
                                        disabled={isLoading}
                                    />
                                </Grid>
                            </Grid>

                        </Box>
                    </Form>
                </Box>

            </DialogContent>
            <DialogActions>
                <Button
                    fullWidth
                    type="button"
                    onClick={handleClose}
                    variant="outlined"
                    disabled={isLoading}
                    sx={{ mt: 5, mb: 2 }}
                    endIcon={isLoading ? <CircularProgress variant="indeterminate" size={22} /> : undefined}
                >
                    Cancelar
                </Button>
                <Button
                    fullWidth
                    type="button"
                    onClick={handleSave}
                    variant="contained"
                    disabled={isLoading}
                    sx={{ mt: 5, mb: 2 }}
                    endIcon={isLoading ? <CircularProgress variant="indeterminate" size={22} /> : undefined}
                >
                    Salvar
                </Button>
            </DialogActions>
        </Dialog>
    )
}