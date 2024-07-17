/*--- PATH ENUM ---*/
// Define the base paths
const COURSES_BASE = "/course";

// Define path enum
export enum Paths {
  ROOT = "/",

  AUTHENTICATION = "/authen",

  DASHBOARD = "/",

  COURSES = COURSES_BASE,
  CREATE_COURSE = `${COURSES_BASE}/create`,
  COURSE_DETAIL = `${COURSES_BASE}/:id`,

  STATUS_404 = "/404",
}
