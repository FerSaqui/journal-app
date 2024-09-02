import React, { useMemo, useState } from 'react';
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks/useForm';
import { useDispatch, useSelector } from 'react-redux';
import { startCreatingUserWithEmailPassword } from '../../store/auth/thunks';

const formData = {
  email: "",
  password: "",
  displayName: ""
}

const formValidations = {
  email: [(value) => value.includes('@'), "Correo invalido"],
  password: [(value) => value.length >= 6, "Contraseña debe de ser más de 6 carácteres"],
  displayName: [(value) => value.length >= 1, "Nombre es requerido"]
}

export const RegisterPage = () => {
  const dispatch = useDispatch();
  const { status, errorMessage } = useSelector(state => state.auth);
  const ischeckingAuthentication = useMemo(() => status === "checking", [status]);

  const [formSubmitted, setFormSubmitted] = useState(false);

  const { formState, displayName, email, password, onInputChange,
      isFormValid, displayNameValid, emailValid, passwordValid
   } = useForm(formData, formValidations);

  const onSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true);

    if(!isFormValid) return;

    dispatch(startCreatingUserWithEmailPassword(formState));
  }

  return (
    <AuthLayout title='Crear Cuenta'>
      <form onSubmit={onSubmit} className='animate__animated animate__fadeIn animate__faster'>
        <Grid
          container
        >
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Nombre completo"
              type='text'
              placeholder='Nombre Completo'
              fullWidth
              name="displayName"
              value={displayName}
              onChange={onInputChange}
              error={!!displayNameValid && formSubmitted}
              helperText={displayNameValid}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Correo"
              type='email'
              placeholder='correo@correo.com'
              fullWidth
              name="email"
              value={email}
              onChange={onInputChange}
              error={!!emailValid && formSubmitted}
              helperText={emailValid}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Contraseña"
              type='password'
              placeholder='Contraseña'
              fullWidth
              name="password"
              value={password}
              onChange={onInputChange}
              error={ !!passwordValid  && formSubmitted}
              helperText={ passwordValid }
            />
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12} display={ !!errorMessage ? "" : "none"}>
              <Alert severity='error'>
                { errorMessage }
              </Alert>
            </Grid>

            <Grid item xs={12}>
              <Button disabled={ischeckingAuthentication} type='submit' variant='contained' fullWidth>
                Crear cuenta
              </Button>
            </Grid>
          </Grid>

          <Grid container direction={"row"} justifyContent={"end"}>
            <Typography sx={{ mr: 1 }}>¿Ya tienes una cuenta?</Typography>
            <Link component={ RouterLink } color={"inherit"} to="/auth/login">
              Ingresar
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  )
}