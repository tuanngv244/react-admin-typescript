const validFileTypes = (file: File, types?: string[]) => {
  const acceptTypes = types ?? ["png", "jpg", "jpeg"];
  const fileType = file?.type;
  const type = fileType?.replace("image/", "");
  return acceptTypes.includes(type);
};

const shouldUpdate = (
  oldValue?: string | object | any[],
  newValue?: string | object | any[]
) => {
  if (!oldValue) return true;
  if (typeof oldValue === "string" && typeof newValue === "string")
    return oldValue !== newValue;
  return JSON.stringify(oldValue)?.length !== JSON.stringify(newValue)?.length;
};

export { validFileTypes, shouldUpdate };
