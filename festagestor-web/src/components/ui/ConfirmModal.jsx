export function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirmar ação",
  message = "Tem certeza que deseja continuar?",
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  isDestructive = true,
  isLoading = false,
}) {
  if (!isOpen) return null;

  const classesBaseBotao = "cursor-pointer rounded-md px-4 py-2 text-sm font-semibold text-white transition-colors focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const classesCorBotao = isDestructive
    ? "bg-danger hover:bg-danger/90 focus:ring-danger"
    : "bg-confirmed hover:bg-confirmed/90 focus:ring-confirmed";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="w-full max-w-sm rounded-xl bg-background p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
        <h2 className="mb-2 text-xl font-bold text-foreground">{title}</h2>
        <p className="mb-6 text-sm text-foreground/70">{message}</p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="cursor-pointer rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            disabled={isLoading}
            className={`${classesBaseBotao} ${classesCorBotao}`}
          >
            {isLoading ? "Processando..." : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
