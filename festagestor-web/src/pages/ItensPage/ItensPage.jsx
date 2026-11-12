import { useState, useEffect } from "react";
import { Sidebar } from "../../components/layout/Sidebar";
import { ItemCard } from "./components/ItemCard";
import { itemService } from "../../services/itemService";
import { ModalNovoItem } from "./components/ModalNovoItem";
import { ConfirmModal } from "../../components/ui/ConfirmModal";
import { ModalAlteraItem } from "./components/ModalAlteraItem";

export default function ItensPage() {
  const [itens, setItens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errosDaApi, setErrosDaApi] = useState(null);
  const [termoBusca, setTermoBusca] = useState("");
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [itemParaExcluir, setItemParaExcluir] = useState(null);

  const [itemParaEditar, setItemParaEditar] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const carregarItens = async () => {
      try {
        const dados = await itemService.listar();
        if (isMounted) {
          setItens(dados);
        }
      } catch (error) {
        console.error("Erro ao buscar itens:", error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    carregarItens();

    return () => {
      isMounted = false;
    };
  }, []);

  const termo = termoBusca.toLowerCase();

  const itensFiltrados = itens.filter((item) => {
    const nome = (item.nome || "").toLowerCase().includes(termo);

    let especifico = false;

    if (item.tipo === "brinquedo") {
      const capacidade = (item.capacidade?.toString() ?? "")
        .toLowerCase()
        .includes(termo);
      const dimensao = (item.dimensao?.toString() ?? "")
        .toLowerCase()
        .includes(termo);

      especifico = capacidade || dimensao;
    }

    if (item.tipo === "decoracao") {
      const tema = (item.tema || "").toLowerCase().includes(termo);

      especifico = tema;
    }

    return nome || especifico;
  });

  const handleSalvarItem = async (dadosDoFormulario) => {
    try {
      const novosItens = await itemService.cadastrar(dadosDoFormulario);
      setItens((listaAnterior) => [...listaAnterior, ...novosItens]);
      setIsModalOpen(false);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.error("A API do Java rejeitou os dados:", error.response.data);
        setErrosDaApi(error.response.data);
      } else {
        alert("Erro de conexão com o servidor.");
      }
    }
  };

  const handleEditar = (id) => {
    const itemEncontrado = itens.find((item) => item.id === id);
    setItemParaEditar(itemEncontrado);
  };

  const handleEditarItem = async (payload) => {
    try {
      const itemAtualizado = await itemService.atualizar(payload.id, payload);
      setItens((listaAtual) =>
        listaAtual.map((item) =>
          item.id === itemAtualizado.id ? itemAtualizado : item,
        ),
      );
      setItemParaEditar(null);
    } catch (error) {
      console.error("Erro ao atualizar no Java:", error);
    }
  };

  const handleExcluirClick = (id) => {
    setItemParaExcluir(id);
    setIsConfirmModalOpen(true);
  };

  const confirmarExclusao = async () => {
    if (!itemParaExcluir) return;

    try {
      await itemService.deletar(itemParaExcluir);
      setItens((itensAnteriores) =>
        itensAnteriores.filter((item) => item.id !== itemParaExcluir),
      );
      setIsConfirmModalOpen(false);
      setItemParaExcluir(null);
    } catch (error) {
      console.error("Erro ao excluir item:", error);
      alert("Não foi possível excluir o item. Tente novamente.");
    }
  };

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <Sidebar />
      <div className="p-8 flex-1 max-w-7xl mx-auto w-full">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Itens</h1>
            <p className="text-muted-foreground mt-1">
              Gerencie seus brinquedos e decorações
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 shrink-0 gap-2 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-plus w-4 h-4"
              aria-hidden="true"
            >
              <path d="M5 12h14"></path>
              <path d="M12 5v14"></path>
            </svg>
            Novo Item
          </button>
        </div>

        <div className="flex gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-search absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"
              aria-hidden="true"
            >
              <path d="m21 21-4.34-4.34"></path>
              <circle cx="11" cy="11" r="8"></circle>
            </svg>
            <input
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 pl-9"
              placeholder="Buscar itens..."
              value={termoBusca}
              onChange={(e) => setTermoBusca(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {loading ? (
            <p>Buscando itens...</p>
          ) : itens.length === 0 ? (
            <p>Nenhum item encontrado.</p>
          ) : (
            itensFiltrados.map((item) => (
              <ItemCard
                key={item.id}
                item={item}
                onEditar={handleEditar}
                onExcluir={handleExcluirClick}
              />
            ))
          )}
        </div>
      </div>

      <ModalNovoItem
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSalvar={handleSalvarItem}
        errosBackend={errosDaApi}
      />

      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={() => {
          setIsConfirmModalOpen(false);
          setItemParaExcluir(null);
        }}
        onConfirm={confirmarExclusao}
        title="Excluir Item"
        message="Tem certeza que deseja excluir este item? Esta ação removerá o item do sistema."
        confirmText="Excluir"
        cancelText="Cancelar"
        isDestructive={true}
      />

      <ModalAlteraItem
        isOpen={!!itemParaEditar}
        onClose={() => setItemParaEditar(null)}
        itemSelecionado={itemParaEditar}
        onSalvar={handleEditarItem}
      />
    </div>
  );
}
