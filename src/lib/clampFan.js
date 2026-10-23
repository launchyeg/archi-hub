const HALF_W = 234 + 16;
const HALF_H = 109 + 16;

const clamp = (v, lo, hi) =>
  lo > hi ? (lo + hi) / 2 : Math.min(Math.max(v, lo), hi);

export default function clampFan(px, py) {
  return [
    clamp(px, HALF_W, window.innerWidth - HALF_W),
    clamp(py, HALF_H, window.innerHeight - HALF_H),
  ];
}
