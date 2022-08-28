import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { LoginPage } from '../pages/LoginPage'
import { RegisterPage } from '../pages/RegisterPage'

export const AuthRoutes = () => {
  return (
    <Routes>
        <Route path="login" element={ <LoginPage /> } />
        <Route path="register" element={ <RegisterPage /> } />

        { /**Cualquier otra ruta que no sea las anteriores, redirige a: */ }
        <Route path="/*" element={ <Navigate to="/auth/login" /> } />
    </Routes>
  )
}
