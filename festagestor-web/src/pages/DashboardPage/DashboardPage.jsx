// pages/DashboardPage/DashboardPage.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "../../components/layout/Sidebar";
import { StatCard } from "./components/StatCard";
import { ModalEdicaoAluguel } from "./components/ModalEdicaoAluguel";
import { ListaAlugueisRecentes } from "./components/ListaAlugueisRecentes";
import { formatarMoeda } from "../../utils/formatters";

// Serviços
import { atualizarStatusAluguel, listarAlugueisRecentes } from "../../services/aluguelService";
import { obterResumoDashboard } from "../../services/dashboardService";

export default function DashboardPage() {
  const navigate = useNavigate();
  const [alugueis, setAlugueis] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [aluguelSelecionado, setAluguelSelecionado] = useState(null);
  const [erroModal, setErroModal] = useState("");

  const [resumo, setResumo] = useState({
    itensCadastrados: 0,
    alugueisMes: 0,
    clientesAtivos: 0,
    faturamento: 0,
  });
  const [loading, setLoading] = useState(true);

  const handleSalvarStatus = async (idAluguel, statusEscolhido) => {
    try {
      setErroModal(""); 
      await atualizarStatusAluguel(idAluguel, statusEscolhido);

      setAlugueis((alugueisAtuais) =>
        alugueisAtuais.map((aluguel) =>
          aluguel.id === idAluguel
            ? { ...aluguel, status: statusEscolhido }
            : aluguel,
        ),
      );

      const resumoAtualizado = await obterResumoDashboard();
      setResumo(resumoAtualizado);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Erro ao atualizar status do aluguel:", error);
      if (error.response && error.response.data && error.response.data.mensagem) {
        setErroModal(error.response.data.mensagem);
      } else {
        setErroModal("Erro inesperado ao conectar com o servidor.");
      }
    }
  };

  const handleAbrirModal = (aluguel) => {
    setAluguelSelecionado(aluguel);
    setIsModalOpen(true);
    setErroModal("");
  };

  useEffect(() => {
    async function carregarDados() {
      try {
        const [respostaAlugueis, respostaResumo] = await Promise.all([
          listarAlugueisRecentes(),
          obterResumoDashboard(),
        ]);

        setAlugueis(respostaAlugueis);
        setResumo(respostaResumo);
      } catch (error) {
        console.error("Erro ao carregar dashboard:", error);
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
          navigate("/");
        }
      } finally {
        setLoading(false);
      }
    }
    carregarDados();
  }, [navigate]);

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <Sidebar />

      <main className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
        <div className="p-8 flex-1 max-w-7xl mx-auto w-full">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Dashboard
            </h1>
            <p className="text-gray-500 mt-1">
              Bem-vindo de volta! Aqui está o resumo do seu negócio.
            </p>
          </div>

          {/* Cards Dinâmicos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard titulo="Itens Cadastrados" valor={resumo.itensCadastrados} corFundoIcone="bg-primary/10">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-primary"><path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z"></path><path d="M12 22V12"></path><polyline points="3.29 7 12 12 20.71 7"></polyline><path d="m7.5 4.27 9 5.15"></path></svg>
            </StatCard>

            <StatCard titulo="Aluguéis este Mês" valor={resumo.alugueisMes} corFundoIcone="bg-success/10">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-success"><path d="M8 2v4"></path><path d="M16 2v4"></path><rect width="18" height="18" x="3" y="4" rx="2"></rect><path d="M3 10h18"></path><path d="M8 14h.01"></path><path d="M12 14h.01"></path><path d="M16 14h.01"></path><path d="M8 18h.01"></path><path d="M12 18h.01"></path><path d="M16 18h.01"></path></svg>
            </StatCard>

            <StatCard titulo="Clientes Ativos" valor={resumo.clientesAtivos} corFundoIcone="bg-primary-dark/10">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-primary-dark"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><path d="M16 3.128a4 4 0 0 1 0 7.744"></path><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><circle cx="9" cy="7" r="4"></circle></svg>
            </StatCard>

            <StatCard titulo="Faturamento" valor={formatarMoeda(resumo.faturamento)} corFundoIcone="bg-success/10">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-success"><path d="M16 7h6v6"></path><path d="m22 7-8.5 8.5-5-5L2 17"></path></svg>
            </StatCard>
          </div>

          {/* Componente Extraído */}
          <ListaAlugueisRecentes 
            alugueis={alugueis} 
            loading={loading} 
            onAluguelClick={handleAbrirModal} 
          />
        </div>
      </main>

      <ModalEdicaoAluguel
        key={aluguelSelecionado ? aluguelSelecionado.id : 'modal-vazio'}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        aluguel={aluguelSelecionado}
        onSalvar={handleSalvarStatus}
        erro={erroModal}
      />
    </div>
  );
}