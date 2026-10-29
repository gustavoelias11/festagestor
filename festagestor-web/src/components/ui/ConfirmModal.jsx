export function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirmar ação",
  message = "Tem certeza que deseja continuar?",
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  isDestructive = true, // Se true, o botão de confirmar fica vermelho
}) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="mb-2 text-xl font-bold text-slate-800">{title}</h2>
        <p className="mb-6 text-sm text-slate-600">{message}</p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400 cursor-pointer"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className={`rounded-md px-4 py-2 text-sm font-semibold text-white focus:outline-none focus:ring-2 transition-colors cursor-pointer ${
              isDestructive
                ? "bg-red-600 hover:bg-red-700 focus:ring-red-500"
                : "bg-primary hover:bg-primary/90 focus:ring-primary"
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
