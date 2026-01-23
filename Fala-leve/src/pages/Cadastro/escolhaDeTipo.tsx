import { useNavigate } from 'react-router-dom';
import styles from './styles.module.css'
import { useState } from 'react';


export function TipoUser(){

    const navegacao = useNavigate();

    const [tipoSelecionado, setTipoSelecionado] = useState('');
    const [erro, setErro] = useState('');

    const dadosAntigos = JSON.parse(localStorage.getItem('cadastro_usuario') || '{}');

    const dadosAtualizados = {
        ...dadosAntigos,
        tipoUsuario: tipoSelecionado
    }

    if (tipoSelecionado === 'medico') {
        navegacao('/medico');
    }

    if (tipoSelecionado === 'paciente') {
        navegacao('/prontuario');
    }

    localStorage.setItem('cadastro_usuario', JSON.stringify(dadosAtualizados));

    function escolha(){

        if(tipoSelecionado === ''){
            setErro("Selecione um tipo para poder continuar!!");
            return;
        }

        if(tipoSelecionado === 'medico'){
            navegacao("/medico")
        }else if(tipoSelecionado === 'responsavel'){
            navegacao("/responsavel")
        }else if(tipoSelecionado === 'paciente'){
            navegacao("/prontuario")
        }else{
            alert("Selecione um tipo para continuar !!")
        }

    }

    return(


        <div className={styles.container}>
            <div className={styles.textoEsquerdo}>
                <div className={styles.textoContent}>
                    <h1>Bem vindos !!</h1>
                    <p>A nossa plataforma</p>
                    <p>FalaLeve</p>
                </div>
            </div>


            <div className={styles.sectionLogin}>
                <div className={styles.molduraCinza}>
                    <div className={styles.card}>
                        <h2>Informe o seu tipo de Usuario</h2>
                        <form className={styles.form}>
                            <select  value={tipoSelecionado} 
                                    onChange={(event) => {setTipoSelecionado(event.target.value);
                                                          setErro(''); }} >
                                <option value="" disabled hidden>Escolha qual seu tipo de Usuario</option>
                                <option value="medico">Medico</option>
                                <option value="responsavel">Responsavel</option>
                                <option value="paciente">Paciente não Verbal</option>
                            </select>
                            {erro && <span className={styles.mgErro}>{erro}</span>}
                             <button type="button" onClick={escolha}>Proximo</button>
                        </form>
                    </div>
                </div>
            </div>


        </div>






    )
    
}