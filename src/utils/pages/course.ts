import { ICourseFormData, ISchedule } from "@/types/course";

const mapCourseFormData = (data: ICourseFormData) => {
  const payload = {
    name: data.name,
    title: data.title,
    image: data.image,
    startDate: data.startDate,
    endDate: data.endDate,
    link: data.link,
    price: data.price,
    duration: data.duration,
    description: data.description,
    sortOrder: data.sortOrder,
    active: data.active,
  };

  if (typeof data.image === "string") {
    delete payload.image;
  }

  const formData = new FormData();
  for (let key in data.schedule) {
    formData.append(`schedule[${key}]`, data.schedule[key as keyof ISchedule]);
  }
  for (let field in payload) {
    formData.append(
      field,
      payload[field as keyof typeof payload] as string | Blob
    );
  }
  for (let [index, value] of data.tags.entries()) {
    formData.append(`tags[${index}]`, value);
  }
  for (let [index, value] of data.required.entries()) {
    formData.append(`required[${index}]`, value);
  }
  for (let [index, value] of data.teams.entries()) {
    formData.append(`teams[${index}]`, value);
  }
  for (let [index] of data.content.entries()) {
    formData.append(`content[${index}][title]`, data.content[index].title);
    formData.append(
      `content[${index}][description]`,
      data.content[index].description
    );
  }

  return formData;
};

export { mapCourseFormData };
