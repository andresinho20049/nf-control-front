import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import * as yup from "yup";
import { FormHandles } from '@unform/core';
import { PartnerService } from '../../../services';
import { useSnackBarContext } from '../../../context';
import { useFormDialogContext } from '../../../context/FormDialogContext';
import { ICategoryData, IExpenseData, IPartnerData } from '../../../interface';
import { ExpenseService } from './../../../services/api/expense/ExpenseService';
import { CategoryService } from './../../../services/api/category/CategoryService';

//hooks used autocomplete
const useFindPartner = () => {

    const getOptionLabelPartner = useCallback((partner: IPartnerData) => {
        return partner?.shortName || '';
    }, [])

    const findAutocompletePartner = useCallback(async (search: string): Promise<IPartnerData[]> => {

        const result = await PartnerService.findPaginated(search, 1, 5);
        if (result instanceof Error) return [] as IPartnerData[];

        return result.content;

    }, []);

    return {
        getOptionLabelPartner,
        findAutocompletePartner
    }
}
const useFindCategory = () => {

    const getOptionLabelCategory = useCallback((category: ICategoryData) => {
        return category?.name || '';
    }, [])

    const findAutocompleteCategory = useCallback(async (search: string): Promise<ICategoryData[]> => {

        const result = await CategoryService.findPaginated(search, 1, 5);
        if (result instanceof Error) return [] as ICategoryData[];

        return result.content;

    }, []);

    return {
        getOptionLabelCategory,
        findAutocompleteCategory
    }
}

export const useDialogExpense = () => {

    const { dialogOpened, handleClose, id } = useFormDialogContext();


    const title = useMemo(() => {
        return !!id ? 'Atualizar Despesa' : 'Cadastrar Despesa';
    }, [id]);

    const open = useMemo(() => {
        return dialogOpened === 'expense';
    }, [dialogOpened]);

    useEffect(() => {
        console.log(id);
        if (!!id && open) {
            ExpenseService.findById(id).then(res => {
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
    const formValidSchema: yup.SchemaOf<IExpenseData> = yup.object().shape({
        id: yup.number().optional(),
        name: yup.string().required(),
        category: yup.object().shape({
            id: yup.number().required(),
            name: yup.string().required(),
            description: yup.string().required(),
            isArchive: yup.boolean().required()
        }),
        accrualDate: yup.string().required(),
        paymentDate: yup.string().required(),
        partner: yup.object().optional().shape({
            id: yup.number().required(),
            cnpj: yup.string().required(),
            legalName: yup.string().required(),
            shortName: yup.string().required(),
        }),
        value: yup.number().required().min(0)
    });

    const handleSummit = useCallback((dados: IExpenseData) => {
        setIsLoading(true);

        dados.id = id;

        formValidSchema
            .validate(dados, { abortEarly: false })
            .then((dadosValid) => {

                if (!!id) {

                    ExpenseService.update(dadosValid).then((res) => {

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

                    ExpenseService.save(dadosValid).then((res) => {

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
        getOptionLabelPartner,
        findAutocompletePartner
    } = useFindPartner();

    const {
        getOptionLabelCategory,
        findAutocompleteCategory
    } = useFindCategory();

    return {
        title,
        open,

        isLoading,

        formRef,
        handleSave,
        handleClose,
        handleSummit,

        //Autocomplete hooks
        getOptionLabelPartner,
        findAutocompletePartner,

        getOptionLabelCategory,
        findAutocompleteCategory
    }
}