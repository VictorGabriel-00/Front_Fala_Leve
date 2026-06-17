import { Navigate } from 'react-router-dom';
import React from 'react'

interface PrivateRouteProps {
    children: React.ReactNode; 
    tipoPermitido?: 'MEDICO' | 'PACIENTE';
}

export function PrivateRota({children, tipoPermitido} : PrivateRouteProps){

    const usuarioSalvo = localStorage.getItem('usuario_logado');    

    if(!usuarioSalvo){
        return <Navigate to="/" replace/>

    }

    const usuario = JSON.parse(usuarioSalvo);

    if(tipoPermitido && usuario.tipoUsuario !== tipoPermitido){
        return <Navigate to='/login' replace/>
    }


    return children;
}