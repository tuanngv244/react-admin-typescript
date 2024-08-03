import { SVGS } from "@/assets/icons";
import { useAppSelector } from "@/store";
import { Box, CardContent, Grid, Typography } from "@mui/material";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

interface cardType {
  icon: Function;
  title: string;
  digits: string;
  bgcolor: string;
}

const TopCards = () => {
  const { t } = useTranslation();
  const memberStatistic = useAppSelector(
    (state) => state.dashboard.memberStatistic
  );

  const topcards: cardType[] = useMemo(
    () => [
      {
        icon: () => <SVGS.ICUserMale />,
        title: t("DASHBOARD.users"),
        digits: `${memberStatistic?.users || 0}`,
        bgcolor: "primary",
      },
      {
        icon: () => <SVGS.ICBriefCase />,
        title: t("DASHBOARD.students"),
        digits: `${memberStatistic?.students || 0}`,
        bgcolor: "warning",
      },
      {
        icon: () => <SVGS.ICConnect />,
        title: t("DASHBOARD.register"),
        digits: `${memberStatistic?.subscribes || 0}`,
        bgcolor: "secondary",
      },
      {
        icon: () => <SVGS.ICSpeechBubble />,
        title: t("DASHBOARD.instructors"),
        digits: `${memberStatistic?.instructors || 0}`,
        bgcolor: "success",
      },
    ],
    [memberStatistic]
  );

  return (
    <Grid container spacing={3} className="top-cards">
      {topcards.map((topcard, i) => (
        <Grid item xs={12} sm={3} lg={3} key={i}>
          <Box bgcolor={topcard.bgcolor + ".light"} textAlign="center">
            <CardContent>
              {topcard.icon()}
              <Typography
                color={topcard.bgcolor + ".main"}
                mt={1}
                variant="subtitle1"
                fontWeight={600}
              >
                {topcard.title}
              </Typography>
              <Typography
                color={topcard.bgcolor + ".main"}
                variant="h4"
                fontWeight={600}
              >
                {topcard.digits}
              </Typography>
            </CardContent>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default TopCards;
