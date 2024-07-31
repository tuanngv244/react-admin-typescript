import { Option } from "@/types/general";

const toUpperCaseFirstLetter = (data: string) => {
  const result: string[] = [];
  data.split(" ").forEach((item) => {
    result.push(item[0].toUpperCase() + item.slice(1));
  });
  return result.join(" ");
};
const formatCurrency = (data: number, configs?: { type: string }) => {
  return new Intl.NumberFormat("vi-VN", {
    currency: configs?.type || "VND",
  }).format(data || 0);
};

const transformToOptions = <D>(
  data: D[],
  configs?: { labelKey: keyof D; valueKey: keyof D }
): Option[] | [] => {
  const { labelKey, valueKey } = configs || {};
  if (!!!data?.length) return [];
  return data.map(
    (item) =>
      ({
        label: item[(labelKey || "name") as keyof D],
        value: item[(valueKey || "id") as keyof D],
      } as Option)
  );
};

export { toUpperCaseFirstLetter, formatCurrency, transformToOptions };
