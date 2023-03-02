import { ICategoryData } from "../category/ICategoryData";
import { IPartnerData } from "../partner/IPartnerData";

export interface IExpenseData {
    id?: number;
    category: ICategoryData;
    value: number;
    name: string;
    accrualDate: string;
    paymentDate: string;
    partner: IPartnerData;
}
