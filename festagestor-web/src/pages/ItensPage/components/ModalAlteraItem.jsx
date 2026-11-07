import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";

export function ModalAlteraItem({ isOpen, onClose, itemSelecionado, onSalvar, errosBackend }) {
    const { register, handleSubmit, control, formState: { errors, isValid }, reset } = useForm({
        mode: "onChange",
    });

    useEffect(() => {
        if(isOpen && itemSelecionado) {
            reset({
                nome: itemSelecionado.nome,
                descricao: itemSelecionado.descricao
            });
        }
    }, [isOpen, itemSelecionado, reset]);

    const prepararEnvio = (dados) => {
        const payload = { id: itemSelecionado.id, tipo: itemSelecionado.tipo, ...dados};
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
             {/* Lógica de renderização de erros se mantém */}
          </div>
        )}

        <form onSubmit={handleSubmit(prepararEnvio)} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-semibold text-slate-700">Nome do Item</label>
            <input
              type="text"
              {...register("nome", { required: "O nome é obrigatório!" })}
              className="h-10 w-full rounded-md border border-gray-300 px-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold text-slate-700">Descrição</label>
            <input
              type="text"
              {...register("descricao", { required: "A descrição é obrigatória!" })}
              className="h-10 w-full rounded-md border border-gray-300 px-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          {/* Demais campos de formulário (Preço, etc.) entram aqui usando o mesmo padrão de estilização */}

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