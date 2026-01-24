import { Header } from '../../components/Header';
import { User } from '@phosphor-icons/react'; // Ícone padrão se não tiver foto
import styles from './styles.module.css';
import { useEffect } from 'react';
import { useState } from 'react';



interface Paciente {
    id: string;
    nome: string;
    // Adicione fotoUrl se você tiver esse campo no futuro
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
            // Busca os dados do Médico (que já trazem a lista de pacientes junto)
            const response = await fetch(`http://localhost:8080/medico/${idMedico}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                const data = await response.json();
                // O backend retorna o médico com uma lista "pacientes" dentro
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
                                {/* Como ainda não temos foto no cadastro, uso um ícone ou placeholder */}
                                <div className={styles.avatarContainer}>
                                    {/* Se tivesse foto: <img src={paciente.foto} /> */}
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