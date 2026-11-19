export function formatarMoeda(valor) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(valor);
}

export function mascararMoeda(valorDigitado) {
  if (!valorDigitado) return "";

  const apenasNumeros = valorDigitado.replace(/\D/g, "");
  const valorDecimal = Number(apenasNumeros) / 100;

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(valorDecimal);
}

const LABELS_TIPO_ITEM = {
  brinquedo: "Brinquedo",
  decoracao: "Decoração",
};

const LABELS_STATUS_ITEM = {
  DISPONIVEL: "Disponível",
  ALUGADO: "Alugado",
  MANUTENCAO: "Manutenção",
};

export function formatarTipoItem(tipo) {
  if (!tipo) return "Não definido";
  return LABELS_TIPO_ITEM[tipo.toLowerCase()] ?? tipo.charAt(0).toUpperCase() + tipo.slice(1);
}

export function formatarStatusItem(status) {
  if (!status) return "Não definido";
  return LABELS_STATUS_ITEM[status.toUpperCase()] ?? status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
}