import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";

export function ModalNovoItem({ isOpen, onClose, onSalvar, errosBackend }) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
    reset,
  } = useForm({
    defaultValues: { tipo: "brinquedo", status: "DISPONIVEL" },
    mode: "onChange",
  });

  useEffect(() => {
    if (isOpen) {
      reset();
    }
  }, [isOpen, reset]);

  const tipoItem = useWatch({
    control,
    name: "tipo",
    defaultValue: "brinquedo"
  });

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl z-50"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="mb-4 text-xl font-bold text-slate-800">Novo Item</h2>

        {errosBackend && (
          <div className="mb-4 rounded-md bg-red-50 p-4 border border-red-200">
            <h3 className="text-sm font-bold text-red-800">
              Foram encontrados os seguintes erros:
            </h3>
            <ul className="mt-2 text-sm text-red-700 list-disc list-inside">
              {errosBackend.map((erro) => (
                <li key={erro.campo}>
                  O campo <strong>{erro.campo}</strong> {erro.mensagem}
                </li>
              ))}
            </ul>
          </div>
        )}

        <form onSubmit={handleSubmit(onSalvar)} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-semibold text-slate-700">
              Tipo do Item
            </label>
            <select
              {...register("tipo", { required: "O tipo é obrigatório" })}
              className="h-10 w-full rounded-md border border-gray-300 px-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="brinquedo">Brinquedo</option>
              <option value="decoracao">Decoração</option>
            </select>
            {errors.tipo && (
              <span className="text-xs font-semibold text-red-500">
                {errors.tipo.message}
              </span>
            )}
          </div>

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
            <input
              type="number"
              placeholder="R$ 0,00"
              min="0"
              step="0.01"
              {...register("precoAluguel", {
                required: "O preço é obrigatório!",
              })}
              className="h-10 w-full rounded-md border border-gray-300 px-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
            {errors.precoAluguel && (
              <span className="text-xs font-semibold text-red-500">
                {errors.precoAluguel.message}
              </span>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold text-slate-700">
              Quantidade
            </label>
            <input
              type="number"
              min="0"
              {...register("quantidade", {
                required: "A quantidade é obrigatória!",
              })}
              className="h-10 w-full rounded-md border border-gray-300 px-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
            {errors.quantidade && (
              <span className="text-xs font-semibold text-red-500">
                {errors.quantidade.message}
              </span>
            )}
          </div>

          {tipoItem === "brinquedo" && (
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-semibold text-slate-700">
                  Capacidade
                </label>
                <input
                  type="number"
                  min="0"
                  {...register("capacidade", {
                    required: "A capacidade é obrigatória!",
                  })}
                  className="h-10 w-full rounded-md border border-gray-300 px-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
                {errors.capacidade && (
                  <span className="text-xs font-semibold text-red-500">
                    {errors.capacidade.message}
                  </span>
                )}
              </div>
              <div>
                <label className="mb-1 block text-sm font-semibold text-slate-700">
                  Dimensão
                </label>
                <input
                  type="text"
                  {...register("dimensao", {
                    required: "A dimensão é obrigatória!",
                  })}
                  className="h-10 w-full rounded-md border border-gray-300 px-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
                {errors.dimensao && (
                  <span className="text-xs font-semibold text-red-500">
                    {errors.dimensao.message}
                  </span>
                )}
              </div>
            </div>
          )}
          {tipoItem === "decoracao" && (
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-semibold text-slate-700">
                  Tema
                </label>
                <input
                  type="text"
                  {...register("tema", { required: "O tema é obrigatório!" })}
                  className="h-10 w-full rounded-md border border-gray-300 px-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
                {errors.tema && (
                  <span className="text-xs font-semibold text-red-500">
                    {errors.tema.message}
                  </span>
                )}
              </div>
            </div>
          )}

          <div className="mt-6 flex justify-end gap-3 border-t border-gray-100 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className={`rounded-md px-4 py-2 text-sm font-semibold text-white focus:outline-none focus:ring-2 transition-colors ${
                isValid
                  ? "bg-green-600 hover:bg-green-700 focus:ring-green-500"
                  : "bg-gray-400 hover:bg-gray-400 focus:ring-gray-400"
              }`}
            >
              Confirmar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}