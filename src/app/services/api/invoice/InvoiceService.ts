import { IInvoiceData, IPageableData, IStandardData } from "../../../interface";
import { ApiForm } from "../ApiConfig";

// const ApiForm = ApiConfig();

const findAll = async (): Promise<IInvoiceData[] | Error> => {


    try {
        const { data } = await ApiForm.get('/invoice');

        return data;
    } catch (error: any) {
        return new Error(error?.message || "Erro ao consultar a API");
    }
};

const findPaginated = async (page = 1, size = 5): Promise<IPageableData<IInvoiceData> | Error> => {

    try {
        const { data } = await ApiForm.get(`/invoice/paginated?page=${page - 1}&size=${size}`);

        return data;
    } catch (error: any) {
        return new Error(error?.message || "Erro ao consultar a API");
    }
};

const findById = async (id: number): Promise<IInvoiceData | Error> => {

    try {
        const { data } = await ApiForm.get(`/invoice/${id}`);

        return data;
    } catch (error: any) {
        return new Error(error?.message || "Erro ao consultar o Registro");
    }
};

const save = async (user: Omit<IInvoiceData, 'id'>): Promise<string | Error> => {

    try {

        const { data } = await ApiForm.post<IStandardData>(`/invoice`, user);

        return data.msg;
    } catch (error: any) {
        return new Error(error?.message || "Erro ao criar o Registro");
    }
};

const update = async (user: IInvoiceData): Promise<string | Error> => {

    try {

        const { data } = await ApiForm.put<IStandardData>(`/invoice`, user);

        return data.msg;
    } catch (error: any) {
        return new Error(error?.message || "Erro ao atualizar o Registro");
    }
};

const deleteById = async (id: number): Promise<string | Error> => {

    try {
        const {data} = await ApiForm.delete<IStandardData>(`/invoice/${id}`);

        return data.msg;
    } catch (error: any) {
        return new Error(error?.message || "Erro ao deletar o Registro");
    }
};

export const InvoiceService = {
    findAll,
    findPaginated,
    findById,
    save,
    update,
    deleteById
};