import { useNavigate } from 'react-router-dom';
import styles from './styles.module.css'
import { useState } from 'react';


export function Cadastro(){

    const navegacao = useNavigate();

    const [formatarDado, setFormatarDado] = useState({
        nome: '',
        Email: '',
        Senha: '',
        confirmarSenha: '',
        dataNascimento: '' 
    });

    const [erro, setErro] = useState('');

    function liberarcampo(e: any) {
        const { id, value } = e.target;
        setFormatarDado({ ...formatarDado, [id]: value });
       
        if (erro) setErro('');
    }


    function verificacao(){
        if(!formatarDado.nome || !formatarDado.Email || !formatarDado.Senha || !formatarDado.confirmarSenha || !formatarDado.dataNascimento){
            setErro("Prencha todos os campos para pode continuar !!")
            return;
        }

 
        if(formatarDado.Senha != formatarDado.confirmarSenha){
            setErro("As senhas não conhecidem")
            return;
        }

        navegacao("/tipoUser")

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
                        <h2>Crie a sua conta </h2>
                        <form className={styles.form}>
                            <label>Nome Completo</label>
                            <input
                                id='nome' 
                                type="nome" 
                                placeholder="Seu nome completo"
                                value={formatarDado.nome}
                                onChange={liberarcampo}
                                />
                            <label>Email</label>
                            <input 
                                id='Email'
                                type="Email" 
                                placeholder="Seu email"
                                value={formatarDado.Email}
                                onChange={liberarcampo}
                                />
                            <label>Senha</label>
                            <input 
                                id='Senha'
                                type="password" 
                                placeholder="Sua senha" 
                                value={formatarDado.Senha}
                                onChange={liberarcampo}
                                />
                            <label>Confirma senha</label>
                            <input 
                                id='confirmarSenha'
                                type="password" 
                                placeholder="Sua senha" 
                                value={formatarDado.confirmarSenha}
                                onChange={liberarcampo}
                                />
                            <label>Data de Nascimento</label>
                            <input 
                                id='dataNascimento'
                                type="date"
                                value={formatarDado.dataNascimento}
                                onChange={liberarcampo}
                                />
                                {erro && <span className={styles.mgErro}>{erro}</span>}
                            <button type="button" onClick={verificacao}>Proximo</button>
                        </form>
                    </div>
                </div>
            </div>


        </div>






    )
    
}