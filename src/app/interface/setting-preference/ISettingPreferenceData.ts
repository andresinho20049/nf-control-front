import { IUserData } from "../user/IUserData";

export interface ISettingPreferenceData {
    id: number;
    maxLimit: number;
    isSendSms: boolean;
    isSendMail: boolean;
    user: IUserData;
}