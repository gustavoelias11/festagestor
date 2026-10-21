import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "../../components/layout/Sidebar";
import { ItemCard } from "./components/ItemCard";

// Serviços
import { itemService } from "../../services/itemService";
import { ModalNovoItem } from "./components/ModalNovoItem";

export default function ItensPage() {
  const navigate = useNavigate();
  const [itens, setItens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errosDaApi, setErrosDaApi] = useState(null);

  useEffect(() => {
    carregarItens();
  }, []);

  const carregarItens = async () => {
    try {
      const dados = await itemService.listar();
      setItens(dados);
    } catch (error) {
      console.error("Erro ao buscar itens:", error);
    } finally {
      setLoading(false);
    }
  };

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
    console.log("Abrindo modal para editar evento:", id);
  };

  const handleExcluir = (id) => {
    console.log("Excluindo evento:", id);
  };

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <Sidebar />
      <div
        data-replit-metadata="artifacts/festa-gestor/src/components/layout/sidebar.tsx:80:8"
        data-component-name="div"
        className="p-8 flex-1 max-w-7xl mx-auto w-full"
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Itens</h1>

            <p className="text-muted-foreground mt-1">
              Gerencie seus brinquedos e decorações
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            data-replit-metadata="artifacts/festa-gestor/src/components/ui/button.tsx:46:6"
            data-component-name="Comp"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 shrink-0 gap-2"
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
              data-replit-metadata="artifacts/festa-gestor/src/components/ui/input.tsx:10:6"
              data-component-name="input"
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 pl-9"
              placeholder="Buscar itens..."
              value=""
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {loading ? (
                <p>Buscando itens...</p>
            ) : itens.length === 0 ? (
                <p>Não há itens.</p>
            ) : (
                itens.map((item) => (
                    <ItemCard
                    key={item.id}
                    item={item}
                    onEditar={handleEditar}
                    onExcluir={handleExcluir}
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
    </div>
  );
}
