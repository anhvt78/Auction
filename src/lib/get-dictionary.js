const dictionaries = {
  vi: () => import("@/dictionaries/vi.json").then((module) => module.default),
  en: () => import("@/dictionaries/en.json").then((module) => module.default),
};

export const getDictionary = async (locale) => {
  // Nếu locale không tồn tại trong danh sách, mặc định dùng tiếng Việt (vi)
  const fn = dictionaries[locale] || dictionaries.vi;
  return fn();
};
