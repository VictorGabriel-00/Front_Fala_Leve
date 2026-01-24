import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { List, House, Gear, UserCircle } from '@phosphor-icons/react';
import styles from './styles.module.css';


export function Header(){
    const navegacao = useNavigate();
    const [menuAberto, setMenuAberto] = useState(false);

    const usuarioLogado = JSON.parse(localStorage.getItem('usuario_logado') || '{}');
    const nomeUsuario = usuarioLogado.nome;
    const tipoUsuario = usuarioLogado.tipoUsuario;

    const isMedico = tipoUsuario === 'MEDICO';


    const tema = {
        corPrincipal: isMedico ? '#63783F' : '#0F2C64',
        corFundoSidebar: isMedico ? '#7FA552' : '#1852FE',
        corNomePerfil: isMedico ? '#424242' : '#fff'
    }

    const rota = {
        TelaInicio: isMedico ? '/tela-inicial-medico' : '/tela-inicial-paciente', 
        rotaConfig: isMedico ? '/configuracao-medico' :  '/configuracao-paciente'
    }


    function alterarMenu(){
        setMenuAberto(!menuAberto)
    }

    return(
            <>
                <header className={styles.headerContainer} style={{backgroundColor: tema.corPrincipal}}>
                    <button onClick={alterarMenu} className={styles.menuBotao}>
                        <List size={32} weight="bold" color={tema.corFundoSidebar}/> 
                    </button>

                    <div className={styles.ladoDireito}>
                        
                        <button className={styles.iconeBotao} title='Inicio' onClick={() => navegacao(rota.TelaInicio)}>
                            <House size={28}/>
                        </button>



                        <div className={styles.perfil}  title='Meu Perfil' >
                            <UserCircle size={32} weight='fill' color='#B9CEA0' />
                            <span className={styles.profilNome} style={{color: tema.corNomePerfil}}>{nomeUsuario}</span>
                        </div>


                    </div>

                </header>

                <div className={`${styles.sidebar} ${menuAberto ? styles.sidebarAberta : ''}`}
                    style={{backgroundColor: tema.corFundoSidebar}}>
                     <h3 className={styles.sidebarTitulo} style={{color: '#fff'}}>Menu Rápido</h3>
                
                  
                     <a href="#" className={styles.sidebarLink} style={{color: '#fff'}} 
                             onClick={() => {
                             localStorage.removeItem('usuario_logado');
                                navegacao('/login');
                                
                    }}>
                    Sair da Conta
                    </a>
                </div>

                
            </>

    )



}