import { Form } from '@unform/web';
import { VAutocomplete, VTextField } from '../..';
import { useDialogExpense } from './UseDialogExpense';
import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid } from '@mui/material';


export const DialogExpense = () => {

    const { 
        title,
        open,

        isLoading,

        formRef,
        handleSave,
        handleClose,
        handleSummit,

        //Autocomplete hooks
        getOptionLabelPartner,
        findAutocompletePartner,

        getOptionLabelCategory,
        findAutocompleteCategory
    } = useDialogExpense();

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
                                <Grid item xs={12}>
                                    <VAutocomplete
                                        name="category"
                                        label='Categoria'
                                        getLabel={getOptionLabelCategory}
                                        findValues={(b) => findAutocompleteCategory(b)}
                                        isExtLoading={isLoading}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <VTextField
                                        autoFocus
                                        fullWidth
                                        id="value"
                                        label="Valor"
                                        name="value"
                                        variant="standard"
                                        type="number"
                                        disabled={isLoading}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <VTextField
                                        fullWidth
                                        id="name"
                                        label="Nome"
                                        name="name"
                                        variant="standard"
                                        disabled={isLoading}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <VTextField
                                        fullWidth
                                        id="accrualDate"
                                        name="accrualDate"
                                        label="Competencia"
                                        placeholder='Competencia'
                                        variant="outlined"
                                        type="month"
                                        disabled={isLoading}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <VTextField
                                        fullWidth
                                        id="paymentDate"
                                        name="paymentDate"
                                        label="Data de pagamento"
                                        placeholder='Data de pagamento'
                                        variant="outlined"
                                        type="date"
                                        disabled={isLoading}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <VAutocomplete
                                        name="partner"
                                        label='Parceiro'
                                        getLabel={getOptionLabelPartner}
                                        findValues={(b) => findAutocompletePartner(b)}
                                        isExtLoading={isLoading}
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