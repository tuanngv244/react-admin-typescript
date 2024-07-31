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

export { toUpperCaseFirstLetter, formatCurrency };
