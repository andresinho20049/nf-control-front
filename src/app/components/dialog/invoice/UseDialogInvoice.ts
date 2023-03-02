import { FormHandles, Omit } from '@unform/core';
import { Form } from '@unform/web';
import { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import * as yup from "yup";
import { VAutocomplete, VTextField } from '../..';
import { useSnackBarContext } from '../../../context';
import { useFormDialogContext } from '../../../context/FormDialogContext';
import { IInvoiceData, IPartnerData } from '../../../interface';
import { InvoiceService, PartnerService } from '../../../services'

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

    const { dialogOpened, handleClose, data } = useFormDialogContext();


    const title = useMemo(() => {
        return !!data ? 'Atualizar NF' : 'Cadastrar NF';
    }, []);

    const open = useMemo(() => {
        return dialogOpened === 'invoice';
    }, [dialogOpened]);

    useEffect(() => {
        if(!!data) {
            formRef.current?.setData(data);
        }
    }, [data]);


    const { showMsg } = useSnackBarContext();

    const [isLoading, setIsLoading] = useState(false);

    const formRef = useRef<FormHandles>(null);
    const formValidSchema: yup.SchemaOf<Omit<IInvoiceData, 'id'>> = yup.object().shape({
        invoiceNumber: yup.number().required(),
        invoiceDescription: yup.string().optional(),
        accrualDate: yup.string().required(),
        dueDate: yup.string().required(),
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

        formValidSchema
            .validate(dados, { abortEarly: false })
            .then((dadosValid) => {

                InvoiceService.save(dadosValid).then((res) => {
                    
                    setIsLoading(false);

                    if(res instanceof Error){
                        showMsg(res.message);
                        return;
                    } else {
                        showMsg(res, 'success');
                        handleClose();
                    }
                })

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

    }, []);

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