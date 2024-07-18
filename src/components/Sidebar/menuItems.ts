import { Paths } from "@/constants/paths";
import {
  IconAperture,
  IconChartDonut3,
  IconPoint,
  IconAppWindow,
} from "@tabler/icons-react";
import { uniqueId } from "lodash";

interface MenuitemsType {
  [x: string]: any;
  id?: string;
  navlabel?: boolean;
  subheader?: string;
  title?: string;
  icon?: any;
  href?: string;
  children?: MenuitemsType[];
  chip?: string;
  chipColor?: string;
  variant?: string;
  external?: boolean;
}

const MenuItems: MenuitemsType[] = [
  {
    id: uniqueId(),
    title: "Dashboard",
    icon: IconAperture,
    href: Paths.DASHBOARD,
    chip: "New",
    chipColor: "secondary",
  },
  {
    id: uniqueId(),
    title: "Courses",
    icon: IconAppWindow,
    href: Paths.COURSES,
  },
  {
    id: uniqueId(),
    title: "Blog",
    icon: IconChartDonut3,
    href: "/blog/",
    children: [
      {
        id: uniqueId(),
        title: "All articles",
        icon: IconPoint,
        href: "/All articles",
      },
      {
        id: uniqueId(),
        title: "Categories",
        icon: IconPoint,
        href: "/Categories",
      },
    ],
  },
];

export default MenuItems;
