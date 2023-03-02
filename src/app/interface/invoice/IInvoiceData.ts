import { IPartnerData } from "../partner/IPartnerData";

export interface IInvoiceData {
    id?: number;
    accrualDate: Date;
    dueDate: Date;
    invoiceDescription?: string;
    invoiceNumber: number;
    partner: IPartnerData;
    value: number;
}