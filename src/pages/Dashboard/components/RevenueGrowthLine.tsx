import { Avatar, Typography } from "@mui/material";
import { IconArrowDownRight, IconArrowUpLeft } from "@tabler/icons-react";
import React from "react";
import { useTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";

type Props = {
  data: number;
};

const RevenueGrowthLine: React.FC<Props> = ({ data }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const successlight = theme.palette.success.light;
  const errorlight = theme.palette.error.light;

  return data > 0 ? (
    <>
      <Avatar sx={{ bgcolor: successlight, width: 27, height: 27 }}>
        <IconArrowUpLeft width={20} color="#39B69A" />
      </Avatar>
      <Typography variant="subtitle2" fontWeight="600">
        +{data.toFixed(1)}%
      </Typography>
      <Typography variant="subtitle2" color="textSecondary">
        {t("DASHBOARD.lastYear")}
      </Typography>
    </>
  ) : (
    <>
      <Avatar sx={{ bgcolor: errorlight, width: 27, height: 27 }}>
        <IconArrowDownRight width={20} color="#FA896B" />
      </Avatar>
      <Typography variant="subtitle2" fontWeight="600">
        {data.toFixed(1)}%
      </Typography>
      <Typography variant="subtitle2" color="textSecondary">
        {t("DASHBOARD.lastYear")}
      </Typography>
    </>
  );
};

export default RevenueGrowthLine;
