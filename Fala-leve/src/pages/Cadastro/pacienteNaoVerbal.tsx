import { useNavigate } from 'react-router-dom';
import styles from './styles.module.css'
import { useState } from 'react';


export function PacienteNaoVerbal(){

    const navegacao = useNavigate();

    const [formatarDado, setFormatarDado] = useState({
        Grau: '',
        Cores: '',
        Sons: '',
    });

    const [erro, setErro] = useState('');

    function liberarcampo(e: any) {
        const { id, value } = e.target;
        setFormatarDado({ ...formatarDado, [id]: value });
       
        if (erro) setErro('');
    }


    function verificacao(){
        if(!formatarDado.Grau || !formatarDado.Cores || !formatarDado.Sons){
            setErro("Prencha todos os campos para pode continuar !!")
            return;
        }

        navegacao("/finalizarCadastro")

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
                                id='Grau' 
                                type="number" 
                                placeholder="Informe o Grau da Neuro Divergência"
                                value={formatarDado.Grau}
                                onChange={liberarcampo}
                                />
                            <label>Cores agradaveis para você</label>
                            <input 
                                id='Cores'
                                type="text" 
                                placeholder="Cores Agradaveis"
                                value={formatarDado.Cores}
                                onChange={liberarcampo}
                                />
                            <label>Informe sons Agradaveis</label>
                            <input 
                                id='Sons'
                                type="text" 
                                placeholder="Fale seus sons que gosta de ouvir" 
                                value={formatarDado.Sons}
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