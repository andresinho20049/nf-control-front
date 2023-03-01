import { IPageableData, IUserData } from "../../../interface";
import { ApiForm } from "../ApiConfig";

// const ApiForm = ApiConfig();

const getAll = async (): Promise<IUserData[] | Error> => {


    try {
        const { data } = await ApiForm.get('/usuarios');

        return data;
    } catch (error: any) {
        return new Error(error?.message || "Erro ao consultar a API");
    }
};

const getPaginated = async (page = 1, size = 5): Promise<IPageableData | Error> => {

    try {
        const { data } = await ApiForm.get(`/user/paginated?page=${page - 1}&size=${size}`);

        return data;
    } catch (error: any) {
        return new Error(error?.message || "Erro ao consultar a API");
    }
};

const getById = async (id: number): Promise<IUserData | Error> => {

    try {
        const { data } = await ApiForm.get(`/usuarios/${id}`);

        return data;
    } catch (error: any) {
        return new Error(error?.message || "Erro ao consultar o Registro");
    }
};

const getByUsername = async (username: string): Promise<IUserData[] | Error> => {

    try {

        const { data } = await ApiForm.get(`/usuarios?username=${username}`);

        return data;
    } catch (error: any) {
        return new Error(error?.message || "Erro ao consultar o Registro");
    }
};

const create = async (user: Omit<IUserData, 'id'>): Promise<IUserData | Error> => {

    try {

        const { data } = await ApiForm.post<IUserData>(`/usuarios`, user);

        return data;
    } catch (error: any) {
        return new Error(error?.message || "Erro ao criar o Registro");
    }
};

const update = async (user: IUserData): Promise<IUserData | Error> => {

    try {

        const { data } = await ApiForm.put<IUserData>(`/usuarios/${user.id}`, user);

        return data;
    } catch (error: any) {
        return new Error(error?.message || "Erro ao atualizar o Registro");
    }
};

const deleteById = async (id: number): Promise<void | Error> => {

    try {
        await ApiForm.delete(`/usuarios/${id}`);
    } catch (error: any) {
        return new Error(error?.message || "Erro ao deletar o Registro");
    }
};

export const UserService = {
    getAll,
    getPaginated,
    create,
    getById,
    getByUsername,
    update,
    deleteById
};