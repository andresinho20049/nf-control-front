import { Form } from "@unform/web";
import { useSignUp } from "./useSignUp";
import { Link as RouterLink } from 'react-router-dom';
import { VTextField } from "../../../components/forms/VTextField";
import ArrowBackTwoToneIcon from '@mui/icons-material/ArrowBackTwoTone';
import { Copyright, SnackBarApp, VSelectLabel } from "../../../components";
import PersonAddAlt1RoundedIcon from '@mui/icons-material/PersonAddAlt1Rounded';
import { Avatar, Box, Button, CircularProgress, CssBaseline, Grid, Link, Paper, Typography } from "@mui/material";

export const SignUp = () => {

    const { isLoading, formRef, listBeltOptions, handleSignUp } = useSignUp();

    return (
        <Grid container component="main" sx={{ height: '100vh' }}>
            <CssBaseline />
            <Grid item xs={12} component={Paper} elevation={6} square>
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
                        <PersonAddAlt1RoundedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Cadastro
                    </Typography>
                    <Form ref={formRef} onSubmit={handleSignUp}>
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Grid container spacing={2} xs={12} sm={8}>
                                <Grid item xs={12}>
                                    <VTextField
                                        autoFocus
                                        fullWidth
                                        id="name"
                                        label="Nome"
                                        name="name"
                                        variant="standard"
                                        disabled={isLoading}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <VTextField
                                        fullWidth
                                        id="email"
                                        label="E-mail"
                                        name="email"
                                        variant="standard"
                                        disabled={isLoading}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <VTextField
                                        fullWidth
                                        id="password"
                                        name="password"
                                        type="password"
                                        label="Password"
                                        variant="standard"
                                        disabled={isLoading}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <VTextField
                                        fullWidth
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type="password"
                                        label="Confirm Password"
                                        variant="standard"
                                        disabled={isLoading}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <VSelectLabel 
                                        label="Faixa"
                                        name="belt"
                                        options={listBeltOptions}
                                    />
                                </Grid>

                                <Grid item xs={false} sm={6}>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Button
                                        fullWidth
                                        type="submit"
                                        variant="contained"
                                        disabled={isLoading}
                                        sx={{ mt: 5, mb: 2 }}
                                        endIcon={isLoading ? <CircularProgress variant="indeterminate" size={22} /> : undefined}
                                    >
                                        Entrar
                                    </Button>
                                </Grid>
                                <Grid item xs={12}>
                                    <Link component={RouterLink} to={'/login'} variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
                                        <ArrowBackTwoToneIcon />
                                        {" Retorna tela de Login"}
                                    </Link>
                                </Grid>
                                <Grid item xs={12}>
                                    <Copyright sx={{ mt: 5 }} />
                                </Grid>
                            </Grid>

                        </Box>
                    </Form>
                </Box>
                <SnackBarApp />
            </Grid>
        </Grid>
    )
}