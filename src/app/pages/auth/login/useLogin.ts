import { useCallback, useRef, useState } from "react";
import * as yup from "yup";
import { FormHandles } from "@unform/core";
import { useNavigate } from "react-router-dom";
import { IUserLogin } from "../../../interface";
import { useAuthenticationContext, useSnackBarContext } from "../../../context";

export const useLogin = () => {
    
    const navigate = useNavigate();
    
    const [isLoading, setIsLoading] = useState(false);

    const formRef = useRef<FormHandles>(null);
    const formValidSchema: yup.SchemaOf<IUserLogin> = yup.object().shape({
        username: yup.string().required().email(),
        password: yup.string().required()
    });

    const { showMsg } = useSnackBarContext();
    const { login } = useAuthenticationContext();

    const handleLogin = useCallback((dados: IUserLogin) => {
        setIsLoading(true);

        formValidSchema
            .validate(dados, { abortEarly: false })
            .then((dadosValid: IUserLogin) => {

                login(dadosValid)
                    .then(res => {

                        if (res instanceof Error) {
                            console.error(res.message);
                            showMsg("Login Invalido");
                        } else {
                            navigate('/dashboard');
                        }
                        setIsLoading(false);
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

    const handleLoginWithGoogle = useCallback(() => {
        showMsg("Login usando social networks em desenvolvimento!", 'warning');
    }, []);

    return {
        isLoading,
        formRef,

        handleLogin,
        handleLoginWithGoogle
    }

}