import { useNavigate } from 'react-router-dom';
import styles from './styles.module.css'
import { useState } from 'react';


export function PacienteNaoVerbal(){

    const navegacao = useNavigate();

    const [grau,setGrau] = useState('');
    const [cores,setCores] = useState('');
    const [sons, setSons] = useState('');
    const [erro, setErro] = useState('');

    async function enviarDadoApi(){
        if(!grau || !cores || !sons){
            setErro("Prencha todos os campos para pode continuar !!")
            return;
        }


        const dadosCadastro = localStorage.getItem('cadastro_usuario' );

        if(!dadosCadastro){
            setErro("Nao foi possevel encontrar nenhum dado");
            return;
        }

        const dadosPessoais = JSON.parse(dadosCadastro);

        const dadosJuntos = {
            nome: dadosPessoais.nome,
            email: dadosPessoais.email,
            senha: dadosPessoais.senha,
            grau: grau,
            cores: cores,
            sons: sons
        }


        try{
            const resposta = await fetch('http://localhost:8080/paciente', {
                method: 'POST',
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify(dadosJuntos)
            });
              
            if(resposta.ok){
                localStorage.removeItem('cadastro_usuario')
                navegacao('/finalizarCadastro')
            }else{
                setErro("Erro no cadastro")
            }

        }catch(error){
            setErro("Falha de Conexão")
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
                        <h2>Prontuario </h2>
                        <form className={styles.form}>
                            <label>Informe o Grau de Neuro divergência</label>
                            <input
                                id='grau' 
                                type="number" 
                                placeholder="Informe o Grau da Neuro Divergência"
                                value={grau}
                                onChange={(e) => {setGrau(e.target.value);
                                                  setErro('');
                                    }}
                                />
                            <label>Cores agradaveis para você</label>
                            <input 
                                id='cores'
                                type="text" 
                                placeholder="Cores Agradaveis"
                                value={cores}
                                onChange={(e) => {setCores(e.target.value);
                                                  setErro('');
                                    }}
                                />
                            <label>Informe sons Agradaveis</label>
                            <input 
                                id='sons'
                                type="text" 
                                placeholder="Fale seus sons que gosta de ouvir" 
                                value={sons}
                                onChange={(e) => {setSons(e.target.value);
                                                  setErro('');
                                    }}
                                />
                                {erro && <span className={styles.mgErro}>{erro}</span>}
                            <button type="button" onClick={enviarDadoApi}>Proximo</button>
                        </form>
                    </div>
                </div>
            </div>


        </div>






    )
    
}