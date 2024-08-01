import Loading from "@/components/Loading";
import {
  BoxFormStyled,
  ListVerticalStyled,
  WrapDisableStyled,
} from "@/pages/Course/components/CourseForm/styled";
import { AppDispatch } from "@/store";
import { useTheme } from "@/theme";
import { ICourseFormData } from "@/types/course";
import { Box, Typography } from "@mui/material";
import {
  ReactNode,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import ContentSection from "./ContentSection";
import GeneralInfoSection from "./GeneralInfoSection";
import RequiredSection from "./RequiredSection";
import ScheduleSection from "./ScheduleSection";
import UploadSection from "./UploadSection";
import { instructorActions } from "@/store/instructor/InstructorSlice";
import CustomSwitch from "@/components/CustomSwitch";

const initialValues: ICourseFormData = {
  name: "",
  title: "",
  startDate: undefined,
  endDate: undefined,
  duration: 0,
  tags: [],
  price: 0,
  link: "",
  schedule: undefined,
  teams: [],
  description: "",
  active: false,
  sortOrder: 1,
  content: [
    {
      title: "",
      description: "",
    },
  ],
  required: [""],
};

export type TFormAction = {
  reset: VoidFunction;
  onSubmit: VoidFunction;
  values: Partial<ICourseFormData>;
};

type CourseFormProps = {
  initialDetailData?: ICourseFormData;
  isLoading?: boolean;
  _onSubmit: (data: ICourseFormData) => void;
  renderAction: ReactNode;
  isDetail?: boolean;
};

const CourseForm = forwardRef(
  (
    {
      initialDetailData,
      _onSubmit,
      isLoading = false,
      renderAction,
      isDetail,
    }: CourseFormProps,
    ref
  ) => {
    const dispatch = useDispatch<AppDispatch>();
    const form = useForm<ICourseFormData>({
      defaultValues: initialValues,
    });

    const [isEdit, setIsEdit] = useState(false);

    const theme = useTheme();
    const borderColor = theme.palette.divider;

    const { getValues, reset, handleSubmit } = form;

    useImperativeHandle(
      ref,
      () => ({
        reset: reset,
        onSubmit: handleSubmit(_onSubmit),
        values: getValues,
      }),
      [initialDetailData]
    );

    useEffect(() => {
      dispatch(instructorActions.handleGetInstructors());
    }, []);

    useEffect(() => {
      if (initialDetailData) form.reset(initialDetailData);
    }, [initialDetailData]);

    const styleBoxSection = {
      padding: "0 15px 15px 15px",
      width: "100%",
      border: `1px solid ${borderColor}`,
    };

    return (
      <>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            paddingTop: "20px",
            paddingLeft: "4px",
            marginLeft: "-12px",
          }}
        >
          {isDetail && (
            <CustomSwitch
              onChange={() => setIsEdit(!isEdit)}
              checked={isEdit}
            />
          )}
          <Typography variant="h4" sx={{ marginTop: "-4px" }}>
            {isEdit ? "Edit mode" : "View only mode"}
          </Typography>
        </Box>
        <Loading isLoading={isLoading} styles={{ width: "100%" }}>
          <BoxFormStyled
            component={"form"}
            onSubmit={handleSubmit(_onSubmit)}
            sx={{ marginTop: "20px" }}
          >
            {isDetail && !isEdit && <WrapDisableStyled />}
            <ListVerticalStyled sx={{ width: "70%" }}>
              <Box sx={styleBoxSection}>
                <GeneralInfoSection form={form} />
              </Box>
              <Box sx={styleBoxSection}>
                <RequiredSection form={form} />
              </Box>
              <Box sx={styleBoxSection}>
                <ContentSection form={form} />
              </Box>
            </ListVerticalStyled>
            <Box
              sx={{ ...styleBoxSection, width: "30%", height: "fit-content" }}
            >
              <ScheduleSection form={form} />
              <UploadSection form={form} />
              {renderAction}
            </Box>
          </BoxFormStyled>
        </Loading>
      </>
    );
  }
);

export default CourseForm;
