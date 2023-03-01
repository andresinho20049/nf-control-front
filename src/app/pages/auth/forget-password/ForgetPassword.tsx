import { Avatar, Box, Button, CircularProgress, CssBaseline, Grid, Link, Paper, Typography } from '@mui/material';
import { Copyright, SnackBarApp, VTextField } from "../../../components";
import ArrowBackTwoToneIcon from '@mui/icons-material/ArrowBackTwoTone';
import PasswordIcon from '@mui/icons-material/Password';
import { useForgetPassword } from "./UseForgetPassword";
import { Link as RouterLink } from 'react-router-dom';
import { Form } from "@unform/web";


export const ForgetPassword = () => {

    const { formRef, isLoading, handleForget } = useForgetPassword();

    return (
        <Grid container component="main" sx={{ height: '100vh' }}>
            <CssBaseline />
            <Grid
                item
                xs={false}
                sm={5}
                md={7}
                sx={{
                    backgroundImage: 'url(https://source.unsplash.com/random)',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: (t) =>
                        t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />
            <Grid item xs={12} sm={7} md={5} component={Paper} elevation={6} square>
                <Box
                    sx={{
                        my: 15,
                        mx: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'action.active', width: 56, height: 56 }}>
                        <PasswordIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Esqueceu a senha?
                    </Typography>
                    <Form ref={formRef} onSubmit={handleForget}>
                        <VTextField
                            autoFocus
                            fullWidth
                            id="email"
                            label="E-mail"
                            name="email"
                            variant="standard"
                            disabled={isLoading}
                        />
                        <Button
                            fullWidth
                            type="submit"
                            variant="contained"
                            disabled={isLoading}
                            sx={{ mt: 3, mb: 2 }}
                            endIcon={isLoading ? <CircularProgress variant="indeterminate" size={22} /> : undefined}
                        >
                            Reset Password
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link component={RouterLink} to={'/login'} variant="body2" sx={{display: 'flex', alignItems: 'center'}}>
                                    <ArrowBackTwoToneIcon />
                                    {" Retorna tela de Login"}
                                </Link>
                            </Grid>
                        </Grid>

                        <Copyright sx={{ mt: 5 }} />
                    </Form>
                </Box>
                <SnackBarApp />
            </Grid>
        </Grid>
    )
}