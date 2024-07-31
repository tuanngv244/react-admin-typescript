import ListPageLayout from "@/layouts/ListPageLayout";
import { useTranslation } from "react-i18next";
import { Paths } from "@/constants/paths";
import CourseTable from "@/pages/Course/List/CourseTable";

const CourseListPage: React.FC = () => {
  const { t } = useTranslation();
  const renderTable = <CourseTable />;

  const breadCrumbs = [
    {
      to: "/",
      title: "Home",
    },
    {
      title: t("COURSE.listTitle"),
    },
  ];

  return (
    <ListPageLayout
      searchPlaceholder={t("Search here")}
      pageTitle={t("COURSE.listTitle")}
      createPath={Paths.CREATE_COURSE}
      renderTable={renderTable}
      breadCrumbs={breadCrumbs}
    />
  );
};

export default CourseListPage;
