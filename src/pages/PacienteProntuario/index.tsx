import { useEffect, useState } from 'react';
import { Header } from '../../components/Header';
import { AddressBook, Heart, MusicNotes, Palette } from '@phosphor-icons/react';
import styles from './styles.module.css';
import { API_URL } from '../../services/Api';

export function ProntuarioPaciente() {
    const [dados, setDados] = useState<any>(null);

    useEffect(() => {
        carregarDados();
    }, []);

    async function carregarDados() {
        const usuarioLogado = JSON.parse(localStorage.getItem('usuario_logado') || '{}');
        const token = usuarioLogado.token;
        const id = usuarioLogado.id;

        if (!id) return;

        try {
            const response = await fetch(`${API_URL}/paciente/${id}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await response.json();
            setDados(data);
        } catch (error) {
            console.error("Erro ao carregar perfil", error);
        }
    }

    if (!dados) return <div className={styles.loading}>Carregando...</div>;

    return (
        <div className={styles.container}>
            <Header />
            <main className={styles.content}>
                <h1 className={styles.titulo}>Meu Prontuário</h1>

                <div className={styles.card}>
                    <div className={styles.headerCard}>
                        <AddressBook size={64} color="#fff" />
                        <div>
                            <h2>{dados.nome}</h2>
                            <p className={styles.subtitulo}>ID: {dados.id}</p>
                        </div>
                    </div>

                    <div className={styles.bodyCard}>
                        <div className={styles.item}>
                            <Heart size={32} color="#ff4081" weight="fill" />
                            <div>
                                <strong>Grau de Neurodivergência</strong>
                                <p>Nível {dados.grau}</p>
                            </div>
                        </div>

                        <div className={styles.item}>
                            <Palette size={32} color="#7c4dff" weight="fill" />
                            <div>
                                <strong>Cores Agradáveis</strong>
                                <p>{dados.cores}</p>
                            </div>
                        </div>

                        <div className={styles.item}>
                            <MusicNotes size={32} color="#00e676" weight="fill" />
                            <div>
                                <strong>Sons Agradáveis</strong>
                                <p>{dados.sons}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}