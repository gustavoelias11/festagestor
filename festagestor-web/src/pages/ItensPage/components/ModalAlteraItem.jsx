import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { formatarMoeda, mascararMoeda } from "../../../utils/formatters";

export function ModalAlteraItem({ isOpen, onClose, itemSelecionado, onSalvar, errosBackend }) {
    const { register, handleSubmit, control, formState: { errors, isValid }, reset } = useForm({
        mode: "onChange",
    });

    useEffect(() => {
        if(isOpen && itemSelecionado) {

          const precoFormatado = formatarMoeda(itemSelecionado.precoAluguel)

            reset({
                nome: itemSelecionado.nome,
                descricao: itemSelecionado.descricao,
                precoAluguel: precoFormatado,
                status: itemSelecionado.status,
                capacidade: itemSelecionado?.capacidade,
                dimensao: itemSelecionado?.dimensao,
                tema: itemSelecionado?.tema
            });
        }
    }, [isOpen, itemSelecionado, reset]);

  const tipoItem = itemSelecionado?.tipo;

    const prepararEnvio = (dados) => {
      const precoSujo = dados.precoAluguel ?? "";
      const precoLimpo = Number(precoSujo.replace(/\D/g, "")) / 100;
        const payload = { id: itemSelecionado.id, tipo: itemSelecionado.tipo, ...dados, precoAluguel: precoLimpo,};
        onSalvar(payload);
    };

    if(!isOpen) return null;

    return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl z-50" onClick={(e) => e.stopPropagation()}>
        <h2 className="mb-4 text-xl font-bold text-slate-800">Alterar Item</h2>
        
        {errosBackend && (
          <div className="mb-4 rounded-md bg-red-50 p-4 border border-red-200">
             <span className="text-sm font-bold text-red-800">Erros encontrados:</span>
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
            {errors.tipo && (
              <span className="text-xs font-semibold text-red-500">
                {errors.tipo.message}
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
                    valueAsNumber: true,
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
              className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400 cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={!isValid}
              className={`rounded-md px-4 py-2 text-sm font-semibold text-white focus:outline-none focus:ring-2 transition-colors cursor-pointer ${
                isValid ? "bg-primary hover:bg-primary/90 focus:ring-primary" : "bg-gray-400 hover:bg-gray-400 focus:ring-gray-400"
              }`}
            >
              Salvar Alterações
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}