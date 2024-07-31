import { ECourseTypes } from "@/types/course";

const courseTypeOptions = [
  { label: "Online", value: ECourseTypes.ONLINE },
  { label: "Offline", value: ECourseTypes.OFFLINE },
];

const Roles = {
  Teacher: "Teacher",
  Mentor: "Mentor",
};

export { courseTypeOptions, Roles };
