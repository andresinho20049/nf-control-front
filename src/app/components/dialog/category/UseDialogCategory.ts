import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import * as yup from "yup";
import { FormHandles } from '@unform/core';
import { useSnackBarContext } from '../../../context';
import { ICategoryData } from '../../../interface';
import { CategoryService, InvoiceService } from '../../../services';
import { useFormDialogContext } from '../../../context/FormDialogContext';

export const useDialogCategory = () => {

    const { dialogOpened, handleClose, id } = useFormDialogContext();


    const title = useMemo(() => {
        return !!id ? 'Atualizar Categoria' : 'Cadastrar Categoria';
    }, [id]);

    const open = useMemo(() => {
        return dialogOpened === 'category';
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
    const formValidSchema: yup.SchemaOf<ICategoryData> = yup.object().shape({
        id: yup.number().optional(),
        name: yup.string().required(),
        description: yup.string().required(),
        isArchive: yup.boolean().default(false)
    });

    const handleSummit = useCallback((dados: ICategoryData) => {
        setIsLoading(true);

        dados.id = id

        formValidSchema
            .validate(dados, { abortEarly: false })
            .then((dadosValid) => {
                console.log(dadosValid);
                if (!!id) {
                    CategoryService.update(dadosValid).then((res) => {

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

                    CategoryService.save(dadosValid).then((res) => {

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

    return {
        title,
        open,

        isLoading,

        formRef,
        handleSave,
        handleClose,
        handleSummit
    }
}