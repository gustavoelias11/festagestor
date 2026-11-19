import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Loader2, X } from "lucide-react";
import { formatarMoeda, mascararMoeda } from "../../../utils/formatters";

function normalizarErrosBackend(errosBackend) {
  if (!errosBackend) return [];
  if (Array.isArray(errosBackend)) {
    return errosBackend.map((erro, index) => ({
      id: erro.campo ?? index,
      texto: erro.campo ? `O campo ${erro.campo}: ${erro.mensagem}` : String(erro.mensagem ?? erro),
    }));
  }
  if (typeof errosBackend === "object" && errosBackend.mensagem) {
    return [{ id: "mensagem", texto: errosBackend.mensagem }];
  }
  return [{ id: "erro", texto: String(errosBackend) }];
}

export function ModalAlteraItem({
  isOpen,
  onClose,
  itemSelecionado,
  onSalvar,
  errosBackend,
  isSubmitting = false,
}) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
    reset,
  } = useForm({
    mode: "onChange",
  });

  useEffect(() => {
    if (isOpen && itemSelecionado) {
      const precoFormatado = formatarMoeda(itemSelecionado.precoAluguel);

      reset({
        nome: itemSelecionado.nome,
        descricao: itemSelecionado.descricao,
        precoAluguel: precoFormatado,
        status: itemSelecionado.status,
        capacidade: itemSelecionado?.capacidade,
        dimensao: itemSelecionado?.dimensao,
        tema: itemSelecionado?.tema,
      });
    }
  }, [isOpen, itemSelecionado, reset]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && !isSubmitting) onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isSubmitting, onClose]);

  const tipoItem = itemSelecionado?.tipo;

  const prepararEnvio = (dados) => {
    const precoSujo = dados.precoAluguel ?? "";
    const precoLimpo = Number(precoSujo.replace(/\D/g, "")) / 100;
    const payload = {
      id: itemSelecionado.id,
      tipo: itemSelecionado.tipo,
      ...dados,
      precoAluguel: precoLimpo,
    };
    onSalvar(payload);
  };

  if (!isOpen) return null;

  const listaErrosBackend = normalizarErrosBackend(errosBackend);

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={() => !isSubmitting && onClose()}
    >
      <div
        className="w-full max-w-md rounded-xl bg-surface p-6 shadow-xl z-50 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-foreground">Alterar Item</h2>
          <button
            type="button"
            aria-label="Fechar modal"
            disabled={isSubmitting}
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer p-1 rounded-full hover:bg-accent disabled:opacity-50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {listaErrosBackend.length > 0 && (
          <div
            role="alert"
            className="mb-4 rounded-md bg-danger/10 p-4 border border-danger/20"
          >
            <h3 className="text-sm font-bold text-danger">
              Não foi possível atualizar o item:
            </h3>
            <ul className="mt-2 text-sm text-danger list-disc list-inside space-y-1">
              {listaErrosBackend.map((erro) => (
                <li key={erro.id}>{erro.texto}</li>
              ))}
            </ul>
          </div>
        )}

        <form onSubmit={handleSubmit(prepararEnvio)} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-semibold text-slate-700">
              Nome do Item
            </label>
            <input
              type="text"
              {...register("nome", {
                required: "O nome do item é obrigatório!",
              })}
              className="h-10 w-full rounded-md border border-gray-300 px-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
            {errors.nome && (
              <span className="text-xs font-semibold text-red-500">
                {errors.nome.message}
              </span>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold text-slate-700">
              Descrição
            </label>
            <input
              type="text"
              {...register("descricao", {
                required: "A descrição é obrigatória!",
              })}
              className="h-10 w-full rounded-md border border-gray-300 px-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
            {errors.descricao && (
              <span className="text-xs font-semibold text-red-500">
                {errors.descricao.message}
              </span>
            )}
          </div>

            <div>
            <label className="mb-1 block text-sm font-semibold text-slate-700">
              Preço
            </label>
            <Controller
              name="precoAluguel"
              control={control}
              defaultValue=""
              rules={{
                required: "O preço é obrigatório!",
                validate: (valorAtual) => {
                  const apenasNumeros = (valorAtual ?? "").replace(/\D/g, "");
                  return (
                    Number(apenasNumeros) > 0 ||
                    "O preço deve ser maior que zero!"
                  );
                },
              }}
              render={({ field: { onChange, value } }) => (
                <input
                  type="text"
                  placeholder="R$ 0,00"
                  className="h-10 w-full rounded-md border border-gray-300 px-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  value={value}
                  onChange={(e) => {
                    const valorCru = e.target.value;
                    const valorFormatado = mascararMoeda(valorCru);
                    onChange(valorFormatado);
                  }}
                />
              )}
            />
            {errors.precoAluguel && (
              <span className="text-xs font-semibold text-red-500">
                {errors.precoAluguel.message}
              </span>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold text-slate-700">
              Status
            </label>
            <select
              {...register("status", { required: "O status é obrigatório" })}
              className="h-10 w-full rounded-md border border-gray-300 px-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
            >
              <option value="DISPONIVEL">Disponível</option>
              <option value="ALUGADO">Alugado</option>
              <option value="MANUTENCAO">Manutenção</option>
            </select>
            {errors.status && (
              <span className="text-xs font-semibold text-danger">
                {errors.status.message}
              </span>
            )}
          </div>

          {tipoItem === "brinquedo" && (
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-semibold text-foreground/80">
                  Capacidade
                </label>
                <input
                  type="number"
                  min="1"
                  {...register("capacidade", {
                    required: "A capacidade é obrigatória!",
                    valueAsNumber: true,
                    min: {
                      value: 1,
                      message: "A capacidade deve ser maior que zero!",
                    },
                    validate: (v) =>
                      !Number.isNaN(v) || "Informe uma capacidade válida!",
                  })}
                  className="h-10 w-full rounded-md border border-input px-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
                {errors.capacidade && (
                  <span className="text-xs font-semibold text-danger">
                    {errors.capacidade.message}
                  </span>
                )}
              </div>
              <div>
                <label className="mb-1 block text-sm font-semibold text-foreground/80">
                  Dimensão
                </label>
                <input
                  type="text"
                  {...register("dimensao", {
                    required: "A dimensão é obrigatória!",
                  })}
                  className="h-10 w-full rounded-md border border-input px-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
                {errors.dimensao && (
                  <span className="text-xs font-semibold text-danger">
                    {errors.dimensao.message}
                  </span>
                )}
              </div>
            </div>
          )}

          {tipoItem === "decoracao" && (
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-semibold text-foreground/80">
                  Tema
                </label>
                <input
                  type="text"
                  {...register("tema", { required: "O tema é obrigatório!" })}
                  className="h-10 w-full rounded-md border border-input px-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
                {errors.tema && (
                  <span className="text-xs font-semibold text-danger">
                    {errors.tema.message}
                  </span>
                )}
              </div>
            </div>
          )}

          <div className="mt-6 flex justify-end gap-3 border-t border-border/60 pt-4">
            <button
              type="button"
              disabled={isSubmitting}
              onClick={onClose}
              className="rounded-md border border-input bg-surface px-4 py-2 text-sm font-semibold text-foreground/80 hover:bg-accent focus:outline-none focus:ring-2 focus:ring-input cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={!isValid || isSubmitting}
              className={`inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-semibold text-white focus:outline-none focus:ring-2 transition-colors ${
                isValid && !isSubmitting
                  ? "bg-primary hover:bg-primary/90 focus:ring-primary cursor-pointer"
                  : "bg-muted-foreground/50 cursor-not-allowed"
              }`}
            >
              {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
              {isSubmitting ? "Salvando..." : "Salvar Alterações"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}