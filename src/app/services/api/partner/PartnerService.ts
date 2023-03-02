import { IStandardData } from './../../../interface/standard/IStandardData';
import { IPageableData, IPartnerData } from "../../../interface";
import { ApiForm } from "../ApiConfig";

// const ApiForm = ApiConfig();

const findAll = async (): Promise<IPartnerData[] | Error> => {


    try {
        const { data } = await ApiForm.get('/partner');

        return data;
    } catch (error: any) {
        return new Error(error?.message || "Erro ao consultar a API");
    }
};

const findPaginated = async (search = '', page = 1, size = 5): Promise<IPageableData<IPartnerData> | Error> => {

    try {

        const searchParam = !search || search === '' ? '' : `&search=${search}`;

        const { data } = await ApiForm.get(`/partner/paginated?page=${page - 1}&size=${size}${searchParam}`);

        return data;
    } catch (error: any) {
        return new Error(error?.message || "Erro ao consultar a API");
    }
};

const findById = async (id: number): Promise<IPartnerData | Error> => {

    try {
        const { data } = await ApiForm.get(`/partner/${id}`);

        return data;
    } catch (error: any) {
        return new Error(error?.message || "Erro ao consultar o Registro");
    }
};

const save = async (user: Omit<IPartnerData, 'id'>): Promise<string | Error> => {

    try {

        const { data } = await ApiForm.post<IStandardData>(`/partner`, user);

        return data.msg;
    } catch (error: any) {
        return new Error(error?.message || "Erro ao criar o Registro");
    }
};

const update = async (user: IPartnerData): Promise<string | Error> => {

    try {

        const { data } = await ApiForm.put<IStandardData>(`/partner`, user);

        return data.msg;
    } catch (error: any) {
        return new Error(error?.message || "Erro ao atualizar o Registro");
    }
};

const deleteById = async (id: number): Promise<void | Error> => {

    try {
        await ApiForm.delete(`/partner/${id}`);
    } catch (error: any) {
        return new Error(error?.message || "Erro ao deletar o Registro");
    }
};

export const PartnerService = {
    findAll,
    findPaginated,
    findById,
    save,
    update,
    deleteById
};