import { Form } from "@unform/web";
import { useLogin } from "./useLogin";
import { Link as RouterLink } from 'react-router-dom';
import { Copyright, SnackBarApp } from "../../../components";
import { VTextField } from "../../../components/forms/VTextField";
import LockPersonTwoToneIcon from '@mui/icons-material/LockPersonTwoTone';
import { Avatar, Box, Button, CircularProgress, Paper, Grid, CssBaseline, Link, Checkbox, FormControlLabel, Typography, Icon, Divider } from "@mui/material";

export const Login = () => {

    const { isLoading, formRef, handleLogin, handleLoginWithGoogle } = useLogin();

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
                        my: 8,
                        mx: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'action.active', width: 56, height: 56 }}>
                        <LockPersonTwoToneIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Login
                    </Typography>
                    <Form ref={formRef} onSubmit={handleLogin}>
                        <VTextField
                            autoFocus
                            fullWidth
                            id="username"
                            label="E-mail"
                            name="username"
                            variant="standard"
                            disabled={isLoading}
                        />
                        <VTextField
                            fullWidth
                            sx={{ mt: 1 }}
                            id="password"
                            name="password"
                            type="password"
                            label="Password"
                            variant="standard"
                            disabled={isLoading}
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Lembrar de mim"
                        />
                        <Button
                            fullWidth
                            type="submit"
                            variant="contained"
                            disabled={isLoading}
                            sx={{ mt: 3, mb: 2 }}
                            endIcon={isLoading ? <CircularProgress variant="indeterminate" size={22} /> : undefined}
                        >
                            Entrar
                        </Button>
                        <Grid container>
                            <Grid item xs>

                                {/* <RouterLink to={'/forget-password'}>esq</RouterLink> */}

                                <Link component={RouterLink} to={'/forget-password'} variant="body2">
                                    Esqueceu a senha?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link component={RouterLink} to={'/sign-up'} variant="body2">
                                    {"Não tem conta? Cadastrar-se"}
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