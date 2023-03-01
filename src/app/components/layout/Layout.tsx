import { Stack } from "@mui/material";
import { ReactNode } from "react";
import { MenuAppBar } from "../menu-app-bar/MenuAppBar";
import { SnackBarApp } from "../snackbar/Snackbar";

export interface ILayoutProps {
    children: ReactNode
}

export const Layout = ({ children }: ILayoutProps) => {

    return (
        <Stack
            direction={'column'}
            justifyContent={'space-between'}
            alignItems={'center'}
            spacing={0}
            flex={1}
            bgcolor={(theme) => theme.palette.background.default}
            minHeight={'100vh'}
        >
            <MenuAppBar />
            {children}
            <SnackBarApp />
        </Stack>
    )
}