import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "../../components/layout/Sidebar";
import { ItemCard } from "./components/ItemCard";
import { itemService } from "../../services/itemService";
import { ModalNovoItem } from "./components/ModalNovoItem";
import { ConfirmModal } from "../../components/ui/ConfirmModal";
import { ModalAlteraItem } from "./components/ModalAlteraItem";
import { ModalDetalhesItem } from "./components/ModalDetalhesItem";
import { AlertCircle, Package, Plus, Search, X } from "lucide-react";

function ItemCardSkeleton() {
  return (
    <div className="rounded-xl border border-border bg-surface p-5 shadow-sm animate-pulse">
      <div className="flex justify-between items-start mb-4">
        <div className="w-10 h-10 rounded-lg bg-surface-muted" />
        <div className="w-20 h-5 rounded-full bg-surface-muted" />
      </div>
      <div className="h-5 w-3/4 rounded bg-surface-muted mb-2" />
      <div className="h-4 w-1/2 rounded bg-surface-muted mb-4" />
      <div className="flex items-center justify-between pt-4 border-t border-border/60">
        <div className="h-5 w-24 rounded bg-surface-muted" />
        <div className="flex gap-2">
          <div className="h-9 w-9 rounded-md bg-surface-muted" />
          <div className="h-9 w-9 rounded-md bg-surface-muted" />
        </div>
      </div>
    </div>
  );
}

