import type { Locale } from "./config";

const dictionaries = {
  ar: () => import("./ar.json").then((m) => m.default),
  en: () => import("./en.json").then((m) => m.default),
};

export const getDictionary = async (locale: Locale) => {
  return dictionaries[locale]();
};

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>;
