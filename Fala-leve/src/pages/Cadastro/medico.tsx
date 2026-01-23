import { useNavigate } from 'react-router-dom';
import styles from './styles.module.css'
import { useState } from 'react';


export function Medico(){

    const navegacao = useNavigate();

    const [Crm, setCrm] = useState('');

    const [erro, setErro] = useState('');


 
    async function enviarDadoApi(){
        if(!Crm){
            setErro("Prencha o CRM");
            return;
        }

        const dadosCadastro = localStorage.getItem('cadastro_usuario');

        if(!dadosCadastro){
            setErro("Nao foi encontrado nenhum dado");
            return;
        }

        const dadosPessoais = JSON.parse(dadosCadastro);

        const dadosJuntos = {
            nome: dadosPessoais.nome,
            email: dadosPessoais.email,
            senha: dadosPessoais.senha,
            Crm: Crm
        }

        try{
            const resposta = await fetch('http://localhost:8080/medico', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dadosJuntos) 
            });

            if(resposta.ok){
                localStorage.removeItem('cadastro_usuario');
                navegacao('/finalizarCadastro')
            }else{
                setErro("Erro no cadastro")
            }

        }catch(error){
            setErro("Falha de conexão")
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
                        <h2>Dados do Medico </h2>
                        <form className={styles.form}>
                            <label>CRM</label>
                            <input
                                id= "Crm" 
                                type="CRM" 
                                placeholder="Informe o seu CRM"
                                value={Crm}
                                onChange={(e)=> {setCrm(e.target.value);
                                                setErro('');
                                }} />
                                {erro && <span className={styles.mgErro}>{erro}</span>}
                            <button type="button" onClick={enviarDadoApi}>Proximo</button>
                        </form>
                    </div>
                </div>
            </div>


        </div>






    )
    
}