export default function ItensPage() {
  const navigate = useNavigate();
  const [itens, setItens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erroCarregamento, setErroCarregamento] = useState("");
  const [erroAcao, setErroAcao] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errosDaApi, setErrosDaApi] = useState(null);
  const [salvandoNovo, setSalvandoNovo] = useState(false);
  const [termoBusca, setTermoBusca] = useState("");
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [itemParaExcluir, setItemParaExcluir] = useState(null);
  const [excluindo, setExcluindo] = useState(false);
  const [itemParaEditar, setItemParaEditar] = useState(null);
  const [errosEdicao, setErrosEdicao] = useState(null);
  const [salvandoEdicao, setSalvandoEdicao] = useState(false);
  const [itemDetalhe, setItemDetalhe] = useState(null);

  const buscarItens = useCallback(async () => {
    const dados = await itemService.listar();
    return dados;
  }, []);

  const handleRecarregarItens = async () => {
    setLoading(true);
    setErroCarregamento("");
    try {
      const dados = await buscarItens();
      setItens(dados);
    } catch (error) {
      console.error("Erro ao buscar itens:", error);
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 403)
      ) {
        navigate("/");
        return;
      }
      setErroCarregamento(
        error.response?.data?.mensagem ||
          "Não foi possível carregar os itens. Verifique sua conexão e tente novamente.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;

    buscarItens()
      .then((dados) => {
        if (isMounted) setItens(dados);
      })
      .catch((error) => {
        console.error("Erro ao buscar itens:", error);
        if (!isMounted) return;
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 403)
        ) {
          navigate("/");
          return;
        }
        setErroCarregamento(
          error.response?.data?.mensagem ||
            "Não foi possível carregar os itens. Verifique sua conexão e tente novamente.",
        );
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [buscarItens, navigate]);

  const termo = termoBusca.trim().toLowerCase();

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

  const handleAbrirModalNovo = () => {
    setErrosDaApi(null);
    setIsModalOpen(true);
  };

  const handleFecharModalNovo = () => {
    setErrosDaApi(null);
    setIsModalOpen(false);
  };

  const handleSalvarItem = async (dadosDoFormulario) => {
    setSalvandoNovo(true);
    setErrosDaApi(null);
    try {
      const novosItens = await itemService.cadastrar(dadosDoFormulario);
      setItens((listaAnterior) => [...listaAnterior, ...novosItens]);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Erro ao cadastrar item:", error);
      if (error.response && error.response.status >= 400 && error.response.status < 500) {
        setErrosDaApi(
          error.response.data || "Verifique os dados informados e tente novamente.",
        );
      } else {
        setErrosDaApi("Erro de conexão com o servidor. Tente novamente.");
      }
    } finally {
      setSalvandoNovo(false);
    }
  };

  const handleEditar = (id) => {
    const itemEncontrado = itens.find((item) => item.id === id);
    setErrosEdicao(null);
    setItemParaEditar(itemEncontrado);
  };

  const handleFecharModalEdicao = () => {
    setErrosEdicao(null);
    setItemParaEditar(null);
  };

  const handleEditarItem = async (payload) => {
    setSalvandoEdicao(true);
    setErrosEdicao(null);
    try {
      const itemAtualizado = await itemService.atualizar(payload.id, payload);
      setItens((listaAtual) =>
        listaAtual.map((item) =>
          item.id === itemAtualizado.id ? itemAtualizado : item,
        ),
      );
      setItemParaEditar(null);
    } catch (error) {
      console.error("Erro ao atualizar item:", error);
      if (error.response && error.response.status >= 400 && error.response.status < 500) {
        setErrosEdicao(
          error.response.data || "Não foi possível atualizar o item.",
        );
      } else {
        setErrosEdicao("Erro de conexão com o servidor. Tente novamente.");
      }
    } finally {
      setSalvandoEdicao(false);
    }
  };

  const handleExcluirClick = (id) => {
    setErroAcao("");
    setItemParaExcluir(id);
    setIsConfirmModalOpen(true);
  };

  const confirmarExclusao = async () => {
    if (!itemParaExcluir) return;

    setExcluindo(true);
    setErroAcao("");
    try {
      await itemService.deletar(itemParaExcluir);
      setItens((itensAnteriores) =>
        itensAnteriores.filter((item) => item.id !== itemParaExcluir),
      );
      setIsConfirmModalOpen(false);
      setItemParaExcluir(null);
    } catch (error) {
      console.error("Erro ao excluir item:", error);
      setIsConfirmModalOpen(false);
      setItemParaExcluir(null);
      setErroAcao(
        error.response?.data?.mensagem ||
          "Não foi possível excluir o item. Tente novamente.",
      );
    } finally {
      setExcluindo(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <Sidebar />
      <div className="p-8 flex-1 max-w-7xl mx-auto w-full min-w-0">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Itens
            </h1>
            <p className="text-muted-foreground mt-1">
              Gerencie seus brinquedos e decorações
            </p>
          </div>
          <button
            type="button"
            onClick={handleAbrirModalNovo}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 shrink-0 gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Novo Item
          </button>
        </div>

        {(erroCarregamento || erroAcao) && (
          <div
            role="alert"
            className="mb-6 flex items-center justify-between gap-4 rounded-xl border border-danger/20 bg-danger/10 p-4 text-sm text-danger"
          >
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span className="font-medium">{erroCarregamento || erroAcao}</span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              {erroCarregamento && (
                <button
                  type="button"
                  onClick={handleRecarregarItens}
                  className="rounded-md bg-danger px-3 py-1.5 text-xs font-semibold text-white hover:bg-danger/90 transition-colors cursor-pointer"
                >
                  Tentar novamente
                </button>
              )}
              {erroAcao && (
                <button
                  type="button"
                  aria-label="Fechar alerta"
                  onClick={() => setErroAcao("")}
                  className="rounded-full p-1 hover:bg-danger/10 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}

        <div className="flex gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              className="flex h-9 w-full rounded-md border border-input bg-surface px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 pl-9"
              placeholder="Buscar por nome, tema, dimensão..."
              value={termoBusca}
              onChange={(e) => setTermoBusca(e.target.value)}
            />
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <ItemCardSkeleton key={index} />
            ))}
          </div>
        ) : !erroCarregamento && itens.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-surface py-16 px-4 text-center">
            <div className="bg-primary/10 p-3 rounded-full text-primary mb-3">
              <Package className="w-6 h-6" />
            </div>
            <h3 className="text-base font-semibold text-foreground">
              Nenhum item cadastrado
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Comece adicionando brinquedos ou decorações ao seu catálogo.
            </p>
          </div>
        ) : !erroCarregamento && itensFiltrados.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-surface py-14 px-4 text-center">
            <div className="bg-surface-muted p-3 rounded-full text-muted-foreground mb-3">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-base font-semibold text-foreground">
              Nenhum item encontrado para &ldquo;{termoBusca}&rdquo;
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Tente buscar por outro termo ou limpe o filtro.
            </p>
            <button
              type="button"
              onClick={() => setTermoBusca("")}
              className="mt-4 rounded-md border border-input bg-surface px-4 py-1.5 text-sm font-medium text-foreground hover:bg-accent transition-colors cursor-pointer"
            >
              Limpar busca
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {itensFiltrados.map((item) => (
              <ItemCard
                key={item.id}
                item={item}
                onDetalhe={() => setItemDetalhe(item)}
                onEditar={handleEditar}
                onExcluir={handleExcluirClick}
              />
            ))}
          </div>
        )}
      </div>

      <ModalNovoItem
        isOpen={isModalOpen}
        onClose={handleFecharModalNovo}
        onSalvar={handleSalvarItem}
        errosBackend={errosDaApi}
        isSubmitting={salvandoNovo}
      />

      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={() => {
          if (excluindo) return;
          setIsConfirmModalOpen(false);
          setItemParaExcluir(null);
        }}
        onConfirm={confirmarExclusao}
        title="Excluir Item"
        message="Tem certeza que deseja excluir este item? Esta ação removerá o item do sistema."
        confirmText="Excluir"
        cancelText="Cancelar"
        isDestructive={true}
        isLoading={excluindo}
      />

      <ModalAlteraItem
        isOpen={!!itemParaEditar}
        onClose={handleFecharModalEdicao}
        itemSelecionado={itemParaEditar}
        onSalvar={handleEditarItem}
        errosBackend={errosEdicao}
        isSubmitting={salvandoEdicao}
      />

      <ModalDetalhesItem
        isOpen={!!itemDetalhe}
        onClose={() => setItemDetalhe(null)}
        item={itemDetalhe}
      />
    </div>
  );
}
