import Breadcrumb from "@/components/Breadcrumb";
import { Box, Grid } from "@mui/material";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import TopCards from "./TopCards";
import RevenueUpdates from "./RevenueUpdates";
import YearlyBreakup from "./YearlyBreakup";
import YearlyEarnings from "./YearlyEarnings";
import LatestOrder from "./LastestOrder";
import LatestContacts from "./LastestContacts";
import { useAppDispatch } from "@/store";
import { dashboardActions } from "@/store/dashboard/DashboardSlice";
import { useSearchQuery } from "@/hooks";
import dayjs from "dayjs";
import PageContainerLayout from "@/layouts/PageContainerLayout";
import AlertNotification from "@/components/AlertNotification";

const DashboardPage: React.FC = () => {
  const [onAlertActions] = AlertNotification.useAlertNotification({
    autoCloseTime: 5000,
  });
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const currentYear = dayjs().year();
  const { searchParams } = useSearchQuery();
  const breadCrumbs = [
    {
      to: "/",
      title: "Home",
    },
    {
      title: t("dashboard"),
    },
  ];

  const initChartData = () => {
    dispatch(dashboardActions.handleGetMemberStatistic({}));
    dispatch(
      dashboardActions.handleGetRevenueStatistic({
        year: Number(searchParams?.year) || currentYear,
      })
    );
    dispatch(dashboardActions.handleGetLastOrders({ page: 1, limit: 6 }));
    dispatch(dashboardActions.handleGetLastContacts({ page: 1, limit: 6 }));
  };

  useEffect(() => {
    initChartData();
    onAlertActions.info(t("DASHBOARD.dashboardIUpdateAfter5minutes!"));
    const recallTime = 60000 * 5; // 5 minutes
    const timer = setInterval(() => {
      initChartData();
      onAlertActions.info(t("DASHBOARD.dashboardIUpdateAfter5minutes!"));
    }, recallTime);
    return () => clearInterval(timer);
  }, []);

  return (
    <PageContainerLayout
      title={t("DASHBOARD.cfdDashboard")}
      description={t("DASHBOARD.thisIsDashboardPage")}
    >
      <Box>
        <Breadcrumb title="Dashboard" items={breadCrumbs} />
        <Grid container spacing={3}>
          {/* column */}
          <Grid item xs={12} lg={12}>
            <TopCards />
          </Grid>
          {/* column */}
          <Grid item xs={12} lg={8} display="flex">
            <RevenueUpdates />
          </Grid>
          {/* column */}
          <Grid item xs={12} lg={4}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} lg={12}>
                <YearlyBreakup />
              </Grid>
              <Grid item xs={12} sm={6} lg={12}>
                <YearlyEarnings />
              </Grid>
            </Grid>
          </Grid>
          {/* column */}
          <Grid item xs={12} lg={12}>
            <LatestOrder />
          </Grid>
          {/* column */}
          <Grid item xs={12} lg={12}>
            <LatestContacts />
          </Grid>
        </Grid>
      </Box>
    </PageContainerLayout>
  );
};

export default DashboardPage;
