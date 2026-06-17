import { useState, useEffect } from 'react';
import { Header } from '../../components/Header';
import { SpeakerHigh, PlayCircle, PauseCircle, Trash } from '@phosphor-icons/react';
import styles from './styles.module.css';
import { API_URL } from '../../services/Api';

interface Simbolo {
    idSimbolo: string;
    descricaoSimbolo: string;
    categoriaSimbolo: string;
    URLImagemSimbolo?: string; 
    urlImagemSimbolo?: string;
    URLaudioSimbolo?: string;
    urlaudioSimbolo?: string;
    tagsSimbolo: string;
}

export function TelaSons() {
    const [sons, setSons] = useState<Simbolo[]>([]);
    const [loading, setLoading] = useState(true);
    const [audioAtual, setAudioAtual] = useState<HTMLAudioElement | null>(null);
    const [urlTocando, setUrlTocando] = useState<string | null>(null);

    useEffect(() => {
        carregarSons();
    }, []);

   async function carregarSons() {
        const usuarioLogado = JSON.parse(localStorage.getItem('usuario_logado') || '{}');
        const token = usuarioLogado.token;

        try {
            const response = await fetch(`${API_URL}/simbolo`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            
            if (response.ok) {
                const data = await response.json();
                console.log("DADOS RECEBIDOS:", data); 

                const sonsFormatados = data.map((item: any) => ({
                    ...item,
                    URLaudioSimbolo: item.URLaudioSimbolo || item.urlaudioSimbolo || item.urlAudioSimbolo,
                    URLImagemSimbolo: item.URLImagemSimbolo || item.urlImagemSimbolo || item.urlimagemSimbolo
                }));

                
                const apenasComAudio = sonsFormatados.filter((item: any) => item.URLaudioSimbolo);
                setSons(apenasComAudio);
            }
        } catch (error) {
            console.error("Erro ao buscar sons", error);
        } finally {
            setLoading(false);
        }
    }

    async function deletarSom(id: string, e: React.MouseEvent) {
        e.stopPropagation(); 

        if (!window.confirm("Tem certeza que deseja excluir este som?")) return;

        const usuarioLogado = JSON.parse(localStorage.getItem('usuario_logado') || '{}');

        try {
            const response = await fetch(`${API_URL}/simbolo/${id}`, {
                method: 'DELETE',
                headers: { 
                    'Authorization': `Bearer ${usuarioLogado.token}` 
                }
            });

            if (response.ok || response.status === 204) {
            
                setSons(sonsAntigos => sonsAntigos.filter(som => som.idSimbolo !== id));
                alert("Áudio excluído com sucesso!");
            } else {
                alert("Erro ao excluir. Tente novamente.");
            }
        } catch (error) {
            console.error("Erro:", error);
            alert("Erro de conexão.");
        }
    }

    function tocarAudio(url: string) {
       
        if (audioAtual) {
            audioAtual.pause();
            audioAtual.currentTime = 0;
        }

        
        if (urlTocando === url) {
            setUrlTocando(null);
            setAudioAtual(null);
            return;
        }

        
        const audio = new Audio(url);
        audio.play().catch(e => alert("Erro ao reproduzir áudio: " + e.message));
        
       
        audio.onended = () => setUrlTocando(null);

        setAudioAtual(audio);
        setUrlTocando(url);
    }

    return (
        <div className={styles.container}>
            <Header />

            <main className={styles.content}>
                <h1 className={styles.titulo}>Minha Galeria de Sons</h1>

                <div className={styles.lista}>
                    {loading ? (
                        <p className={styles.loading}>Carregando sons...</p>
                    ) : sons.length === 0 ? (
                        <p className={styles.loading}>Nenhum som cadastrado ainda.</p>
                    ) : (
                        sons.map(item => (
                            <button 
                                key={item.idSimbolo} 
                                className={`${styles.card} ${urlTocando === item.URLaudioSimbolo ? styles.tocando : ''}`}
                                onClick={() => item.URLaudioSimbolo && tocarAudio(item.URLaudioSimbolo)}
                            >
                                
                                <div className={styles.iconArea}>
                                    {item.URLImagemSimbolo ? (
                                        <img src={item.URLImagemSimbolo} alt={item.descricaoSimbolo} className={styles.imgSimbolo} />
                                    ) : (
                                        <SpeakerHigh size={32} color="#fff" />
                                    )}
                                </div>

                                
                                <div className={styles.infoArea}>
                                    <span className={styles.nome}>{item.descricaoSimbolo}</span>
                                    <span className={styles.categoria}>{item.categoriaSimbolo}</span>
                                </div>

                                
                                <div className={styles.actionArea}>
                                    {urlTocando === item.URLaudioSimbolo ? (
                                        <PauseCircle size={48} weight="fill" color="#4caf50" />
                                    ) : (
                                        <PlayCircle size={48} weight="fill" color="#fff" />
                                    )}
                                </div>

                                <div className={styles.actionArea}>
                                    {urlTocando === item.URLaudioSimbolo ? (
                                        <PauseCircle size={48} weight="fill" color="#4caf50" />
                                    ) : (
                                        <PlayCircle size={48} weight="fill" color="#fff" />
                                    )}
                                </div>

                                <button 
                                    className={styles.btnDeletar} 
                                    onClick={(e) => deletarSom(item.idSimbolo, e)}
                                    title="Excluir som"
                                    >
                                    <Trash size={24} color="#ff4444" weight="bold" />
                                </button>
                                
                            </button>
                        ))
                    )}
                </div>
            </main>
        </div>
    );
}