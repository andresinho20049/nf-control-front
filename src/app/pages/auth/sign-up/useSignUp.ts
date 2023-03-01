import { useCallback, useRef, useState } from "react";
import * as yup from "yup";
import { FormHandles } from "@unform/core";
import { useNavigate } from "react-router-dom";
import { useSnackBarContext } from "../../../context";
import { beltThemeType } from './../../../interface/IPayloadData';

interface ISignUpData {
    name: string,
    email: string,
    password: string,
    confirmPassword: string,
    belt: beltThemeType
}

export const useSignUp = () => {
    
    const navigate = useNavigate();
    
    const [isLoading, setIsLoading] = useState(false);

    const regexPassword = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    const msgRegexError = 'Sua senha deve conter: 8 ou mais caracteres; Letras maiúsculas e minúsculas; Pelo menos um número; Pelo menos um caractere especial (!@#$%^&*).'

    const formRef = useRef<FormHandles>(null);
    const formValidSchema: yup.SchemaOf<ISignUpData> = yup.object().shape({
        name: yup.string().required(),
        email: yup.string().required().email(),
        password: yup.string().required().min(8).matches(regexPassword, msgRegexError),
        confirmPassword: yup.string().required().oneOf([yup.ref('password'), null], "Senha não confere"),
        belt: yup.mixed().oneOf(['Black', 'Blue', 'Brown', 'Green', 'Orange', 'Purple', 'White', 'Yellow'], "Favor selecionar uma faixa").required()
    });

    const listBeltOptions = [
        { label: "Branca", value: "White" },
        { label: "Amarela", value: "Yellow" },
        { label: "Verde", value: "Green" },
        { label: "Laranja", value: "Orange" },
        { label: "Azul", value: "Blue" },
        { label: "Roxa", value: "Purple" },
        { label: "Marrom", value: "Brown" },
        { label: "Preta", value: "Black" },
    ]

    const { showMsg } = useSnackBarContext();

    const handleSignUp = useCallback((dados: ISignUpData) => {
        setIsLoading(true);

        formValidSchema
            .validate(dados, { abortEarly: false })
            .then((dadosValid: ISignUpData) => {
                
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
        isLoading,
        formRef,
        listBeltOptions,

        handleSignUp
    }

}