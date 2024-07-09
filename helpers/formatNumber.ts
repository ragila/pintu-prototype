export function formatNumber(number?: number): string {
    if (number && number < 0.001 && number !== 0) {
      return number.toFixed(7).replace('.', ',');
    } else {
        return new Intl.NumberFormat("de-DE").format(number);
    }
  }