import { useNavigate } from 'react-router-dom'
import { FolderUser, FileText, Plus, AddressBook } from '@phosphor-icons/react';
import { Header } from '../../components/Header'
import styles from './styles.module.css'



export function TelaInicioMedico(){
    const navegacao = useNavigate();
    
    
    return(
        <>
            <Header/>
            <div className={styles.container}>
                <main className={styles.areaMenu}>
                    <div className={styles.menuLista}>
                        <button className={styles.menuItem} onClick={() => navegacao('/prontuario-medico')}>
                            <div className={styles.circuloItem}>
                                <FolderUser size={70} weight="fill" />
                            </div>
                            <span className={styles.texto}>Prontuário</span>
                        </button>


                          <button className={styles.menuItem} onClick={() => navegacao('/enviar-relatorio')}>
                            <div className={styles.circuloItem}>
                                <FileText size={70} weight="fill" />
                            </div>
                            <span className={styles.texto}>Relatorio</span>
                        </button>

                        <button className={styles.menuItem}>
                            <div className={styles.circuloItem}>
                                <Plus size={70} weight="bold" />
                            </div>
                            <span className={styles.texto}>Criar</span>
                        </button>



                        <button className={styles.menuItem} onClick={() => navegacao('/gerenciar-usuario')}>
                            <div className={styles.circuloItem}>
                                <AddressBook size={70} weight="fill" />
                            </div>
                            <span className={styles.texto}>Gerenciamento</span>
                        </button>


                    </div>
                </main>
            </div>

        </>
    )

    
}