export function formatarMoeda(valor) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(valor);
}

export function ItemCard({ item, onEditar, onExcluir }) {
  const tipoFormatado = item.tipo
    ? item.tipo.charAt(0).toUpperCase() + item.tipo.slice(1)
    : "Não definido";

  const statusFormatado = item.status
    ? item.status.charAt(0).toUpperCase() + item.status.slice(1).toLowerCase()
    : "Não definido";

  return (
    <div className="rounded-xl border border-gray-200 bg-white text-slate-900 shadow-sm hover:shadow-md transition-shadow">
      <div
        data-replit-metadata="artifacts/festa-gestor/src/components/ui/card.tsx:59:2"
        data-component-name="div"
        className="p-5"
      >
        <div className="flex justify-between items-start mb-4">
          <div className="bg-primary/10 p-2.5 rounded-lg text-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-package w-5 h-5"
              aria-hidden="true"
            >
              <path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z"></path>
              <path d="M12 22V12"></path>
              <polyline points="3.29 7 12 12 20.71 7"></polyline>
              <path d="m7.5 4.27 9 5.15"></path>
            </svg>
          </div>
          <div
            data-replit-metadata="artifacts/festa-gestor/src/components/ui/badge.tsx:34:4"
            data-component-name="div"
            className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-[#10B981] text-white"
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
              data-replit-metadata="artifacts/festa-gestor/src/components/ui/button.tsx:46:6"
              data-component-name="Comp"
              onClick={() => onEditar(item.id)}
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-9 w-9"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-pen w-4 h-4 text-muted-foreground"
                aria-hidden="true"
              >
                <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"></path>
              </svg>
            </button>
            <button
              data-replit-metadata="artifacts/festa-gestor/src/components/ui/button.tsx:46:6"
              data-component-name="Comp"
              onClick={() => onExcluir(item.id)}
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-9 w-9"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-trash2 lucide-trash-2 w-4 h-4 text-destructive"
                aria-hidden="true"
              >
                <path d="M10 11v6"></path>
                <path d="M14 11v6"></path>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"></path>
                <path d="M3 6h18"></path>
                <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
