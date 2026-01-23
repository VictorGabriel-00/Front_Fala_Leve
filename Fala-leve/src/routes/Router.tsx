import {Routes, Route} from 'react-router-dom';
import { Login } from '../pages/Login';
import { Cadastro  } from '../pages/Cadastro';
import { TipoUser } from '../pages/Cadastro/escolhaDeTipo';
import { Medico } from '../pages/Cadastro/medico';
import { PacienteNaoVerbal } from '../pages/Cadastro/pacienteNaoVerbal';
import { FinalizarCadastro } from '../pages/Cadastro/finalizarCadastro';
import { TelaInicioMedico } from '../pages/TelaInicioMedico';
import { TelaInicioPaciente } from '../pages/TelaInicioPaciente';

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
            

            <Route path="/tela-inicial-medico" element={<TelaInicioMedico/>} />
            <Route path="/tela-inicial-paciente" element={<TelaInicioPaciente/>} />

        </Routes>
    )

}