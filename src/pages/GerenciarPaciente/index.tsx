import { Header } from '../../components/Header';
import { User } from '@phosphor-icons/react'; 
import styles from './styles.module.css';
import { useEffect } from 'react';
import { useState } from 'react';

import { API_URL } from '../../services/Api';

interface Paciente {
    id: string;
    nome: string;

}


export function GerenciarUsuario(){
    const [pacientes, setPacientes] = useState<Paciente[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        carregarPacientes();
    }, []);

    async function carregarPacientes() {
        const usuarioLogado = JSON.parse(localStorage.getItem('usuario_logado') || '{}');
        const token = usuarioLogado.token;
        const idMedico = usuarioLogado.id;

        try {
            const response = await fetch(`${API_URL}/medico/${idMedico}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                const data = await response.json();
                setPacientes(data.pacientes || []); 
            }
        } catch (error) {
            console.error("Erro ao carregar lista", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className={styles.container}>
            <Header />
            
            <main className={styles.content}>
                <h1 className={styles.titulo}>Usuarios</h1>

                <div className={styles.listaPacientes}>
                    {loading ? (
                        <p>Carregando...</p>
                    ) : pacientes.length === 0 ? (
                        <p>Você ainda não assumiu nenhum paciente.</p>
                    ) : (
                        pacientes.map(paciente => (
                            <div key={paciente.id} className={styles.cardPaciente}>
                                <div className={styles.avatarContainer}>
                                    <User size={40} weight="fill" color="#555" /> 
                                </div>
                                
                                <span className={styles.nomePaciente}>{paciente.nome}</span>
                            </div>
                        ))
                    )}
                </div>
            </main>
        </div>
    );
}