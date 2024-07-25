const toUpperCaseFirstLetter = (data: string) => {
  const result: string[] = [];
  data.split(" ").forEach((item) => {
    result.push(item[0].toUpperCase() + item.slice(1));
  });
  return result.join(" ");
};

export { toUpperCaseFirstLetter };
