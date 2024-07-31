const validFileTypes = (file: File, types?: string[]) => {
  const acceptTypes = types ?? ["png", "jpg", "jpeg"];
  const fileType = file?.type;
  const type = fileType?.replace("image/", "");
  return acceptTypes.includes(type);
};

export { validFileTypes };
