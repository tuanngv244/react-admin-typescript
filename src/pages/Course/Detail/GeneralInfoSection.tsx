import CkEditor5 from "@/components/Ckeditor5";
import Input from "@/components/Input";
import Label from "@/components/Label";
import { DATE_FORMATS } from "@/constants/format";
import { courseTypeOptions } from "@/constants/pages/course";
import { instructorsSelector } from "@/store/instructor/InstructorSlice";
import { TCreateUpdateUseFormReturn } from "@/types/course";
import { transformToOptions } from "@/utils/transform";
import {
  Box,
  Divider,
  FormControl,
  Grid,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

type GeneralInfoSectionProps = {
  form: TCreateUpdateUseFormReturn;
};

const GeneralInfoSection: React.FC<GeneralInfoSectionProps> = ({ form }) => {
  const { t } = useTranslation();
  const {
    watch,
    control,
    setValue,
    register,
    formState: { errors },
  } = form;

  const instructors = useSelector(instructorsSelector);
  const instructorOptions = transformToOptions(instructors);

  return (
    <>
      <h3>{t("COURSE.generalInfo")}</h3>
      <Divider />
      <Input
        fullWidth
        label={t("COURSE.name")}
        errorMessage={errors?.name?.message}
        inputProps={{
          ...register("name", {
            required: t("MESSAGE_ERROR.pleaseEnterName"),
          }),
        }}
      />
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Controller
            name="tags"
            control={control}
            rules={{
              required: t("MESSAGE_ERROR.pleaseEnterTags"),
            }}
            defaultValue={[]}
            render={({ field }) => (
              <FormControl fullWidth>
                <Input
                  fullWidth
                  label={t("COURSE.types")}
                  errorMessage={errors?.tags?.message}
                  {...field}
                  renderInput={(props: any) => {
                    return (
                      <Select
                        defaultValue={[]}
                        fullWidth
                        multiple
                        sx={{ marginTop: "0 !important" }}
                        {...props}
                      >
                        {courseTypeOptions.map((option, index) => (
                          <MenuItem key={index} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Select>
                    );
                  }}
                />
              </FormControl>
            )}
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            fullWidth
            label={t("COURSE.price")}
            errorMessage={errors?.price?.message}
            inputProps={{
              ...register("price", {
                required: t("MESSAGE_ERROR.pleaseEnterPrice"),
              }),
            }}
            type="number"
          />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Input
            fullWidth
            label={t("COURSE.title")}
            errorMessage={errors?.title?.message}
            inputProps={{
              ...register("title", {
                required: t("MESSAGE_ERROR.pleaseEnterTitle"),
              }),
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <Controller
            name="teams"
            control={control}
            rules={{
              required: t("MESSAGE_ERROR.pleaseEnterInstructor"),
            }}
            defaultValue={[]}
            render={({ field }) => (
              <FormControl fullWidth>
                <Input
                  label={t("COURSE.instructor")}
                  errorMessage={errors?.teams?.message}
                  {...field}
                  renderInput={(props: any) => {
                    return (
                      <Select
                        defaultValue={[]}
                        fullWidth
                        multiple
                        sx={{
                          marginTop: "0 !important",
                        }}
                        {...props}
                      >
                        {instructorOptions?.map((option, index) => (
                          <MenuItem key={index} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Select>
                    );
                  }}
                />
              </FormControl>
            )}
          />
        </Grid>
      </Grid>

      <Box>
        <Label> {t("COURSE.description")}</Label>
        <CkEditor5
          data={watch("description")}
          handleChange={(data: string) => setValue("description", data)}
        />
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Controller
            name={"startDate"}
            control={control}
            rules={{
              required: t("MESSAGE_ERROR.pleaseEnterStartDate"),
            }}
            render={({ field: { onChange, ...restField } }) => {
              return (
                <Input
                  fullWidth
                  label={t("COURSE.startDate")}
                  errorMessage={errors?.startDate?.message}
                  renderInput={(_) => (
                    <DatePicker
                      value={dayjs(restField?.value)}
                      sx={{ width: "100%" }}
                      format={DATE_FORMATS.DATE}
                      onChange={(value: Dayjs | null) =>
                        setValue(
                          "startDate",
                          dayjs(value).format(DATE_FORMATS.DATE)
                        )
                      }
                      slots={{
                        textField: (params) => <TextField {...params} />,
                      }}
                    />
                  )}
                />
              );
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <Controller
            name={"endDate"}
            control={control}
            rules={{
              required: t("MESSAGE_ERROR.pleaseEnterEndDate"),
            }}
            render={({ field: { onChange, ...restField } }) => {
              return (
                <Input
                  fullWidth
                  label={t("COURSE.endDate")}
                  errorMessage={errors?.endDate?.message}
                  renderInput={(_) => (
                    <DatePicker
                      value={dayjs(restField?.value)}
                      sx={{ width: "100%" }}
                      format={DATE_FORMATS.DATE}
                      onChange={(value: Dayjs | null) =>
                        setValue(
                          "endDate",
                          dayjs(value).format(DATE_FORMATS.DATE)
                        )
                      }
                      slots={{
                        textField: (params) => <TextField {...params} />,
                      }}
                    />
                  )}
                />
              );
            }}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Input
            fullWidth
            label={t("COURSE.link")}
            errorMessage={errors?.link?.message}
            inputProps={{
              ...register("link", {
                required: t("MESSAGE_ERROR.pleaseEnterLink"),
              }),
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            fullWidth
            label={t("COURSE.duration")}
            errorMessage={errors?.duration?.message}
            inputProps={{
              ...register("duration", {
                required: t("MESSAGE_ERROR.pleaseEnterDuration"),
              }),
            }}
            type="number"
          />
        </Grid>
      </Grid>
    </>
  );
};

export default GeneralInfoSection;
