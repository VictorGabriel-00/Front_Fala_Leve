import { useNavigate } from 'react-router-dom';
import styles from './styles.module.css'
import { useState } from 'react';


export function TelaInicioMedico(){

    const navegacao = useNavigate();

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [erro, setErro] = useState('');

    async function verificacao(e : any){
        if(!email || !senha){
            setErro("Prencha todos os campos para poder continuar com o login");
            return;
        }

        e.preventDefault();

        try{
            const resposta = await fetch('http://localhost:8080/auth/login', {
                method: 'POST',
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify({email,senha})
            });
            
            if(resposta.ok){
                const dados = await resposta.json();

                localStorage.setItem('usuario_logado', JSON.stringify(dados));

                if(dados.tipoUsuario === 'MEDICO'){
                    navegacao("/tela-inicial-medico")
                }else if (dados.tipoUsuario === 'PACIENTE'){
                    navegacao("/tela-inicial-paciente")
                }
                
            }else{
                setErro("Email ou senha nao encontrado")
                console.log(resposta.status)
            }
        }catch(error){
            setErro("erro de conexão com servidor")
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
                        <h2>Acesse sua conta</h2>
                        <form className={styles.form}>
                            <label>Email</label>
                            <input 
                                id='email'
                                type="email" 
                                placeholder="Seu e-mail" 
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                />
                            <label>Senha</label>
                            <input 
                                id='senha'
                                type="password" 
                                placeholder="Sua senha" 
                                value={senha}
                                onChange={e => setSenha(e.target.value)}
                                />
                                {erro && <span className={styles.mgErro}>{erro}</span>}
                            <button type="button" onClick={verificacao}>Entrar</button>
                            <button type="button" onClick={() => navegacao('/cadastro')}>Registrar-se</button>
                        </form>
                    </div>
                </div>
            </div>


        </div>






    )
    
}