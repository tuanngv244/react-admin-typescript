import Dialog from "@/components/Dialog";
import { Paths } from "@/constants/paths";
import { useMutation } from "@/hooks";
import DetailPageLayout from "@/layouts/DetailPageLayout";
import { courseService } from "@/services/course";
import { ICourse, ICourseFormData } from "@/types/course";
import { Button } from "@mui/material";
import { useEffect, useMemo, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import CourseForm, { TFormAction } from "../components/CourseForm";
import { BoxActionStyled } from "./styled";
import { mapCourseFormData } from "@/utils/pages/course";

const CourseDetailPage = () => {
  const formRef = useRef<TFormAction | null>(null);
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: courseDetailData,
    execute: getCourseDetailExecute,
    loading: courseDetailLoading,
  } = useMutation<ICourse, string>(courseService.getCourse);
  const { execute: updateCourseExecute, loading: updateCourseLoading } =
    useMutation<ICourse, { id: string; formData: FormData }>(
      courseService.updateCourse
    );
  const { execute: deleteCourseExecute, loading: deleteCourseLoading } =
    useMutation<ICourse, string[]>(courseService.deleteCourse);

  const courseInitialValues: any = {
    ...courseDetailData,
    teams: courseDetailData?.teams?.map((team) => team.id),
    content:
      courseDetailData?.content?.map((item) => ({
        title: item.title,
        description: item?.description?.join(","),
      })) || [],
  };

  useEffect(() => {
    if (id) getCourseDetailExecute(id);
  }, [id]);

  const handleUpdateCourse = (data: ICourseFormData) => {
    if (!courseDetailData?.id) return;
    const formData = mapCourseFormData(data);

    updateCourseExecute(
      { id: courseDetailData?.id, formData },
      {
        onSuccess: () => navigate(Paths.COURSES),
        onFailed: () => {},
      }
    );
  };
  const handleDeleteCourse = (id: string) => {
    deleteCourseExecute([id], {
      onSuccess: () => navigate(Paths.COURSES),
      onFailed: () => {},
    });
  };

  const breadCrumbs = [
    {
      to: "/",
      title: "Home",
    },
    {
      to: Paths.COURSES,
      title: t("COURSE.listTitle"),
    },
    {
      title: t("COURSE.detailTitle"),
    },
  ];

  const renderActions = useMemo(
    () => (
      <BoxActionStyled>
        <Dialog
          handleAgree={() =>
            handleDeleteCourse(courseInitialValues?.id as string)
          }
          renderButton={(toggle) => (
            <Button
              onClick={toggle}
              variant="outlined"
              color="error"
              fullWidth
              className="danger"
            >
              {t("COMMON.delete")}
            </Button>
          )}
          renderContent={
            <p>
              {t("COMMON.areYouSureWantToDelete", {
                name: courseInitialValues?.name,
              })}
            </p>
          }
        />

        <Button
          disabled={updateCourseLoading}
          onClick={() => formRef.current?.onSubmit()}
          type="submit"
          fullWidth
          variant="contained"
        >
          {t("COMMON.save")}
        </Button>
      </BoxActionStyled>
    ),
    [
      courseInitialValues,
      updateCourseLoading,
      deleteCourseLoading,
      formRef.current,
    ]
  );

  const renderContent = useMemo(
    () => (
      <CourseForm
        renderAction={renderActions}
        _onSubmit={handleUpdateCourse}
        initialDetailData={courseInitialValues}
        ref={formRef}
        isLoading={courseDetailLoading}
        isDetail
      />
    ),
    [courseInitialValues, courseDetailLoading]
  );

  return (
    <DetailPageLayout
      pageTitle={""}
      renderContent={renderContent}
      breadCrumbs={breadCrumbs}
    />
  );
};

export default CourseDetailPage;
