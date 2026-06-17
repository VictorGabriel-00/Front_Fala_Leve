import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CloudArrowUp, CheckCircle, XCircle, SpeakerHigh, Play, Trash } from '@phosphor-icons/react';
import { Header } from '../../components/Header';
import styles from './styles.module.css';
import { API_URL } from '../../services/Api';


export function ImportaArquivo(){
    const navegacao = useNavigate();

    const [arquivoImagem, setArquivoImagem] = useState<File | null>(null);
    const [previewImagem, setPreviewImagem] = useState<string | null>(null);
    
    const [arquivoAudio, setArquivoAudio] = useState<File | null>(null);
    const [audioNome, setAudioNome] = useState<string>("");

    const [nome, setNome] = useState('');
    const [categoria, setCategoria] = useState('');
    const [loading, setLoading] = useState(false);
    const [tags, setTags] = useState('');

    function handleImageSelect(event: React.ChangeEvent<HTMLInputElement>) {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setArquivoImagem(file);
            setPreviewImagem(URL.createObjectURL(file)); 
        }
    }

    function handleAudioSelect(event: React.ChangeEvent<HTMLInputElement>) {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            
            if (!file.type.includes('audio')) {
                alert("Por favor, escolha um arquivo de áudio (MP3).");
                return;
            }

            setArquivoAudio(file);
            setAudioNome(file.name);
        }
    }

    function tocarPreview() {
        if (arquivoAudio) {
            const urlTemp = URL.createObjectURL(arquivoAudio);
            const audio = new Audio(urlTemp);
            audio.play();
        }
    }
   
    function limparSelecao() {
        setArquivoImagem(null);
        setPreviewImagem(null);
        setArquivoAudio(null);
        setAudioNome("");
        setNome("");
        setCategoria("");
        setTags("");
    }

    async function handleSalvar() {
        if (!arquivoImagem || !arquivoAudio || !nome || !categoria || !tags) {
            alert("Preencha todos os campos e selecione Imagem e Áudio!");
            return;
        }

        setLoading(true); 
        const usuarioLogado = JSON.parse(localStorage.getItem('usuario_logado') || '{}');
        const token = usuarioLogado.token;

        try {
           
            const formDataImg = new FormData();
            formDataImg.append('file', arquivoImagem); 

            const resImg = await fetch(`${API_URL}/arquivo/upload`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` },
                body: formDataImg
            });
            
            if (!resImg.ok) throw new Error("Falha no upload da imagem");
            const linkImagem = await resImg.text(); 

            const formDataAudio = new FormData();
            formDataAudio.append('file', arquivoAudio);

            const resAudio = await fetch(`${API_URL}/arquivo/upload`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` },
                body: formDataAudio
            });

            if (!resAudio.ok) throw new Error("Falha no upload do áudio");
            const linkAudio = await resAudio.text(); 

            
            const novoSimbolo = {
                descricaoSimbolo: nome,
                categoriaSimbolo: categoria,
                tagsSimbolo: tags,
                
                URLImagemSimbolo: `${API_URL}${linkImagem}`,
                URLaudioSimbolo: `${API_URL}${linkAudio}`
            };

            const resFinal = await fetch(`${API_URL}/simbolo`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(novoSimbolo)
            });

            if (resFinal.ok) {
                alert("Importação concluída com sucesso!");
                navegacao('/tela-sons'); 
            } else {
                throw new Error("Erro ao salvar os dados no banco.");
            }

        } catch (error) {
            console.error(error);
            alert("Ocorreu um erro. Verifique se o servidor Java está rodando.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className={styles.container}>
            <Header />

            <main className={styles.content}>
                
                
                {!previewImagem ? (
                    <div className={styles.uploadZone}>
                        <CloudArrowUp size={80} weight="fill" color="#8ea7ff" />
                        <span className={styles.uploadText}>Toque para adicionar uma Imagem</span>
                       
                        <input 
                            type="file" 
                            accept="image/*" 
                            className={styles.inputFile} 
                            onChange={handleImageSelect}
                        />
                    </div>
                ) : (
                    
                    <div className={styles.formCard}>
                        <h2 className={styles.formTitle}>Novo Símbolo</h2>

                      
                        <div className={styles.imagePreviewContainer}>
                             <img src={previewImagem || ""} alt="Preview" className={styles.imagePreview} />
                             <button onClick={limparSelecao} className={styles.btnTrash} title="Limpar tudo">
                                <Trash size={20} />
                             </button>
                        </div>
                        
                       
                        <div className={`${styles.uploadZone} ${styles.audioZone}`}>
                            {arquivoAudio ? (
                                <div className={styles.audioInfo}>
                                    <SpeakerHigh size={32} color="#4caf50" />
                                    <span className={styles.audioName}>{audioNome}</span>
                                    <button onClick={tocarPreview} className={styles.btnPlay} title="Ouvir">
                                        <Play size={16} weight="fill" />
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <SpeakerHigh size={32} weight="fill" color="#fff" />
                                    <span className={styles.audioText}>Adicionar Áudio (MP3)</span>
                                </>
                            )}
                            
                            <input 
                                type="file" 
                                accept="audio/*" 
                                className={styles.inputFile} 
                                onChange={handleAudioSelect}
                            />
                        </div>

                       
                        <div className={styles.inputGroup}>
                            <label>Nome do Símbolo</label>
                            <input 
                                type="text" 
                                placeholder="Ex: Bebida"
                                value={nome} 
                                onChange={e => setNome(e.target.value)} 
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label>Categoria</label>
                            <input 
                                type="text" 
                                placeholder="Ex: Alimentos"
                                value={categoria} 
                                onChange={e => setCategoria(e.target.value)} 
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label>Tags (separadas por vírgula)</label>
                            <input 
                                type="text" 
                                placeholder="Ex: fome, sede, urgente"
                                value={tags} 
                                onChange={e => setTags(e.target.value)} 
                            />
                        </div>

                       
                        <div className={styles.actions}>
                            <button onClick={limparSelecao} className={styles.btnCancelar}>
                                <XCircle size={24} /> Cancelar
                            </button>
                            <button onClick={handleSalvar} disabled={loading} className={styles.btnSalvar}>
                                {loading ? "Enviando..." : <><CheckCircle size={24} /> Salvar</>}
                            </button>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}

