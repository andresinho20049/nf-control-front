import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useAuthenticationContext } from "../context/AuthenticationContext";
import { ForgetPassword, Home, Login, SignUp } from "../pages";
import { Usuarios } from "../pages/usuarios/Usuarios";
import { Layout } from "../components";

interface IPagesData {
    to: string
    label: string
    element: JSX.Element
    onClick?: () => void
}

export const pages: IPagesData[] = [
    {
        label: 'Home',
        to: '/',
        element: <Home />
    },
    {
        label: 'Usuários',
        to: '/users',
        element: <Usuarios />
    }
    // {
    //     label: 'Page3',
    //     to: '/page3',
    //     element: <Home />
    // }
]
export const Rotas = () => {

    const { isAuthenticated } = useAuthenticationContext();

    if(!isAuthenticated)
        return (
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/sign-up" element={<SignUp />} />
                    <Route path="/forget-password" element={<ForgetPassword />} />
                    
                    <Route path="*" element={<Navigate to="/login" />} />
                </Routes>
            </BrowserRouter>
        )

    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    {pages.map((page) => (
                        <Route key={page.to} path={page.to} element={page.element} />
                    ))}

                    <Route path="*" element={<Navigate to='/' />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    )
}