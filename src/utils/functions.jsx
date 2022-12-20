export function daysSince(date) {
  return (new Date().getTime() - date.getTime()) / (1000 * 3600 * 24);
}
