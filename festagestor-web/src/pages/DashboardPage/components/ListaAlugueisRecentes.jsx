import { formatarMoeda } from "../../../utils/formatters";

export function ListaAlugueisRecentes({ alugueis, loading, onAluguelClick }) {
  const getBadgeStyle = (status) => {
    switch (status) {
      case "PENDENTE":
        return "bg-warning text-white border-transparent";
      case "CONFIRMADO":
        return "bg-confirmed text-white border-transparent";
      case "MONTADO":
        return "bg-primary text-white border-transparent";
      case "FINALIZADO":
        return "bg-success text-white border-transparent";
      case "CANCELADO":
        return "bg-danger text-white border-transparent";
      default:
        return "bg-gray-200 text-foreground border-transparent";
    }
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="flex flex-col space-y-1.5 p-6 border-b border-gray-100">
        <h3 className="font-semibold leading-none tracking-tight text-lg text-foreground">
          Aluguéis Recentes
        </h3>
        <p className="text-sm text-gray-500 pt-1">
          Os aluguéis mais recentes. Clique para gerenciar o status.
        </p>
      </div>

      <div className="p-6 pt-4">
        <div className="space-y-4">
          {loading && (
            <p className="text-center text-gray-500 py-4">
              Buscando dados no Spring Boot...
            </p>
          )}
          {!loading && alugueis.length === 0 && (
            <p className="text-center text-gray-500 py-4">
              Nenhum aluguel encontrado.
            </p>
          )}

          {!loading &&
            alugueis.map((aluguel) => (
              <button
                key={aluguel.id}
                onClick={() => onAluguelClick(aluguel)}
                className="w-full grid grid-cols-1 gap-4 text-left p-4 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 transition-colors cursor-pointer md:grid-cols-[minmax(0,1.35fr)_minmax(220px,1fr)_auto] md:items-center"
              >
                {/* COLUNA 1: NOME DO CLIENTE E ITENS (Você já fez isso e está perfeito!) */}
                <div className="flex min-w-0 flex-col">
                  <span className="truncate font-semibold text-foreground">
                    {aluguel.nomeCliente}
                  </span>
                  <span className="truncate text-sm text-gray-500 mt-1">
                    {aluguel.itens && aluguel.itens.length > 0
                      ? aluguel.itens.map((item) => item.nomeItem).join(" - ")
                      : "Sem Itens"}
                  </span>
                </div>

                {/* COLUNA 2: VALOR E ENDEREÇO (Aqui é a sua vez!) */}
                <div className="flex min-w-0 flex-col gap-2 md:border-l md:pl-5 border-gray-100">
                  {/* Bloco do Valor */}
                  <div className="flex items-center gap-2">
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
                      className="h-4 w-4 shrink-0 text-success"
                    >
                      <rect width="20" height="12" x="2" y="6" rx="2"></rect>
                      <circle cx="12" cy="12" r="2"></circle>
                      <path d="M6 12h.01M18 12h.01"></path>
                    </svg>
                    <span className="font-bold text-foreground">
                      {formatarMoeda(aluguel.valorTotal)}
                    </span>
                  </div>

                  {/* Bloco do Endereço */}
                  <div className="flex min-w-0 items-start gap-2 text-sm text-gray-500">
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
                      className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                    >
                      <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    <span className="line-clamp-2 wrap-break-word">
                      {`${aluguel.endereco.logradouro}, ${aluguel.endereco.numero} - ${aluguel.endereco.uf}`}
                    </span>
                  </div>
                </div>

                {/* COLUNA 3: DATA E STATUS */}
                <div className="flex items-center justify-between gap-3 md:flex-col md:items-end">
                  <span className="text-sm font-medium">
                    {new Date(aluguel.dataEntrega).toLocaleDateString("pt-BR")}
                  </span>
                  <span
                    className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${getBadgeStyle(aluguel.status)}`}
                  >
                    {aluguel.status}
                  </span>
                </div>
              </button>
            ))}
        </div>
      </div>
    </div>
  );
}
