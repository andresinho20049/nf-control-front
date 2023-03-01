import { ApiForm } from './ApiConfig';
import { ReactNode, useEffect } from 'react';
import { useAuthenticationContext } from '../../context';

interface IWithAxiosProps {
    children: ReactNode
}

export const WithAxios = ({ children }: IWithAxiosProps) => {

    const { isAuthenticated, token, logout } = useAuthenticationContext();


    useEffect(() => {

        ApiForm.interceptors.request.clear();
        ApiForm.interceptors.response.clear();

        ApiForm.interceptors.response.use(
            (res) => res,
            (error) => {
                if (isAuthenticated && error.response?.status === 401) {
                    console.error('API returned status 401, user will be logged out!');
                    logout();
                }

                return Promise.reject(error);
            }
        )

        ApiForm.interceptors.request.use(
            (req) => {

                // const token = JSON.parse(localStorage.getItem('auth') || '');
                req.headers.Authorization = `Bearer ${token}`;

                return req;
            }
        )
    }, [isAuthenticated, token]);

    return (
        <>
            {children}
        </>
    );
}