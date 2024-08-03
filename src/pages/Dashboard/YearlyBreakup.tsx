import Chart from "react-apexcharts";
import { useTheme } from "@mui/material/styles";
import { Grid, Stack, Typography, Avatar } from "@mui/material";
import { Props } from "react-apexcharts";
import DashboardCard from "./components/DashboardCard";
import { useAppSelector } from "@/store";
import { useMemo } from "react";
import { formatCurrency } from "@/utils/transform";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import RevenueGrowthLine from "./components/RevenueGrowthLine";
import { totalRevenueYear } from "@/utils/calculator";

const YearlyBreakup = () => {
  const { t } = useTranslation();
  const currentYear = dayjs().year();
  const revenueData = useAppSelector(
    (state) => state.dashboard.revenueStatistic
  );
  const totalRevenueData = useAppSelector(
    (state) => state.dashboard.totalRevenueData
  );

  // chart color
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const primarylight = theme.palette.primary.light;

  // chart
  const optionscolumnchart: Props = {
    chart: {
      type: "donut",
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: "#adb0bb",
      toolbar: {
        show: false,
      },
      height: 155,
    },
    colors: [primarylight, primary],
    plotOptions: {
      pie: {
        startAngle: 0,
        endAngle: 360,
        donut: {
          size: "75%",
          background: "transparent",
        },
      },
    },
    tooltip: {
      enabled: false,
    },
    stroke: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    responsive: [
      {
        breakpoint: 991,
        options: {
          chart: {
            width: 120,
          },
        },
      },
    ],
  };
  const seriescolumnchart = [
    Number(totalRevenueData?.prevYear),
    Number(totalRevenueData?.thisYear),
  ];

  const yearlyBreakupValue = useMemo(
    () =>
      totalRevenueYear(revenueData?.thisYear) -
      totalRevenueYear(revenueData?.prevYear),
    [revenueData]
  );

  const percentRevenueGrowth = useMemo(() => {
    const revenueThisYear = Number(totalRevenueData?.thisYear);
    const revenuePrevYear = Number(totalRevenueData?.prevYear);
    if (!totalRevenueData?.thisYear) return 0;
    if (!totalRevenueData?.prevYear) return 100;
    return ((revenueThisYear - revenuePrevYear) / revenuePrevYear) * 100 || 0;
  }, [totalRevenueData]);

  return (
    <DashboardCard title={t("DASHBOARD.yearlyBreakup")}>
      <Grid container spacing={3}>
        {/* column */}
        <Grid item xs={7} sm={7}>
          <Typography variant="h3" fontWeight="700">
            {}${formatCurrency(yearlyBreakupValue || 0)}
          </Typography>
          <Stack direction="row" spacing={1} mt={1} alignItems="center">
            <RevenueGrowthLine data={percentRevenueGrowth} />
          </Stack>
          <Stack spacing={3} mt={5} direction="row">
            <Stack direction="row" spacing={1} alignItems="center">
              <Avatar
                sx={{
                  width: 9,
                  height: 9,
                  bgcolor: primarylight,
                  svg: { display: "none" },
                }}
              ></Avatar>
              <Typography variant="subtitle2" color="textSecondary">
                {currentYear - 1}
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <Avatar
                sx={{
                  width: 9,
                  height: 9,
                  bgcolor: primary,
                  svg: { display: "none" },
                }}
              ></Avatar>
              <Typography variant="subtitle2" color="textSecondary">
                {currentYear}
              </Typography>
            </Stack>
          </Stack>
        </Grid>
        {/* column */}
        <Grid item xs={5} sm={5}>
          <Chart
            options={optionscolumnchart}
            series={seriescolumnchart}
            type="donut"
            height="130px"
          />
        </Grid>
      </Grid>
    </DashboardCard>
  );
};

export default YearlyBreakup;
