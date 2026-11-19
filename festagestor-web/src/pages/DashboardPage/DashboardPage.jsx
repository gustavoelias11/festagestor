// pages/DashboardPage/DashboardPage.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CalendarDays, Package, TrendingUp, Users } from "lucide-react";
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
              <Package className="w-6 h-6 text-primary" />
            </StatCard>

            <StatCard titulo="Aluguéis este Mês" valor={resumo.alugueisMes} corFundoIcone="bg-success/10">
              <CalendarDays className="w-6 h-6 text-success" />
            </StatCard>

            <StatCard titulo="Clientes Ativos" valor={resumo.clientesAtivos} corFundoIcone="bg-primary-dark/10">
              <Users className="w-6 h-6 text-primary-dark" />
            </StatCard>

            <StatCard titulo="Faturamento" valor={formatarMoeda(resumo.faturamento)} corFundoIcone="bg-success/10">
              <TrendingUp className="w-6 h-6 text-success" />
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