import {
  Avatar,
  Box,
  Button,
  Grid,
  MenuItem,
  SelectChangeEvent,
  Stack,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useMemo } from "react";
import Chart, { Props } from "react-apexcharts";
import DashboardCard from "./components/DashboardCard";
import Select from "@/components/Select";
import { useAppDispatch, useAppSelector } from "@/store";
import { formatCurrency } from "@/utils/transform";
import { useTranslation } from "react-i18next";
import { dashboardActions } from "@/store/dashboard/DashboardSlice";
import { useSearchQuery } from "@/hooks";
import dayjs from "dayjs";
import { TOTAL_COST, yearOptions } from "@/constants/pages/dashboard";

const RevenueUpdates = () => {
  const { t } = useTranslation();
  const currentYear = dayjs().year();
  const dispatch = useAppDispatch();
  const { searchParams, _onSetSearchParams } = useSearchQuery();

  const revenueData = useAppSelector(
    (state) => state.dashboard.revenueStatistic
  );
  const totalRevenueData = useAppSelector(
    (state) => state.dashboard.totalRevenueData
  );
  // const revenueLoading = useAppSelector((state) => state.dashboard.revenueStatisticLoading);

  const handleChange = (event: SelectChangeEvent<any>) => {
    const value = event.target.value;
    _onSetSearchParams({ year: value });
    dispatch(dashboardActions.handleGetRevenueStatistic({ year: value }));
  };

  // chart color
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const secondary = theme.palette.secondary.main;

  // chart
  const optionscolumnchart: Props = {
    chart: {
      type: "bar",
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: "#adb0bb",
      toolbar: {
        show: false,
      },
    },
    colors: [
      primary,
      primary,
      primary,
      primary,
      primary,
      primary,
      primary,
      primary,
      primary,
      primary,
      primary,
      primary,
    ],
    plotOptions: {
      bar: {
        borderRadius: 4,
        columnWidth: "60%",
        distributed: true,
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    grid: {
      yaxis: {
        lines: {
          show: false,
        },
      },
    },
    xaxis: {
      categories: [
        ["Jan"],
        ["Feb"],
        ["Mar"],
        ["Apr"],
        ["May"],
        ["June"],
        ["July"],
        ["Aug"],
        ["Sept"],
        ["Oct"],
        ["Nov"],
        ["Dec"],
      ],
      axisBorder: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        show: false,
      },
    },
    tooltip: {
      theme: theme.palette.mode === "dark" ? "dark" : "light",
    },
  };
  const seriescolumnchart = useMemo(() => {
    return [
      {
        name: "",
        data:
          revenueData?.thisYear?.map((item) => Object.values(item)?.[0]) || [],
      },
    ];
  }, [revenueData?.thisYear]);

  const totalEarnings = !totalRevenueData?.thisYear
    ? 0
    : Number(totalRevenueData?.thisYear) - TOTAL_COST;

  return (
    <DashboardCard
      title={t("DASHBOARD.overviewOfRevenue")}
      // subtitle="Overview of Profit"
      action={
        <Select
          labelId="month-dd"
          id="month-dd"
          size="small"
          value={searchParams?.year || currentYear}
          onChange={handleChange}
        >
          {yearOptions.map((option, index) => (
            <MenuItem key={index} value={option.value}>
              {" "}
              {option.label}
            </MenuItem>
          ))}
        </Select>
      }
    >
      <Grid container spacing={3}>
        {/* column */}
        <Grid item xs={12} sm={8}>
          <Box height="350px" paddingTop="150px">
            <Chart
              options={optionscolumnchart}
              series={seriescolumnchart}
              type="bar"
              height="200px"
            />
          </Box>
        </Grid>
        {/* column */}
        <Grid item xs={12} sm={4}>
          <Stack spacing={3} mt={3}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Box>
                <Typography variant="h3" fontWeight="700">
                  ${formatCurrency(totalEarnings || 0)}
                </Typography>
                <Typography variant="subtitle2" color="textSecondary">
                  {t("DASHBOARD.totalEarnings")}
                </Typography>
              </Box>
            </Stack>
          </Stack>
          <Stack spacing={3} my={5}>
            <Stack direction="row" spacing={2}>
              <Avatar
                sx={{
                  width: 9,
                  mt: "0.5rem !important",
                  height: 9,
                  bgcolor: primary,
                  svg: { display: "none" },
                }}
              ></Avatar>
              <Box>
                <Typography variant="subtitle1" color="textSecondary">
                  {t("DASHBOARD.revenueThisYear")}
                </Typography>
                <Typography variant="h5">
                  ${formatCurrency(totalRevenueData?.thisYear || 0)}
                </Typography>
              </Box>
            </Stack>
            <Stack direction="row" spacing={2}>
              <Avatar
                sx={{
                  width: 9,
                  mt: "0.5rem !important",
                  height: 9,
                  bgcolor: secondary,
                  svg: { display: "none" },
                }}
              ></Avatar>
              <Box>
                <Typography variant="subtitle1" color="textSecondary">
                  {t("DASHBOARD.revenueLastYear")}
                </Typography>
                <Typography variant="h5">
                  ${formatCurrency(totalRevenueData?.prevYear || 0)}
                </Typography>
              </Box>
            </Stack>
          </Stack>
          <Button color="primary" variant="contained" fullWidth>
            {t("DASHBOARD.viewFullReport")}
          </Button>
        </Grid>
      </Grid>
    </DashboardCard>
  );
};

export default RevenueUpdates;
