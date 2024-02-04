import slugify from "slugify";

export const classNames = (...classes: any[]) => {
  return classes.filter(Boolean).join(" ");
};

export const convertStr2Slug = (params: string) => {
  if (!params) return "";
  params = slugify(params, {
    lower: true,
    locale: "vi",
  });
  return params;
};

export const convertSlug2Id = (params: string) => {
  if (!params) return "";
  const temp = params.split("-");
  return temp[temp.length - 1];
};
