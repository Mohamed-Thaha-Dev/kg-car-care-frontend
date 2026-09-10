import { Transformation } from "@/types/Transformation";

export const transformations: Transformation[] = [
  {
    id: "bmw",
    number: "01",
    car: "BMW 3 SERIES",
    service: "EXTERIOR RESTORATION",
    description:
      "Restoring the exterior finish and bringing back the original depth and gloss.",
    before: "/transformation/before-bmw.webp",
    after: "/transformation/after-bmw.webp",
  },

  {
    id: "fortuner",
    number: "02",
    car: "TOYOTA FORTUNER",
    service: "DEEP INTERIOR CLEAN",
    description:
      "A complete interior refresh designed to remove years of dirt, dust and stains.",
    before: "/transformation/before-fortuner.webp",
    after: "/transformation/after-fortuner.webp",
  },

  {
    id: "mercedes",
    number: "03",
    car: "MERCEDES C-CLASS",
    service: "PAINT CORRECTION",
    description:
      "Fine scratches and paint imperfections removed for a deeper, cleaner finish.",
    before: "/transformation/before-mercedes.webp",
    after: "/transformation/after-mercedes.webp",
  }
];