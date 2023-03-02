import { IPartnerData } from "../partner/IPartnerData";

export interface IInvoiceData {
    id: number;
    accrualDate: string;
    dueDate: string;
    invoiceDescription?: string;
    invoiceNumber: number;
    partner: IPartnerData;
    value: number;
}