import { Fab, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { IconCurrencyDollar } from "@tabler/icons-react";
import Chart from "react-apexcharts";

import { TOTAL_COST } from "@/constants/pages/dashboard";
import { useAppSelector } from "@/store";
import { formatCurrency } from "@/utils/transform";
import { useMemo } from "react";
import { Props } from "react-apexcharts";
import { useTranslation } from "react-i18next";
import DashboardCard from "./components/DashboardCard";
import RevenueGrowthLine from "./components/RevenueGrowthLine";

const YearlyEarnings = () => {
  const { t } = useTranslation();
  const revenueData = useAppSelector(
    (state) => state.dashboard.revenueStatistic
  );
  const totalRevenueData = useAppSelector(
    (state) => state.dashboard.totalRevenueData
  );

  // chart color
  const theme = useTheme();
  const secondary = theme.palette.secondary.main;
  const secondarylight = theme.palette.secondary.light;

  // chart
  const optionscolumnchart: Props = {
    chart: {
      type: "area",
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: "#adb0bb",
      toolbar: {
        show: false,
      },
      height: 60,
      sparkline: {
        enabled: true,
      },
      group: "sparklines",
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    fill: {
      colors: [secondarylight],
      type: "solid",
      opacity: 0.05,
    },
    markers: {
      size: 0,
    },
    tooltip: {
      theme: theme.palette.mode === "dark" ? "dark" : "light",
      x: {
        show: false,
      },
    },
  };

  const seriescolumnchart = useMemo(() => {
    return [
      {
        name: "",
        color: secondary,
        data:
          revenueData?.thisYear?.map((item) => Object.values(item)?.[0]) || [],
      },
    ];
  }, [revenueData?.thisYear]);

  const totalEarnings = !totalRevenueData?.thisYear
    ? 0
    : Number(totalRevenueData?.thisYear) - TOTAL_COST;

  const percentRevenueGrowth = useMemo(() => {
    const earningThisYear = totalEarnings;
    const earningPrevYear = Number(totalRevenueData?.prevYear) - TOTAL_COST;

    if (!totalRevenueData?.thisYear) return 0;
    if (!totalRevenueData?.prevYear) return 100;
    return ((earningThisYear - earningPrevYear) / earningPrevYear) * 100 || 0;
  }, [totalRevenueData]);

  return (
    <DashboardCard
      title={t("DASHBOARD.yearlyEarnings")}
      action={
        <Fab color="secondary" size="medium">
          <IconCurrencyDollar width={24} />
        </Fab>
      }
      footer={
        <Chart
          options={optionscolumnchart}
          series={seriescolumnchart}
          type="area"
          height="60px"
        />
      }
    >
      <>
        <Typography variant="h3" fontWeight="700" mt="-20px">
          ${formatCurrency(totalEarnings)}
        </Typography>
        <Stack direction="row" spacing={1} my={1} alignItems="center">
          <RevenueGrowthLine data={percentRevenueGrowth} />
        </Stack>
      </>
    </DashboardCard>
  );
};

export default YearlyEarnings;
