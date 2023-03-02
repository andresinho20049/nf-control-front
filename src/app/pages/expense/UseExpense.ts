import { ExpenseService } from './../../services/api/expense/ExpenseService';
import { useDialogConfirmAppContext } from '../../context/DialogConfirmAppContext';
import { useEffect, useMemo, useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { useDobounce } from "../../hooks/UseDebounce";
import { IExpenseData, IUserData } from '../../interface';
import { useFormDialogContext } from '../../context/FormDialogContext';
import { useSnackBarContext } from '../../context';


export const useExpense = () => {

    const { debounce } = useDobounce();

    const { showMsg } = useSnackBarContext();

    const { dialogOpened, handleOpen } = useFormDialogContext();

    const { handleOpenDialog } = useDialogConfirmAppContext();
    const [selectedItem, setSelectedItem] = useState({} as IExpenseData);



    const handleConfirmDelete = useCallback((selectedItem: IExpenseData) => {
        setSelectedItem(selectedItem);
        handleOpenDialog(selectedItem.id);
    }, [selectedItem])

    const handleDelete = useCallback((id: number) => {
        ExpenseService.deleteById(id)
            .then((result) => {
                if (result instanceof Error) {
                    showMsg(result.message)
                } else {
                    showMsg("Depesa deletada com sucesso!", "success");
                    setSearchParams({ page: '0' }, { replace: true })
                }
            })
    }, [])

    const openExpenseDialog = useCallback((id?: number) => {
        handleOpen('expense', id);
    }, []);


    const [isLoading, setLoading] = useState(true);

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [limitPage, setLimitPage] = useState(5);
    const [totalCount, setTotalCount] = useState(0);
    const [rows, setRows] = useState<IExpenseData[]>([]);


    const [searchParams, setSearchParams] = useSearchParams();

    useMemo(() => {
        const paramPage = Number(searchParams.get('page') || '1');

        if (paramPage < 1 || paramPage > totalPages) {
            setSearchParams({ page: '1' }, { replace: true });
            setPage(1);
        }

        setPage(paramPage);
    }, [searchParams, totalPages]);


    const handleChangePage = useCallback((event: unknown, newPage: number) => {
        console.log('ChangePage', newPage)
        console.log(event)
        setSearchParams({ page: String(newPage + 1) }, { replace: true })
    }, []);

    const handleChangeRowsPerPage = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        console.log('handle Change Rows PerPage')
        setLimitPage(parseInt(event.target.value));
        setSearchParams({ page: '1' }, { replace: true })
    }, []);

    useEffect(() => {
        setLoading(true);

        debounce(() => {

            ExpenseService.findPaginated(page, limitPage)
                .then((res) => {
                    setLoading(false);

                    if (res instanceof Error) {
                        console.error(res);
                    } else {
                        setRows(res.content);
                        setTotalPages(res.totalPages);
                        setTotalCount(res.totalElements);
                    }
                });
        })
    }, [dialogOpened, page, limitPage])

    return {
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
    }
}