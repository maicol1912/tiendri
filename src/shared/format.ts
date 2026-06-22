export function formatPrice(price: number, symbol = "$"): string {
  return `${symbol}${new Intl.NumberFormat("es-CO").format(price)}`;
}
