import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "../components";
import { LayoutHistory } from "../components/layout/LayoutHistory";
import { useAuthenticationContext } from "../context/AuthenticationContext";
import { Dashboard, ForgetPassword, Login, SignUp, Invoice, Expense } from "../pages";

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
        to: '/invoice',
        element: <Invoice />
    },
    {
        label: 'Despesas',
        to: '/despesa',
        element: <Expense />
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