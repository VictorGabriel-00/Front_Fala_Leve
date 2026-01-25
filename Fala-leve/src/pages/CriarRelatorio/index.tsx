import { useNavigate } from 'react-router-dom'
import { Header } from '../../components/Header'
import styles from './styles.module.css'
import { useState } from 'react';

export function EnviarRelatorio(){
    const navegacao = useNavigate();

    const [codigo, setCodigo] = useState('');
    
    
    return(
        <>
            <Header/>
            <div className={styles.container}>
                <h1 className={styles.titulo}>Relatorio</h1>
                <main className={styles.areaElementos}>

                    <textarea 
                    className={styles.inputCodigo} 
                    value={codigo}
                    onChange={(e) => setCodigo(e.target.value)}
                    placeholder="Comece a digitar aqui..."
                    rows={10} 
                />

                <div className={styles.grupoBotoes}>
                    <button className={styles.botao}>
                        Enviar
                    </button>
                </div>

                </main>
            </div>

        </>
    )

    
}