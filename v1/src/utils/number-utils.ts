export function lerp(start: number, end: number, alpha: number) {
  return start * (1 - alpha) + end * alpha
}
