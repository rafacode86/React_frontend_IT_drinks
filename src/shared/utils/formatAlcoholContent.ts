export function formatAlcoholContent(value: number | null | undefined) {
  if (value === null || value === undefined) {
    return "0%";
  }

  return `${Number(value).toFixed(2)}%`;
}
