import { Icon, Box, IconButton, LinearProgress, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow } from '@mui/material';
import { useSnackBarContext } from '../../context';
import { useUsuarios } from './UseUsuarios';

export const Usuarios = () => {

    const { showMsg } = useSnackBarContext();

    const {
        isLoading,

        rows,
        pagina,
        limitPage,
        totalCount,
        handleChangePage,
        handleChangeRowsPerPage,

    } = useUsuarios();

    return (
        <Box sx={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'center'
        }}>
            <TableContainer component={Paper} variant="outlined" sx={{ m: 1, width: 'auto' }}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell width={100}>Ações</TableCell>
                            <TableCell color='secundary'>Nome Completo</TableCell>
                            <TableCell>Email</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((user) => (
                            <TableRow
                                key={user.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell>
                                    <IconButton onClick={() => showMsg("Em desenvolvimento!", 'info')} size="small">
                                        <Icon color='error'>delete</Icon>
                                    </IconButton>
                                    <IconButton onClick={() => showMsg("Em desenvolvimento!", 'info')} size="small">
                                        <Icon color='info'>edit</Icon>
                                    </IconButton>
                                </TableCell>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
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
                                        page={pagina - 1}
                                        onPageChange={handleChangePage}
                                        onRowsPerPageChange={handleChangeRowsPerPage}
                                    />
                                </TableCell>
                            </TableRow>
                        )}
                    </TableFooter>
                </Table>
            </TableContainer>
        </Box>
    )
}