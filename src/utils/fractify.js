export function fractify(double) {
  const whole = Math.floor(double);
  const remainder = double - whole;
  
  switch (true) {
    case remainder === 0:
      return { whole, fraction: '' };
    case remainder === 0.125:
      return { whole, fraction: '⅛' };
    case remainder === 0.25:
      return { whole, fraction: '¼' };
    case remainder > 0.3 && remainder < 0.38:
      return { whole, fraction: '⅓' };
    case remainder === 0.375:
      return { whole, fraction: '⅜' };
    case remainder === 0.5:
      return { whole, fraction: '½' };
    case remainder === 0.625:
      return { whole, fraction: '⅝' };
    case remainder > 0.65 && remainder < 0.69:
      return { whole, fraction: '⅔' };
    case remainder === 0.75:
      return { whole, fraction: '¾' };
    case remainder === 0.875:
      return { whole, fraction: '⅞' };
    default:
      return { whole, fraction: remainder.toFixed(2) };
  }
}
