export type Thumb = { src: string; w: 160 | 320 };

export type Project = {
  slug: string;
  title: string;
  description: string;
  client: string;
  services: string;
  year: string;
  location: string;
  image: string;
  imageH: number;
  listImages: Thumb[];
  nextSlug: string;
  masonryY: number;
};

function t(file: string, w: 160 | 320 = 160): Thumb {
  return { src: `/images/framer/${file}`, w };
}

export const projects: Project[] = [
  {
    slug: "chronicae",
    title: "Chronicae",
    description:
      "Nopal Tech, a sustainable agriculture SaaS startup, needed a future forward brand identity. I designed a clean, modern logo, visual system for presentations and pitch decks, and website assets that helped position them as leaders in their field. All projects and visuals featured in this template are original work by TITARVL.",
    client: "Chronicae",
    services: "Web Design & Development",
    year: "2025",
    location: "New York, USA",
    image: "/images/framer/eV7DmsCpCxcVjBfbIsfwuyEHp30-c6346875.avif",
    imageH: 465,
    masonryY: 93,
    listImages: [
      t("juQcNT8fVs5vnYQws7sXwdHTQ5s-b4bdf203.avif"),
      t("ng7XAKyPSWJcOwaKzkGFa3qStuc-ca4ec0b2.avif"),
      t("5zVz2C2HHZxTWqSgzA09ucebg0o-c5e6b315.avif", 320),
      t("eV7DmsCpCxcVjBfbIsfwuyEHp30-c6346875.avif"),
    ],
    nextSlug: "palmira",
  },
  {
    slug: "arcane-studio",
    title: "Arcane Studio",
    description:
      "A design-led e-commerce website concept presenting furniture objects through clean grids, typographic restraint, and an editorial visual system. All projects and visuals featured in this template are original work by TITARVL.",
    client: "Arcane Studio",
    services: "Web Design & Development",
    year: "2025",
    location: "London, United Kingdom",
    image: "/images/framer/zMaNUF45eJ6XLGOpxRNcVZ7K8EY-6b409a74.avif",
    imageH: 465,
    masonryY: 93,
    listImages: [
      t("Nda9lE6a3cUZNY91AbeaoYoYNyQ-6b731e0b.avif"),
      t("zMaNUF45eJ6XLGOpxRNcVZ7K8EY-6b409a74.avif"),
      t("Iy1QvcioDnEx2yZn4QTGzlDH1gI-22c14018.avif", 320),
      t("MdGX7ATfz8E3ZqFdB4O7LJgVzc4-1f74b3dc.avif"),
    ],
    nextSlug: "chronicae",
  },
  {
    slug: "solara",
    title: "Solara",
    description:
      "An e-commerce website concept focused on curated product presentation, clean layouts, and an editorial approach to online shopping. All projects and visuals featured in this template are original work by TITARVL.",
    client: "Solara",
    services: "Web Design & Development",
    year: "2025",
    location: "Paris, France",
    image: "/images/framer/QD2AxA7bZdiagkNhpHtgD6IuDIo-0f8ca57f.avif",
    imageH: 233,
    masonryY: 326,
    listImages: [
      t("O7ToMbwrW2Kyojg6kIITlM4Cs-b1efb23d.avif"),
      t("nZVIc7KvsqiOi1p5VDtfGUs53EA-e8994ee4.avif"),
      t("QD2AxA7bZdiagkNhpHtgD6IuDIo-0f8ca57f.avif", 320),
      t("WOv4aT65QQRc6hd00IUOfs-ffa1fa37.avif"),
    ],
    nextSlug: "arcane-studio",
  },
  {
    slug: "edifier-magazine",
    title: "EDIFIER® MAGAZINE",
    description:
      "A product-focused magazine concept for Edifier, exploring editorial layout, typography, and visual hierarchy to present audio products in a clean and structured way, balancing clarity with strong visual rhythm. All projects and visuals featured in this template are original work by TITARVL.",
    client: "EDIFIER",
    services: "Brand Guidelines",
    year: "2025",
    location: "Hong Kong, China",
    image: "/images/framer/eIYpwzIIKlLenHbGloUIRouSd20-6d33a4eb.avif",
    imageH: 255,
    masonryY: 303,
    listImages: [
      t("kJo4XEOp59BVUVZ3mR1munjqoY-9071c118.avif"),
      t("GxcDtdUtRhgBB9yuY24MRje9ugA-8e0e90d9.avif"),
      t("Qd1bbuMOn0n4ztKbpRMM0eXqhmc-2d623765.avif", 320),
      t("iHtGGLUNZwqKJXsyDPMZkVGK3k0-25dc8e6e.avif"),
    ],
    nextSlug: "solara",
  },
  {
    slug: "rowan-keats",
    title: "Rowan Keats",
    description:
      "A website concept designed for filmmakers, focused on visual storytelling, immersive layouts, and a cinematic presentation of video projects. Built to highlight motion, mood, and narrative. All projects and visuals featured in this template are original work by TITARVL.",
    client: "Rowan Keats",
    services: "Web Design & Development",
    year: "2025",
    location: "Berlin, Germany",
    image: "/images/framer/hPXWoQw7Ll99OWvLutJqrXCmIY-e11bbca1.avif",
    imageH: 558,
    masonryY: 0,
    listImages: [
      t("Oa1rOrCzFWUWYiD2leceHmn1OGQ-2e3119fe.avif"),
      t("s2Nbxq1u4TpT8tIlK3bZ8bTwAw-ccd94a6d.avif"),
      t("zl0gXOfoqxF9qGNzfxMWWxAzk-3250d973.avif", 320),
      t("KAXuKXvZA3QfwyDeQuuUrpRa6Q-f319b9b6.avif"),
    ],
    nextSlug: "edifier-magazine",
  },
  {
    slug: "big-baby-tape-magazine",
    title: "BIG BABY TAPE® MAGAZINE",
    description:
      "A non-commercial magazine design inspired by Big Baby Tape, focused on bold typography and expressive layouts. This project was created as a personal exploration of editorial design and visual storytelling, fully designed in Photoshop. All projects and visuals featured in this template are original work by TITARVL.",
    client: "BIG BABY TAPE",
    services: "Graphic Design",
    year: "2024",
    location: "Moscow, Russia",
    image: "/images/framer/5NEEjSQ0PuvND1uGYPf8ebBLVg-7e1dab10.avif",
    imageH: 372,
    masonryY: 800,
    listImages: [
      t("8lIAg0mdPkShxAY2lEaVwSDy6O0-d84ab3f8.avif"),
      t("AhNA3HTl5BLdOfuOQjgJI8oMwE-73290972.avif"),
      t("yLQE0jZWq0VK6RWJTsgWtMxszo-165c2bb6.avif", 320),
      t("AhNA3HTl5BLdOfuOQjgJI8oMwE-8ac5d9a8.avif"),
    ],
    nextSlug: "rowan-keats",
  },
  {
    slug: "cartes-d-atelier",
    title: "Cartes d’Atelier",
    description:
      "A non-commercial editorial design inspired by playing cards, exploring typography, layout, and material aesthetics through a fashion-driven visual language. All projects and visuals featured in this template are original work by TITARVL.",
    client: "Cartes d’Atelier",
    services: "Graphic Design",
    year: "2025",
    location: "Bratislava, Slovakia",
    image: "/images/framer/2tgHwDdn6t6c7TVeW0Z6dnmmY-1b927762.avif",
    imageH: 465,
    masonryY: 707,
    listImages: [
      t("ezGpHyva6ifHQNJVvNJS5tTEjAg-64d71d73.avif"),
      t("fpn7hMcMjZwC8dWVuHEAKW81Fho-a83dbda1.avif"),
      t("2tgHwDdn6t6c7TVeW0Z6dnmmY-1b927762.avif", 320),
      t("Nu3SotDvSjjn8HjQMIkAGKjfRQ-03a494d8.avif"),
    ],
    nextSlug: "big-baby-tape-magazine",
  },
  {
    slug: "palmira",
    title: "Palmira",
    description:
      "Palmira is a boutique beach resort made for slow days and salty air. It’s a place for laid-back travelers to reset and feel the warmth of the coast. Palmira offers a tropical escape from the everyday, with open-air cabanas, relaxed rooms, and more. All projects and visuals featured in this template are original work by TITARVL.",
    client: "Palmira",
    services: "Brand Identity",
    year: "2025",
    location: "Tokyo, Japan",
    image: "/images/framer/2Dorb8TLeDd690Mwf3ljYoRhs68-7de23305.avif",
    imageH: 465,
    masonryY: 707,
    listImages: [
      t("GxcDtdUtRhgBB9yuY24MRje9ugA-765ef606.avif"),
      t("2Dorb8TLeDd690Mwf3ljYoRhs68-464a54a1.avif"),
      t("R74lxtnSJwxLbh6NyJlEkeDBTw-905ca6df.avif", 320),
      t("Yr05YR5iU8oH9i1iFcnCqb3oI2Y-2f68a2bc.avif"),
    ],
    nextSlug: "cartes-d-atelier",
  },
];

export function formatIndex(index: number) {
  return String(index + 1).padStart(3, "0");
}

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
