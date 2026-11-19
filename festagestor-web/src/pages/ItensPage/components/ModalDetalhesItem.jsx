import { useEffect } from "react";
import { Package, X } from "lucide-react";
import {
  formatarMoeda,
  formatarStatusItem,
  formatarTipoItem,
} from "../../../utils/formatters";

export function ModalDetalhesItem({ isOpen, onClose, item }) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !item) return null;

  const tipoFormatado = formatarTipoItem(item.tipo);
  const statusFormatado = formatarStatusItem(item.status);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" 
      onClick={onClose}
    >
      <div 
        className="w-full max-w-md rounded-xl bg-surface shadow-xl flex flex-col max-h-[90vh]" 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-border/60 p-6 pb-4">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-2.5 rounded-lg text-primary">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">{item.nome}</h2>
              <span className="text-sm text-muted-foreground font-medium">Cód: {item.id} • {tipoFormatado}</span>
            </div>
          </div>
          <button 
            type="button"
            aria-label="Fechar detalhes"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer p-1 rounded-full hover:bg-accent"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto space-y-6">
          
          <div>
            <h3 className="text-sm font-semibold text-slate-700 mb-2">Descrição</h3>
            <p className="text-sm text-gray-600 leading-relaxed bg-slate-50 p-3 rounded-lg border border-gray-100">
              {item.descricao}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-50 rounded-lg p-3 border border-gray-100 flex flex-col justify-center">
              <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Preço do Aluguel</span>
              <span className="text-lg font-extrabold text-primary">{formatarMoeda(item.precoAluguel)}</span>
            </div>
            
            <div className="bg-slate-50 rounded-lg p-3 border border-gray-100 flex flex-col justify-center">
              <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Status Atual</span>
              <span className="text-sm font-bold text-slate-800">{statusFormatado}</span>
            </div>
          </div>

          {/* Renderização Condicional baseada no Tipo (Polimorfismo Visual) */}
          {item.tipo === "brinquedo" && (
            <div>
              <h3 className="text-sm font-semibold text-slate-700 mb-3 border-b border-gray-100 pb-2">Especificações Técnicas</h3>
              <div className="grid grid-cols-2 gap-4">
                 <div className="flex flex-col">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Dimensões</span>
                    <span className="text-sm font-medium text-slate-700">{item.dimensao || "Não informada"}</span>
                 </div>
                 <div className="flex flex-col">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Capacidade</span>
                    <span className="text-sm font-medium text-slate-700">{item.capacidade ? `${item.capacidade} crianças` : "Não informada"}</span>
                 </div>
              </div>
            </div>
          )}

          {item.tipo === "decoracao" && (
            <div>
              <h3 className="text-sm font-semibold text-slate-700 mb-3 border-b border-gray-100 pb-2">Detalhes da Decoração</h3>
              <div className="flex flex-col">
                 <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Tema</span>
                 <span className="text-sm font-medium text-slate-700">{item.tema || "Não informado"}</span>
              </div>
            </div>
          )}

        </div>
        
        <div className="border-t border-gray-100 p-4 bg-gray-50 rounded-b-xl flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md bg-white border border-gray-300 px-5 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary transition-colors cursor-pointer shadow-sm"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}