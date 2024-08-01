import { useMutation } from "@/hooks";
import DetailPageLayout from "@/layouts/DetailPageLayout";
import { courseService } from "@/services/course";
import { ICourse, ICourseFormData } from "@/types/course";
import { mapCourseFormData } from "@/utils/pages/course";
import React, { useMemo, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Paths } from "@/constants/paths";
import CourseForm, { TFormAction } from "@/pages/Course/components/CourseForm";
import { SubmitButtonStyled } from "@/pages/Course/components/CourseForm/styled";

const CourseCreatePage: React.FC = () => {
  const formRef = useRef<TFormAction>();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { execute: createCourseExecute, loading: createCourseLoading } =
    useMutation<ICourse, FormData>(courseService.createCourse);

  const handleCreateCourse = (data: ICourseFormData) => {
    const formData = mapCourseFormData(data);
    createCourseExecute(formData, {
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
      title: t("COURSE.createTitle"),
    },
  ];

  const renderAction = (
    <SubmitButtonStyled
      disabled={createCourseLoading}
      onClick={() => formRef.current?.onSubmit()}
      variant="contained"
      type="submit"
    >
      {t("COMMON.create")}
    </SubmitButtonStyled>
  );

  const renderForm = useMemo(
    () => (
      <CourseForm
        renderAction={renderAction}
        ref={formRef}
        _onSubmit={handleCreateCourse}
      />
    ),
    []
  );

  return (
    <DetailPageLayout
      pageTitle={""}
      renderContent={renderForm}
      breadCrumbs={breadCrumbs}
    />
  );
};

export default CourseCreatePage;
