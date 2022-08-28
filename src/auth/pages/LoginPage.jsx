import React from "react";
import { Link as LinkRouter } from "react-router-dom";
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material";
import { Google } from "@mui/icons-material";
import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks/useForm";
import { useDispatch, useSelector } from 'react-redux'
import { startGoogleSignIn, startLoginWithEmailPassword } from "../../store/auth/thunks";
import { useMemo } from "react";

const formData = {
  email: "",
  password: ""
};

export const LoginPage = () => {
  const { status, errorMessage } = useSelector( state => state.auth );
  const dispatch = useDispatch();

  const { email, password, onInputChange } = useForm( formData );

  const isAuthenticating = useMemo( () => status === "checking", [status]);

  const onSubmit = ( event ) => {
    event.preventDefault();
    dispatch( startLoginWithEmailPassword({email, password}) );
  }

  const onGoogleSignIn = () => {
    console.log("onGoogleSignIn");
    dispatch( startGoogleSignIn() );
  }

  return (
    <AuthLayout title="Login">
      <form aria-label="formLogin" onSubmit={ onSubmit } className="animate__animated animate__fadeIn animate__faster">
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Correo"
              type="email"
              placeholder="correo.google.com"
              fullWidth
              autoComplete="off"
              name="email"
              value={ email }
              onChange={ onInputChange }
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Contraseña"
              type="password"
              placeholder="Contraseña"
              fullWidth
              autoComplete="off"
              name="password"
              inputProps={{
                "data-testid": "password"
              }}
              value={ password }
              onChange={ onInputChange }
            />
          </Grid>

          <Grid container display={ !!errorMessage ? "" : "none" } sx={{ mt: 1 }}>
            <Grid
              item
              xs={ 12 }
            >
              <Alert severity="error">{ errorMessage }</Alert>
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12} md={6}>
              <Button type="submit" variant="contained" fullWidth disabled={ isAuthenticating }>
                Login
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Button aria-label="google-btn" variant="contained" fullWidth onClick={ onGoogleSignIn } disabled={ isAuthenticating }>
                <Google />
                <Typography sx={{ ml: 1 }}>Google</Typography>
              </Button>
            </Grid>
          </Grid>

          <Grid container direction={"row"} justifyContent="end">
            <Link component={LinkRouter} to="/auth/register" color="inherit">
              Crear una cuenta
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
