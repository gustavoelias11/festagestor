export function formatarMoeda(valor) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(valor);
};

export function mascararMoeda (valorDigitado) {
    if (!valorDigitado) return "";

    const apenasNumeros = valorDigitado.replace(/\D/g, "");
    const valorDecimal = Number(apenasNumeros) / 100;

    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(valorDecimal);
  };