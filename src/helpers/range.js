export function range(start = 0, end) {
  const items = [];

  for (let i = start; i <= end; i++) {
    items.push(i);
  }

  return items;
}
