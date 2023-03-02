import { Icon, Box, Grid, IconButton, Typography, LinearProgress, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, Button } from '@mui/material';
import { DialogConfirm } from '../../components/dialog/confirm-action/DialogConfirm';
import AddIcon from '@mui/icons-material/Add';
import { useExpense } from './UseExpense';

export const Expense = () => {

    const {
        isLoading,

        openExpenseDialog,

        selectedItem,
        handleDelete,
        handleConfirmDelete,

        rows,
        page,
        limitPage,
        totalCount,
        handleChangePage,
        handleChangeRowsPerPage,

    } = useExpense();

    return (
        <Grid container sx={{ p: 2, gap: 2 }}>
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
                        Controle de Despesas
                    </Typography>
                    <Button
                        variant='outlined'
                        sx={{ px: 2, gap: 1 }}
                        onClick={() => openExpenseDialog()}
                    >
                        <AddIcon />
                        Nova
                    </Button>
                </Box>
            </Grid>
            <Grid item xs={12}>
                <TableContainer component={Paper} variant="elevation">
                    <Table sx={{ minWidth: 650 }} size="small" stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell>Parceiro</TableCell>
                                <TableCell>Categoria</TableCell>
                                <TableCell>Nome</TableCell>
                                <TableCell>Competencia</TableCell>
                                <TableCell>Data de Pagamento</TableCell>
                                <TableCell>Valor</TableCell>
                                <TableCell width={100}>Ações</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((expense) => (
                                <TableRow
                                    key={expense.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell>{expense.partner.shortName}</TableCell>
                                    <TableCell>{expense.category.name}</TableCell>
                                    <TableCell>{expense.name}</TableCell>
                                    <TableCell>{expense.accrualDate}</TableCell>
                                    <TableCell>{expense.paymentDate}</TableCell>
                                    <TableCell>{expense.value}</TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => openExpenseDialog(expense.id)} size="small">
                                            <Icon color='info'>edit</Icon>
                                        </IconButton>
                                        <IconButton onClick={() => handleConfirmDelete(expense)} size="small">
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
                titleDialog="Excluir Despesa"
                contentText={`
                    Deseja realmente excluir a despesa (${selectedItem.name})? 
                    Caso queira continuar é só clicar em confirmar.
                `}
                handleActionDialog={() => handleDelete(selectedItem.id || 0)}
            />

        </Grid>
    )
}