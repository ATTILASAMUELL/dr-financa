export function formatCurrency(value: string): string {
  const numbers = value.replace(/\D/g, '');
  
  if (!numbers) return '';
  
  const cents = numbers.slice(-2);
  const reais = numbers.slice(0, -2) || '0';
  
  const reaisFormatted = reais.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  
  return `R$ ${reaisFormatted},${cents.padStart(2, '0')}`;
}

export function parseCurrency(value: string): number {
  const numbers = value.replace(/\D/g, '');
  
  if (!numbers) return 0;
  
  const numericValue = parseFloat(numbers) / 100;
  return Math.round(numericValue * 100) / 100;
}

export function formatCurrencyInput(value: string): string {
  const numbers = value.replace(/\D/g, '');
  
  if (!numbers) return '';
  
  if (numbers.length === 1) {
    return `R$ 0,0${numbers}`;
  }
  
  if (numbers.length === 2) {
    return `R$ 0,${numbers}`;
  }
  
  const cents = numbers.slice(-2);
  const reais = numbers.slice(0, -2);
  
  if (!reais) {
    return `R$ 0,${cents}`;
  }
  
  const reaisFormatted = reais.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  
  return `R$ ${reaisFormatted},${cents}`;
}

export function handleCurrencyInput(event: Event): string {
  const input = event.target as HTMLInputElement;
  const value = input.value;
  
  const numbers = value.replace(/\D/g, '');
  
  if (!numbers) {
    return '';
  }
  
  return formatCurrencyInput(numbers);
}

