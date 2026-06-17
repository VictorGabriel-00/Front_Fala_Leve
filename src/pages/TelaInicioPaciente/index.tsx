import { useNavigate } from 'react-router-dom'
import { FileText,BookOpen,ChatCircleDots,CloudArrowUp} from '@phosphor-icons/react';
import { Header } from '../../components/Header'
import styles from './styles.module.css'



export function TelaInicioPaciente(){
    const navegacao = useNavigate();
    
    
    return(
        <>
            <Header/>
            <div className={styles.container}>
                <main className={styles.areaMenu}>
                    <div className={styles.menuLista}>
                        <button className={styles.menuItem}>
                            <div className={styles.circuloItem}>
                                <BookOpen size={70} weight="fill" color='#0F2C64' />
                            </div>
                            <span className={styles.texto}>Lição</span>
                        </button>


                          <button className={styles.menuItem} onClick={() => navegacao('/tela-prontuario')}>
                            <div className={styles.circuloItem}>
                                <FileText size={70} weight="fill" color='#0F2C64' />
                            </div>
                            <span className={styles.texto}>Prontuario</span>
                        </button>

                        <button className={styles.menuItem} onClick={() => navegacao('/tela-sons')}>
                            <div className={styles.circuloItem}>
                                <ChatCircleDots size={70} weight="bold"  color='#0F2C64'/>
                            </div>
                            <span className={styles.texto}>Sons</span>
                        </button>



                        <button className={styles.menuItem} onClick={() => navegacao('/tela-import-paciente')}>
                            <div className={styles.circuloItem}>
                                <CloudArrowUp size={70} weight="fill" color='#0F2C64' />
                            </div>
                            <span className={styles.texto}>Importa</span>
                        </button>


                    </div>
                </main>
            </div>

        </>
    )

    
}