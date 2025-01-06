export function pluralize(string) {
  switch (true) {
    case string.endsWith('s' || 'h'):
      return `${string}es`;
    case ['tsp', 'Tbsp', 'oz'].includes(string):
      return string;
    default:
      return `${string}s`;
  }
}