import { useDialogConfirmAppContext } from './../../context/DialogConfirmAppContext';
import { InvoiceService } from './../../services/api/invoice/InvoiceService';
import { useEffect, useMemo, useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { useDobounce } from "../../hooks/UseDebounce";
import { IInvoiceData, IUserData } from '../../interface';
import { UserService } from "../../services";
import { useFormDialogContext } from '../../context/FormDialogContext';
import { useSnackBarContext } from '../../context';


export const useInvoice = () => {

    const { debounce } = useDobounce();

    const { showMsg } = useSnackBarContext();

    const { dialogOpened, handleOpen } = useFormDialogContext();

    const { handleOpenDialog } = useDialogConfirmAppContext();
    const [selectedItem, setSelectedItem] = useState({} as IInvoiceData);



    const handleConfirmDelete = useCallback((selectedItem: IInvoiceData) => {
        setSelectedItem(selectedItem);
        handleOpenDialog(selectedItem.id);
    }, [selectedItem])

    const handleDelete = useCallback((id: number) => {
        InvoiceService.deleteById(id)
            .then((result) => {
                if (result instanceof Error) {
                    showMsg(result.message)
                } else {
                    showMsg("NF deletada com sucesso!", "success");
                    setSearchParams({ page: '0' }, { replace: true })
                }
            })
    }, [])

    const openInvoiceDialog = useCallback((id?: number) => {
        handleOpen('invoice', id);
    }, []);


    const [isLoading, setLoading] = useState(true);

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [limitPage, setLimitPage] = useState(5);
    const [totalCount, setTotalCount] = useState(0);
    const [rows, setRows] = useState<IInvoiceData[]>([]);


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

            InvoiceService.findPaginated(page, limitPage)
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
    }
}