import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../components/Header';
import { MagnifyingGlass, UserPlus, CheckCircle } from '@phosphor-icons/react';
import styles from './styles.module.css';

export function CriarProntuario() { // Pode renomear para ProntuarioMedico se quiser
    const navigate = useNavigate();
    const [codigoBusca, setCodigoBusca] = useState('');
    const [paciente, setPaciente] = useState<any>(null);
    const [erro, setErro] = useState('');

    // 1. BUSCAR PACIENTE
    async function buscarPaciente() {
        if (!codigoBusca) return;
        const usuarioLogado = JSON.parse(localStorage.getItem('usuario_logado') || '{}');
        
        try {
            const response = await fetch(`http://localhost:8080/paciente/${codigoBusca}`, {
                headers: { 'Authorization': `Bearer ${usuarioLogado.token}` }
            });

            if (response.ok) {
                const data = await response.json();
                setPaciente(data);
                setErro('');
            } else {
                setErro("Paciente não encontrado com esse código.");
                setPaciente(null);
            }
        } catch (error) {
            setErro("Erro de conexão.");
        }
    }

    // 2. ASSUMIR PACIENTE
    async function handleAssumir() {
        const usuarioLogado = JSON.parse(localStorage.getItem('usuario_logado') || '{}');
        const idMedico = usuarioLogado.id;

        try {
            const response = await fetch(`http://localhost:8080/medico/${idMedico}/assumir/${paciente.id}`, {
                method: 'PUT',
                headers: { 'Authorization': `Bearer ${usuarioLogado.token}` }
            });

            if (response.ok) {
                alert("Sucesso! O paciente agora está na sua lista.");
                navigate('/tela-inicial-medico'); // Volta para o início
            } else {
                alert("Erro ao vincular.");
            }
        } catch (error) {
            alert("Erro de conexão.");
        }
    }

    return (
        <div className={styles.container}>
            <Header />
            <main className={styles.content}>
                <h1 className={styles.titulo}>Buscar Prontuário</h1>

                {/* AREA DE BUSCA */}
                <div className={styles.searchBox}>
                    <input 
                        type="text" 
                        placeholder="Insira o código (ID) do paciente"
                        value={codigoBusca}
                        onChange={e => setCodigoBusca(e.target.value)}
                    />
                    <button onClick={buscarPaciente}>
                        <MagnifyingGlass size={24} /> Buscar
                    </button>
                </div>
                {erro && <p style={{color: 'red', marginTop: 10}}>{erro}</p>}

                {/* RESULTADO DA BUSCA (CARD) */}
                {paciente && (
                    <div className={styles.cardResultado}>
                        <div className={styles.info}>
                            <h2>{paciente.nome}</h2>
                            <p><strong>Grau:</strong> {paciente.grau}</p>
                            <p><strong>Sons:</strong> {paciente.sons}</p>
                            <p><strong>Cores:</strong> {paciente.cores}</p>
                        </div>

                        <button className={styles.btnAssumir} onClick={handleAssumir}>
                            <UserPlus size={28} />
                            Assumir Paciente
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
}