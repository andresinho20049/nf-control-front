import { ISettingPreferenceData } from "../../../interface";
import { ApiForm } from "../ApiConfig";

const findById = async (id: number): Promise<ISettingPreferenceData | Error> => {

    try {
        const { data } = await ApiForm.get(`/preference-setting/${id}`);

        return data;
    } catch (error: any) {
        return new Error(error?.message || "Erro ao consultar o Registro");
    }
};

const update = async (user: ISettingPreferenceData): Promise<ISettingPreferenceData | Error> => {

    try {

        const { data } = await ApiForm.put<ISettingPreferenceData>(`/preference-setting`, user);

        return data;
    } catch (error: any) {
        return new Error(error?.message || "Erro ao atualizar o Registro");
    }
};

const findByUser = async (id: number): Promise<ISettingPreferenceData | Error> => {

    try {
        const { data } = await ApiForm.get(`/preference-setting/find-by-user`);

        return data;
    } catch (error: any) {
        return new Error(error?.message || "Erro ao consultar o Registro");
    }
};
export const PreferenceSettingService = {
    findById,
    update,
    findByUser
};