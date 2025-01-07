export function pluralize(string) {
  switch (true) {
    case string.endsWith('s') || string.endsWith('h'):
      return `${string}es`;
    case ['tsp', 'Tbsp', 'oz'].includes(string):
      return string;
    default:
      return `${string}s`;
  }
}