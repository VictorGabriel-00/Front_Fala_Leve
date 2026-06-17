import { useNavigate } from 'react-router-dom';
import styles from './styles.module.css'
import { useState } from 'react';


export function Cadastro(){

    const navegacao = useNavigate();

    const [formatarDado, setFormatarDado] = useState({
        nome: '',
        email: '',
        senha: '',
        confirmarSenha: '',
        dataNascimento: '' 
    });

    const [erro, setErro] = useState('');


    function liberarcampo(e: any) {
        const { id, value } = e.target;
        setFormatarDado({ ...formatarDado, [id]: value });
       
        if (erro) setErro('');
    }
    
    function salvarDadosCadastro(){
        if(!formatarDado.nome || !formatarDado.email || !formatarDado.senha || !formatarDado.confirmarSenha || !formatarDado.dataNascimento){
            setErro("Prencha todos os campos para pode continuar !!")
            return;
        }

 
        if(formatarDado.senha != formatarDado.confirmarSenha){
            setErro("As senhas não conhecidem")
            return;
        }

        const dadosCadastro = {
            nome: formatarDado.nome,
            email: formatarDado.email,
            senha: formatarDado.senha,
            data: formatarDado.dataNascimento
        }

        localStorage.setItem('cadastro_usuario',JSON.stringify(dadosCadastro))

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
                                id='email'
                                type="Email" 
                                placeholder="Seu email"
                                value={formatarDado.email}
                                onChange={liberarcampo}
                                />
                            <label>Senha</label>
                            <input 
                                id='senha'
                                type="password" 
                                placeholder="Sua senha" 
                                value={formatarDado.senha}
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
                            <button type="button" onClick={salvarDadosCadastro}>Proximo</button>
                        </form>
                    </div>
                </div>
            </div>


        </div>






    )
    
}