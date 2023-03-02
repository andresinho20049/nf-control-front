import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import * as yup from "yup";
import { FormHandles } from '@unform/core';
import { useSnackBarContext } from '../../../context';
import { IInvoiceData, IPartnerData } from '../../../interface';
import { InvoiceService, PartnerService } from '../../../services';
import { useFormDialogContext } from '../../../context/FormDialogContext';

//hooks used autocomplete
const useFindPartner = () => {

    const getOptionLabel = useCallback((partner: IPartnerData) => {
        return partner?.shortName || '';
    }, [])

    const findAutocompletePartner = useCallback(async (search: string): Promise<IPartnerData[]> => {

        const result = await PartnerService.findPaginated(search, 1, 5);
        if (result instanceof Error) return [] as IPartnerData[];

        return result.content;

    }, []);

    return {
        getOptionLabel,
        findAutocompletePartner
    }
}

export const useDialogInvoice = () => {

    const { dialogOpened, handleClose, id } = useFormDialogContext();


    const title = useMemo(() => {
        return !!id ? 'Atualizar NF' : 'Cadastrar NF';
    }, [id]);

    const open = useMemo(() => {
        return dialogOpened === 'invoice';
    }, [dialogOpened]);

    useEffect(() => {
        if (!!id && open) {
            InvoiceService.findById(id).then(res => {
                if (res instanceof Error) {
                    showMsg(res.message);
                    return;
                } else {
                    formRef.current?.setData(res);
                }
            })
        }
    }, [id, open]);


    const { showMsg } = useSnackBarContext();

    const [isLoading, setIsLoading] = useState(false);

    const formRef = useRef<FormHandles>(null);
    const formValidSchema: yup.SchemaOf<IInvoiceData> = yup.object().shape({
        id: yup.number().optional(),
        invoiceNumber: yup.number().required(),
        invoiceDescription: yup.string().optional(),
        accrualDate: yup.date().required(),
        dueDate: yup.date().required(),
        partner: yup.object().shape({
            id: yup.number().required(),
            cnpj: yup.string().required(),
            legalName: yup.string().required(),
            shortName: yup.string().required(),
        }),
        value: yup.number().required().min(0)
    });

    const handleSummit = useCallback((dados: IInvoiceData) => {
        setIsLoading(true);

        dados.id = id

        formValidSchema
            .validate(dados, { abortEarly: false })
            .then((dadosValid) => {
                console.log(dadosValid);
                if (!!id) {
                    InvoiceService.update(dadosValid).then((res) => {

                        setIsLoading(false);

                        if (res instanceof Error) {
                            showMsg(res.message);
                            return;
                        } else {
                            showMsg(res, 'success');
                            handleClose();
                        }
                    })
                } else {

                    InvoiceService.save(dadosValid).then((res) => {

                        setIsLoading(false);

                        if (res instanceof Error) {
                            showMsg(res.message);
                            return;
                        } else {
                            showMsg(res, 'success');
                            handleClose();
                        }
                    })
                }

            })
            .catch((errors: yup.ValidationError) => {
                const validationErrors: { [key: string]: string } = {}

                errors.inner.forEach((error: any) => {
                    if (!error.path || validationErrors[error.path]) return;

                    validationErrors[error.path] = error.message
                });
                formRef.current?.setErrors(validationErrors);

                setIsLoading(false);
            })

    }, [id]);

    const handleSave = useCallback(() => {
        formRef.current?.submitForm();
    }, []);


    const {
        getOptionLabel,
        findAutocompletePartner
    } = useFindPartner();

    return {
        title,
        open,

        isLoading,

        formRef,
        handleSave,
        handleClose,
        handleSummit,

        //Autocomplete hooks
        getOptionLabel,
        findAutocompletePartner
    }
}