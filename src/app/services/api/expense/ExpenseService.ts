import { IExpenseData, IPageableData, IStandardData } from "../../../interface";
import { ApiForm } from "../ApiConfig";

// const ApiForm = ApiConfig();

const findAll = async (): Promise<IExpenseData[] | Error> => {


    try {
        const { data } = await ApiForm.get('/expense');

        return data;
    } catch (error: any) {
        return new Error(error?.message || "Erro ao consultar a API");
    }
};

const findPaginated = async (page = 1, size = 5): Promise<IPageableData<IExpenseData> | Error> => {

    try {
        const { data } = await ApiForm.get(`/expense/paginated?page=${page - 1}&size=${size}`);

        return data;
    } catch (error: any) {
        return new Error(error?.message || "Erro ao consultar a API");
    }
};

const findById = async (id: number): Promise<IExpenseData | Error> => {

    try {
        const { data } = await ApiForm.get(`/expense/${id}`);

        return data;
    } catch (error: any) {
        return new Error(error?.message || "Erro ao consultar o Registro");
    }
};

const save = async (user: Omit<IExpenseData, 'id'>): Promise<string | Error> => {

    try {

        const { data } = await ApiForm.post<IStandardData>(`/expense`, user);

        return data.msg;
    } catch (error: any) {
        return new Error(error?.message || "Erro ao criar o Registro");
    }
};

const update = async (user: IExpenseData): Promise<string | Error> => {

    try {

        const { data } = await ApiForm.put<IStandardData>(`/expense`, user);

        return data.msg;
    } catch (error: any) {
        return new Error(error?.message || "Erro ao atualizar o Registro");
    }
};

const deleteById = async (id: number): Promise<void | Error> => {

    try {
        await ApiForm.delete(`/expense/${id}`);
    } catch (error: any) {
        return new Error(error?.message || "Erro ao deletar o Registro");
    }
};

export const ExpenseService = {
    findAll,
    findPaginated,
    findById,
    save,
    update,
    deleteById
};