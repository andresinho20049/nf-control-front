import * as yup from "yup";
import { FormHandles } from '@unform/core';
import { useNavigate } from 'react-router-dom';
import { useCallback, useState, useRef } from 'react';

interface IUserForgetPassword {
    email: string
}

export const useForgetPassword = () => {
    
    const navigate = useNavigate();
    
    const [isLoading, setIsLoading] = useState(false);

    const formRef = useRef<FormHandles>(null);
    const formValidSchema: yup.SchemaOf<IUserForgetPassword> = yup.object().shape({
        email: yup.string().required().email()
    });

    // const { showMsg } = useSnackBarContext();

    const handleForget = useCallback((dados: IUserForgetPassword) => {
        setIsLoading(true);

        formValidSchema
            .validate(dados, { abortEarly: false })
            .then((dadosValid: IUserForgetPassword) => {

                setTimeout(() => {
                    setIsLoading(false);
                    navigate('/login');
                }, 2000);
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

    return {
        formRef,
        isLoading,

        handleForget
    }

}