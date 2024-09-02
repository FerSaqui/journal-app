import Google from '@mui/icons-material/Google';
import Alert from '@mui/material/Alert/Alert';
import Button from '@mui/material/Button/Button';
import Grid from '@mui/material/Grid/Grid';
import Link from '@mui/material/Link/Link';
import TextField from '@mui/material/TextField/TextField';
import Typography from '@mui/material/Typography/Typography';
import React, { useMemo } from 'react'
import { Link as RouterLink } from 'react-router-dom';
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks/useForm';
import { useDispatch, useSelector } from 'react-redux';
import { startGoogleSignIn, startLoginWithEmailPassword } from '../../store/auth/thunks';

const formData = {
  email: "",
  password: ""
};

export const LoginPage = () => {
  const { status, errorMessage } = useSelector( state => state.auth );
  const isAuthenticated = useMemo(() => status === "checking", [status]);

  const { email, password, onInputChange } = useForm(formData);

  const dispatch = useDispatch();

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(startLoginWithEmailPassword({ email, password }));
  }

  const onGoogleSignIn = () => {
    console.log("ongooglesignin");
    dispatch(startGoogleSignIn());
  }

  return (
    <AuthLayout title='Login'>
      <form data-testid="formLogin" onSubmit={onSubmit} className='animate__animated animate__fadeIn animate__faster'>
        <Grid
          container
        >
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Correo"
              type='email'
              placeholder='correo@correo.com'
              fullWidth
              name='email'
              value={ email }
              onChange={onInputChange}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Contraseña"
              type='password'
              placeholder='Contraseña'
              fullWidth
              name='password'
              value={ password }
              onChange={onInputChange}
              inputProps={{
                "data-testid": "txtPasswordLogin"
              }}
            />
          </Grid>

          <Grid container display={ !!errorMessage ? "" : "none"} sx={{ mt: 1 }}>
            <Grid item xs={12}>
                <Alert severity='error'>
                  { errorMessage }
                </Alert>
              </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <Button disabled={isAuthenticated} type='submit' variant='contained' fullWidth>
                Login
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button data-testid="btnGoogle" disabled={isAuthenticated} onClick={onGoogleSignIn} variant='contained' fullWidth>
                <Google />
                <Typography sx={{ ml: 1 }}>Google</Typography>
              </Button>
            </Grid>
          </Grid>

          <Grid container direction={"row"} justifyContent={"end"}>
            <Link component={ RouterLink } color={"inherit"} to="/auth/register">
              Crear una cuenta
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  )
};