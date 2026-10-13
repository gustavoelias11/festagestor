import { useForm } from "react-hook-form";

export function ModalNovoItem({ isOpen, onClose, onSalvar}) {

    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        defaultValues: {tipo: "brinquedo", status: "DISPONIVEL"}
    });

    const tipoItem = watch("tipo");

    const onSubmit = (dadosDoFormulario) => {
        onSalvar(dadosDoFormulario);
    };

    if(!isOpen) return null;

    return (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={onClose}>
            <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl z-50" onClick={(e) => e.stopPropagation()}>
                <h2 className="mb-4 text-xl font-bold text-slate-800">Novo Item</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                    <div>
                        <label className="mb-1 block text-sm font-semibold text-slate-700">Tipo do Item</label>
                        <select {...register("tipo", { required: "O tipo é obrigatório" })}
                        className="h-10 w-full rounded-md border border-gray-300 px-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary">
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
                        <label className="mb-1 block text-sm font-semibold text-slate-700">Nome do Item</label>
                        <input type="text" {...register("nome", { required: "O nome do item é obrigatório" }) } className="h-10 w-full rounded-md border border-gray-300 px-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"/>
                        {errors.nome && (
                            <span className="text-xs font-semibold text-red-500">
                                {errors.tipo.message}
                            </span>
                        )}
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-semibold text-slate-700">Descrição</label>
                        <input type="text" {...register("descricao", { required: true })} className="h-10 w-full rounded-md border border-gray-300 px-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"/>
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-semibold text-slate-700">Preço</label>
                        <input type="number" placeholder="R$ 0,00" min="0" step="0.01" {...register("precoAluguel", { required: true })} className="h-10 w-full rounded-md border border-gray-300 px-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"/>
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-semibold text-slate-700">Quantidade</label>
                        <input type="number" min="0"{...register("quantidade", { required: true })} className="h-10 w-full rounded-md border border-gray-300 px-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"/>
                    </div>

                    {tipoItem === "brinquedo" && (
                        <div className="space-y-4">
                            <div>
                                <label className="mb-1 block text-sm font-semibold text-slate-700">Capacidade</label>
                                <input type="number" min="0"{...register("capacidade", { required: true })} className="h-10 w-full rounded-md border border-gray-300 px-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"/>
                            </div>
                            <div>
                                <label className="mb-1 block text-sm font-semibold text-slate-700">Dimensão</label>
                                <input type="text" {...register("dimensao", { required: true })} className="h-10 w-full rounded-md border border-gray-300 px-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"/>
                            </div>
                            
                        </div>
                    )}
                    {tipoItem === "decoracao" && (
                        <div className="space-y-4">
                            <div>
                                <label className="mb-1 block text-sm font-semibold text-slate-700">Tema</label>
                                <input type="text" {...register("tema", { required: true })} className="h-10 w-full rounded-md border border-gray-300 px-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"/>
                            </div>
                        </div>
                    )}
                        
                    <div className="mt-6 flex justify-end gap-3 border-t border-gray-100 pt-4">
                        <button type="button"
                        onClick={onClose}
                        className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400">
                            Cancelar
                        </button>
                        <button type="submit"
                        className="rounded-md bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-red-500">
                            Confirmar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}