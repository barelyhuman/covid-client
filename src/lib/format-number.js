export const formatNumber = (value)=>new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(value);
