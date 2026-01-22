import { useNavigate } from 'react-router-dom';
import styles from './styles.module.css'


export function FinalizarCadastro(){

    const navegacao = useNavigate();

    return(


        <div className={styles.container}>
            <div className={styles.textoEsquerdo}>
                <div className={styles.textoContent}>
                    <p>Agradecemos pelo seu cadastro</p>
                    <p>Aproveite o Site</p>
                </div>
            </div>


            <div className={styles.sectionLogin}>
                <div className={styles.molduraCinza}>
                    <div className={styles.card}>
                        <h2>Conta Criada</h2>
                        <h2>Com Sucesso !!</h2>
                        <form className={styles.form} >
                            <button type="submit" onClick={() => navegacao('/login')}>Entrar</button>
                        </form>
                    </div>
                </div>
            </div>


        </div>






    )
    
}