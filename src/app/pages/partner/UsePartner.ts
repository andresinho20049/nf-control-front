import { useCallback, useEffect, useMemo, useState } from "react";
import { useDialogConfirmAppContext } from '../../context/DialogConfirmAppContext';
import { CategoryService } from '../../services/api/category/CategoryService';
import { useFormDialogContext } from '../../context/FormDialogContext';
import { useDobounce } from "../../hooks/UseDebounce";
import { useSearchParams } from "react-router-dom";
import { useSnackBarContext } from '../../context';
import { IPartnerData } from '../../interface';
import { PartnerService } from "../../services";


export const usePartner = () => {

    const { debounce } = useDobounce();

    const { showMsg } = useSnackBarContext();

    const { dialogOpened, handleOpen } = useFormDialogContext();

    const { handleOpenDialog } = useDialogConfirmAppContext();
    const [selectedItem, setSelectedItem] = useState({} as IPartnerData);



    const handleConfirmDelete = useCallback((selectedItem: IPartnerData) => {
        setSelectedItem(selectedItem);
        handleOpenDialog(selectedItem.id);
    }, [selectedItem])

    const handleDelete = useCallback((id: number) => {
        PartnerService.deleteById(id)
            .then((result) => {
                if (result instanceof Error) {
                    showMsg(result.message)
                } else {
                    showMsg("Partner deletado com sucesso!", "success");
                    setSearchParams({ page: '0' }, { replace: true })
                }
            })
    }, [])

    const openDialog = useCallback((id?: number) => {
        handleOpen('partner', id);
    }, []);


    const [isLoading, setLoading] = useState(true);

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [limitPage, setLimitPage] = useState(5);
    const [totalCount, setTotalCount] = useState(0);
    const [rows, setRows] = useState<IPartnerData[]>([]);


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

            PartnerService.findPaginated('', page, limitPage)
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
    }
}