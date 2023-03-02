import { Icon, Box, Grid, IconButton, Typography, LinearProgress, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, Button, Divider } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useCategory } from './UseCategory';
import { DialogConfirm } from '../../components/dialog/confirm-action/DialogConfirm';

export const Category = () => {

    const {
        isLoading,

        openDialog,

        selectedItem,
        handleDelete,
        handleConfirmDelete,

        rows,
        page,
        limitPage,
        totalCount,
        handleChangePage,
        handleChangeRowsPerPage,

    } = useCategory();

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
                        Controle de Categoria
                    </Typography>
                    
                    <Button
                        variant='outlined'
                        sx={{ px: 2, gap: 1 }}
                        onClick={() => openDialog()}
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
                                <TableCell>Nome</TableCell>
                                <TableCell>Descrição</TableCell>
                                <TableCell width={100}>Ações</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((category) => (
                                <TableRow
                                    key={category.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell>{category.name}</TableCell>
                                    <TableCell>{category.description}</TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => openDialog(category.id)} size="small">
                                            <Icon color='info'>edit</Icon>
                                        </IconButton>
                                        <IconButton onClick={() => handleConfirmDelete(category)} size="small">
                                            <Icon color='warning'>archive</Icon>
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>

                        {totalCount === 0 && !isLoading && (
                            <Typography> Nenhum Registro encontrado.</Typography>
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
                titleDialog="Arquiva Categoria"
                contentText={`
                    Deseja realmente arquiva a Categoria (${selectedItem.name})? 
                    Caso queira continuar é só clicar em confirmar.
                `}
                handleActionDialog={() => handleDelete(selectedItem.id || 0)}
            />

        </Grid>
    )
}