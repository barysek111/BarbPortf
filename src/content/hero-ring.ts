// Images shown on the hero ring. Cards are portrait (7:10) and use object-fit
// cover, so landscape sources crop to their centre.
export const heroRing = Array.from({ length: 14 }, (_, i) => {
  const n = String(i + 1).padStart(2, "0");
  const ext = n === "03" || n === "04" ? "png" : n === "09" ? "svg" : "jpg";
  return { src: `/images/hero/ring-${n}.${ext}`, alt: "" };
});
