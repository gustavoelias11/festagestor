import { formatarMoeda } from "../../../utils/formatters";
import { Package, Pen, Trash2 } from "lucide-react";

export function ItemCard({ item, onEditar, onExcluir, onDetalhe }) {
  const tipoFormatado = item.tipo
    ? item.tipo.charAt(0).toUpperCase() + item.tipo.slice(1)
    : "Não definido";

  const statusFormatado = item.status
    ? item.status.charAt(0).toUpperCase() + item.status.slice(1).toLowerCase()
    : "Não definido";

    const getBadgeStyle = (status) => {
    switch (status) {
      case "DISPONIVEL":
        return "bg-confirmed text-white border-transparent";
      case "ALUGADO":
        return "bg-primary text-white border-transparent";
      case "MANUTENCAO":
        return "bg-danger text-white border-transparent";
      default:
        return "bg-gray-200 text-foreground border-transparent";
    }
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white text-slate-900 shadow-sm hover:shadow-md transition-shadow cursor-pointer" onClick={() => onDetalhe(item)}>
      <div
        className="p-5"
      >
        <div className="flex justify-between items-start mb-4">
          <div className="bg-primary/10 p-2.5 rounded-lg text-primary">
            <Package className="w-5 h-5" />
          </div>
          <div
            className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${getBadgeStyle(item.status)}`}
          >
            {statusFormatado}
          </div>
        </div>
        <h3 className="font-semibold text-lg leading-tight mb-1">
          {item.nome}
        </h3>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <span>{tipoFormatado}</span>
          <span className="w-1 h-1 rounded-full bg-gray-300"></span>
          <span>Cód: {item.id}</span>
        </div>
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
          <div>
            <p className="font-bold text-primary">
              {formatarMoeda(item.precoAluguel)}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={(e) =>  {
                e.stopPropagation();
                onEditar(item.id)}}
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9 hover:scale-105 transition-all duration-200"
            >
              <Pen className="w-4 h-4 text-muted-foreground cursor-pointer" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onExcluir(item.id)}}
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9 hover:scale-105 transition-all duration-200"
            >
              <Trash2 className="w-4 h-4 text-destructive cursor-pointer" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
