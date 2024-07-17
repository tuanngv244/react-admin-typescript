import { Paths } from "@/constants/paths";
import { Navigate, RouteObject } from "react-router-dom";
import { lazy } from "react";
import withSuspenseLoader from "@/hocs/withSuspenseLoader";
import PrivateRoute from "@/components/PrivateRoute";
import MenuLayout from "@/layouts/MenuLayout";
import BlankLayout from "@/layouts/BlankLayout";
// Authentication
const Authentication = withSuspenseLoader(
  lazy(() => import("../pages/Authentication"))
);
// Dashboard
const Dashboard = withSuspenseLoader(lazy(() => import("../pages/Dashboard")));
// Course
const CourseListPage = withSuspenseLoader(
  lazy(() => import("../pages/Course/List"))
);
const CourseCreatePage = withSuspenseLoader(
  lazy(() => import("../pages/Course/Create"))
);
const CourseDetailPage = withSuspenseLoader(
  lazy(() => import("../pages/Course/Detail"))
);
// Status
const Status404 = withSuspenseLoader(lazy(() => import("../pages/Status404")));

/*--- ROUTE ARRAY ---*/
const routes: RouteObject[] = [
  {
    path: Paths.ROOT,
    element: (
      <PrivateRoute
        redirectTo={Paths.AUTHENTICATION}
        element={<MenuLayout />}
      />
    ),
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: Paths.COURSES,
        children: [
          {
            path: "",
            index: true,
            element: <CourseListPage />,
          },
          {
            path: Paths.CREATE_COURSE,
            element: <CourseCreatePage />,
          },
          {
            path: Paths.COURSE_DETAIL,
            element: <CourseDetailPage />,
          },
        ],
      },
      // ...
    ],
  },
  {
    path: Paths.ROOT,
    element: <BlankLayout />,
    children: [
      { path: Paths.AUTHENTICATION, element: <Authentication /> },
      { path: Paths.STATUS_404, element: <Status404 /> },
      { path: "*", element: <Navigate to={Paths.STATUS_404} /> },
    ],
  },
];

export default routes;
