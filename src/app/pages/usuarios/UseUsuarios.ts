import { useEffect, useMemo, useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { useDobounce } from "../../hooks/UseDebounce";
import { IUserData } from '../../interface';
import { UserService } from "../../services";


export const useUsuarios = () => {

    const { debounce } = useDobounce();

    const [isLoading, setLoading] = useState(true);
    
    const [limitPage, setLimitPage] = useState(5);
    const [totalCount, setTotalCount] = useState(0);
    const [rows, setRows] = useState<IUserData[]>([]);

    
    const [searchParams, setSearchParams] = useSearchParams();
    
    const pagina = useMemo(() => {
        return Number(searchParams.get('pagina') || '1');
    }, [searchParams]);
    
    const handleChangePage = useCallback((event: unknown, newPage: number) => {
        console.log('ChangePage', newPage)
        console.log(event)
        setSearchParams({ pagina: String(newPage + 1) }, { replace: true })
    }, []);
    
    const handleChangeRowsPerPage = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        console.log('handle Change Rows PerPage')
        setLimitPage(parseInt(event.target.value));
        setSearchParams({ pagina: '1' }, { replace: true })
    }, []);

    useEffect(() => {
        setLoading(true);

        debounce(() => {

            UserService.getPaginated(pagina, limitPage)
                .then((res) => {
                    setLoading(false);

                    if(res instanceof Error){
                        console.error(res);
                    } else {   
                        setRows(res.content);
                        setTotalCount(res.totalElements);
                    }
                });
        })
    }, [pagina, limitPage])

    return {
        isLoading,

        rows,
        pagina,
        limitPage,
        totalCount,
        handleChangePage,
        handleChangeRowsPerPage,
    }
}