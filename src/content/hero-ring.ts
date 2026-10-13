// Images shown on the hero ring. Hero crops these to portrait. Hero2 uses `w` and `h`
// so each card keeps the file's own ratio.
const SIZES = [
  [1061, 1500],
  [1154, 1154],
  [1462, 1458],
  [1408, 1434],
  [941, 1123],
  [2384, 2383],
  [1036, 1352],
  [1009, 1310],
  [560, 560],
  [787, 1070],
  [787, 1009],
  [787, 787],
  [1292, 1720],
  [946, 1147],
] as const;

export const heroRing = SIZES.map(([w, h], i) => {
  const n = String(i + 1).padStart(2, "0");
  const ext = n === "03" || n === "04" ? "png" : n === "09" ? "svg" : "jpg";
  return { src: `/images/hero/ring-${n}.${ext}`, alt: "", w, h };
});
