import { Stack, Box } from "@mui/material";
import { ReactNode } from "react";
import { DialogConfirmAppProvider } from "../../context/DialogConfirmAppContext";
import { FormDialogProvider } from "../../context/FormDialogContext";
import { SelectYearProvider } from "../../context/SelectYearContext";
import { MenuAppBar } from "../menu-app-bar/MenuAppBar";
import { SnackBarApp } from "../snackbar/Snackbar";
import { SpeedDialButton } from "../speed-dial/SpeedDialButton";

export interface ILayoutProps {
    children: ReactNode
}

export const Layout = ({ children }: ILayoutProps) => {

    return (
        <Stack
            direction={'column'}
            // justifyContent={'space-between'}
            alignItems={'center'}
            spacing={2}
            flex={1}
            bgcolor={(theme) => theme.palette.background.default}
            minHeight={'100vh'}
        >
            <SelectYearProvider>
                <MenuAppBar />
                <FormDialogProvider>
                    <DialogConfirmAppProvider>
                        {children}
                        <SpeedDialButton />
                    </DialogConfirmAppProvider>
                </FormDialogProvider>
                <SnackBarApp />
            </SelectYearProvider>
        </Stack>
    )
}