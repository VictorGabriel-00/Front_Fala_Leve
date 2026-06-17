import {Routes, Route} from 'react-router-dom';
import { Login } from '../pages/Login';
import { Cadastro  } from '../pages/Cadastro';
import { TipoUser } from '../pages/Cadastro/escolhaDeTipo';
import { Medico } from '../pages/Cadastro/medico';
import { PacienteNaoVerbal } from '../pages/Cadastro/pacienteNaoVerbal';
import { FinalizarCadastro } from '../pages/Cadastro/finalizarCadastro';
import { TelaInicioMedico } from '../pages/TelaInicioMedico';
import { TelaInicioPaciente } from '../pages/TelaInicioPaciente';
import { CriarProntuario } from '../pages/CriarProntuario';
import { EnviarRelatorio } from '../pages/CriarRelatorio';
import { ImportaArquivo } from '../pages/importaAudioPaciente';
import { TelaSons } from '../pages/TelaSons';
import { ProntuarioPaciente } from '../pages/PacienteProntuario';
import { GerenciarUsuario } from '../pages/GerenciarPaciente';

import { PrivateRota } from '../components/PrivateRoutes';

export function Router (){

    return(
        <Routes>
            <Route path="/" element={<Login />}/>
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro/>} />
            <Route path="/tipoUser" element={<TipoUser/>} />
            <Route path="/medico" element={<Medico/>} />
            <Route path="/prontuario" element={<PacienteNaoVerbal/>} />
            <Route path="/finalizarCadastro" element={<FinalizarCadastro/>} />
            

            <Route path="/tela-inicial-medico" element={
                <PrivateRota tipoPermitido='MEDICO'>
                    <TelaInicioMedico/> 
                </PrivateRota>
            }/>

            <Route path="/tela-inicial-paciente" element={
                <PrivateRota tipoPermitido='PACIENTE'>
                    <TelaInicioPaciente/> 
                </PrivateRota>
                }/>

                <Route path='/tela-prontuario' element = {
                    <PrivateRota tipoPermitido='PACIENTE'>
                        <ProntuarioPaciente/>
                    </PrivateRota>
                }/>

            <Route path='/tela-import-paciente' element={
                <PrivateRota tipoPermitido='PACIENTE'>
                    <ImportaArquivo/>
                </PrivateRota>
            }/>    

            <Route path='/tela-sons' element={
                <PrivateRota tipoPermitido='PACIENTE'>
                    <TelaSons/>
                </PrivateRota>
            }/>

            <Route path="/prontuario-medico" element={
                <PrivateRota tipoPermitido='MEDICO'>
                    <CriarProntuario/>
                </PrivateRota>
            
            }/>
            <Route path="/enviar-relatorio" element={
                    <PrivateRota tipoPermitido='MEDICO'>
                            <EnviarRelatorio/>
                    </PrivateRota>
                }/>

            <Route path="/gerenciar-usuario" element={
                <PrivateRota tipoPermitido='MEDICO'>
                    <GerenciarUsuario/>
                </PrivateRota>
            } />   

        </Routes>
    )

}