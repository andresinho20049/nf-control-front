import { Icon, Box, Grid, IconButton, Typography, LinearProgress, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, Button, Divider } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useSnackBarContext } from '../../context';
import { useInvoice } from './UseInvoice';
import { DialogConfirm } from '../../components/dialog/confirm-action/DialogConfirm';

export const Invoice = () => {

    const { showMsg } = useSnackBarContext();

    const {
        isLoading,

        openInvoiceDialog,

        selectedItem,
        handleDelete,
        handleConfirmDelete,

        rows,
        page,
        limitPage,
        totalCount,
        handleChangePage,
        handleChangeRowsPerPage,

    } = useInvoice();

    return (
        <Grid container sx={{ p: 2, gap: 3 }}>
            <Grid item xs={12}>
                <Box component={Paper} variant="elevation" sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: 'auto',
                    py: 2,
                    px: 5
                }}
                >
                    <Typography>
                        Controle de Notas Fiscais
                    </Typography>
                    
                    <Button
                        variant='outlined'
                        sx={{ px: 2, gap: 1 }}
                        onClick={() => openInvoiceDialog()}
                    >
                        <AddIcon />
                        Nova
                    </Button>
                </Box>
            </Grid>
            <Grid item xs={12}>
                <Divider />
                <TableContainer component={Paper} variant="elevation">
                    <Table sx={{ minWidth: 650 }} size="small" stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell>Numero da Nota</TableCell>
                                <TableCell>Competencia</TableCell>
                                <TableCell>Vencimento</TableCell>
                                <TableCell>Parceiro</TableCell>
                                <TableCell>Valor</TableCell>
                                <TableCell width={100}>Ações</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((invoice) => (
                                <TableRow
                                    key={invoice.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell>{invoice.invoiceNumber}</TableCell>
                                    <TableCell>{invoice.accrualDate.toLocaleString(`pt-BR`)}</TableCell>
                                    <TableCell>{invoice.dueDate.toLocaleString(`pt-BR`)}</TableCell>
                                    <TableCell>{invoice.partner.shortName}</TableCell>
                                    <TableCell>{invoice.value}</TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => openInvoiceDialog(invoice.id)} size="small">
                                            <Icon color='info'>edit</Icon>
                                        </IconButton>
                                        <IconButton onClick={() => handleConfirmDelete(invoice)} size="small">
                                            <Icon color='error'>delete</Icon>
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>

                        {totalCount === 0 && !isLoading && (
                            <caption> Nenhum Registro encontrado.</caption>
                        )}

                        <TableFooter>
                            {isLoading && (
                                <TableRow>
                                    <TableCell colSpan={3}>
                                        <LinearProgress variant="indeterminate" />
                                    </TableCell>
                                </TableRow>
                            )}

                            {totalCount !== 0 && !isLoading && (
                                <TableRow>
                                    <TableCell colSpan={3}>
                                        <TablePagination
                                            rowsPerPageOptions={[5, 10, 25]}
                                            component="div"
                                            count={totalCount}
                                            rowsPerPage={limitPage}
                                            page={page - 1}
                                            onPageChange={handleChangePage}
                                            onRowsPerPageChange={handleChangeRowsPerPage}
                                        />
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableFooter>
                    </Table>
                </TableContainer>

            </Grid>

            <DialogConfirm
                titleDialog="Excluir NF"
                contentText={`
                    Deseja realmente excluir a nota (${selectedItem.invoiceNumber})? 
                    Caso queira continuar é só clicar em confirmar.
                `}
                handleActionDialog={() => handleDelete(selectedItem.id || 0)}
            />

        </Grid>
    )
}