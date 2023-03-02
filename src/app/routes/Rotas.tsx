import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "../components";
import { useAuthenticationContext } from "../context/AuthenticationContext";
import { Category, Dashboard, Expense, ForgetPassword, Invoice, Login, Partner, SignUp } from "../pages";

interface IPagesData {
    to: string
    label: string
    element: JSX.Element
    onClick?: () => void
}

export const pages: IPagesData[] = [
    {
        label: 'Dashboard',
        to: '/',
        element: <Dashboard />
    },
    {
        label: 'Notas Fiscais',
        to: '/nota-fiscal',
        element: <Invoice />
    },
    {
        label: 'Despesas',
        to: '/despesa',
        element: <Expense />
    },
    {
        label: 'Parceiro',
        to: '/parceiro',
        element: <Partner />
    },
    {
        label: 'Categoria',
        to: '/categoria',
        element: <Category />
    }
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