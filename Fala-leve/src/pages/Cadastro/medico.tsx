import { useNavigate } from 'react-router-dom';
import styles from './styles.module.css'
import { useState } from 'react';


export function Medico(){

    const navegacao = useNavigate();

    const [formatarDado, setFormatarDado] = useState({
        CRM: ''
    });

    const [erro, setErro] = useState('');


    function liberarcampo(e: any) {
        const { id, value } = e.target;
        setFormatarDado({ ...formatarDado, [id]: value });
       
        if (erro) setErro('');
    }


    function verificacao(){
        if(!formatarDado.CRM){
            setErro("Prencha todos os dados para poder continuar")
            return;
        }

        if(formatarDado.CRM){
            navegacao("/finalizarCadastro")
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
                                id= "CRM" 
                                type="CRM" 
                                placeholder="Informe o seu CRM"
                                value={formatarDado.CRM}
                                onChange={liberarcampo} />
                                {erro && <span className={styles.mgErro}>{erro}</span>}
                            <button type="button" onClick={verificacao}>Proximo</button>
                        </form>
                    </div>
                </div>
            </div>


        </div>






    )
    
}