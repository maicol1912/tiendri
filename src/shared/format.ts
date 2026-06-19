export function formatPrice(price: number, symbol = "$"): string {
  return `${symbol}${new Intl.NumberFormat("es-CO").format(price)}`;
}

export function formatPriceCurrency(amount: number): string {
  return `$${new Intl.NumberFormat("es-CO", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)}`;
}
