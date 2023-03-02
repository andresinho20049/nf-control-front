import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import * as yup from "yup";
import { FormHandles } from '@unform/core';
import { useSnackBarContext } from '../../../context';
import { IPartnerData } from '../../../interface';
import { CategoryService, InvoiceService, PartnerService } from '../../../services';
import { useFormDialogContext } from '../../../context/FormDialogContext';

export const useDialogPartner = () => {

    const { dialogOpened, handleClose, id } = useFormDialogContext();


    const title = useMemo(() => {
        return !!id ? 'Atualizar Parceiro' : 'Cadastrar Parceiro';
    }, [id]);

    const open = useMemo(() => {
        return dialogOpened === 'partner';
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
    const formValidSchema: yup.SchemaOf<IPartnerData> = yup.object().shape({
        id: yup.number().optional(),
        cnpj: yup.string().required(),
        shortName: yup.string().required(),
        legalName: yup.string().required(),
    });

    const handleSummit = useCallback((dados: IPartnerData) => {
        setIsLoading(true);

        dados.id = id

        formValidSchema
            .validate(dados, { abortEarly: false })
            .then((dadosValid) => {
                console.log(dadosValid);
                if (!!id) {
                    PartnerService.update(dadosValid).then((res) => {

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

                    PartnerService.save(dadosValid).then((res) => {

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