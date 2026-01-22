import { useNavigate } from 'react-router-dom';
import styles from './styles.module.css'
import { useState } from 'react';


export function Login(){

    const navegacao = useNavigate();

    const [formatarDado, setFormatarDado] = useState({
        Email: '',
        Senha: ''
    });

    const [erro, setErro] = useState('');

    function liberarcampo(e: any) {
        const { id, value } = e.target;
        setFormatarDado({ ...formatarDado, [id]: value });
       
        if (erro) setErro('');
    }


    function verificacao(){
        if(!formatarDado.Email || !formatarDado.Senha){
            setErro("Prencha todos os campos para poder continuar com o login");
            return;
        }

        navegacao("/telaInicial")
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
                                id='Email'
                                type="email" 
                                placeholder="Seu e-mail" 
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