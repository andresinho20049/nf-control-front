import { ICategoryData, IPageableData, IStandardData } from "../../../interface";
import { ApiForm } from "../ApiConfig";

// const ApiForm = ApiConfig();

const findAll = async (): Promise<ICategoryData[] | Error> => {


    try {
        const { data } = await ApiForm.get('/category');

        return data;
    } catch (error: any) {
        return new Error(error?.message || "Erro ao consultar a API");
    }
};

const findPaginated = async (search = '', page = 1, size = 5): Promise<IPageableData<ICategoryData> | Error> => {

    try {
        const { data } = await ApiForm.get(`/category/paginated?page=${page - 1}&size=${size}&search=${search}`);

        return data;
    } catch (error: any) {
        return new Error(error?.message || "Erro ao consultar a API");
    }
};

const findById = async (id: number): Promise<ICategoryData | Error> => {

    try {
        const { data } = await ApiForm.get(`/category/${id}`);

        return data;
    } catch (error: any) {
        return new Error(error?.message || "Erro ao consultar o Registro");
    }
};

const save = async (user: Omit<ICategoryData, 'id'>): Promise<string | Error> => {

    try {

        const { data } = await ApiForm.post<IStandardData>(`/category`, user);

        return data.msg;
    } catch (error: any) {
        return new Error(error?.message || "Erro ao criar o Registro");
    }
};

const update = async (user: ICategoryData): Promise<string | Error> => {

    try {

        const { data } = await ApiForm.put<IStandardData>(`/category`, user);

        return data.msg;
    } catch (error: any) {
        return new Error(error?.message || "Erro ao atualizar o Registro");
    }
};

const deleteById = async (id: number): Promise<void | Error> => {

    try {
        await ApiForm.delete(`/category/${id}`);
    } catch (error: any) {
        return new Error(error?.message || "Erro ao deletar o Registro");
    }
};

const archiveById = async (id: number): Promise<void | Error> => {

    try {
        await ApiForm.patch(`/category/archive/${id}`);
    } catch (error: any) {
        return new Error(error?.message || "Error na operação");
    }
};

export const CategoryService = {
    findAll,
    findPaginated,
    findById,
    save,
    update,
    deleteById,
    archiveById
};