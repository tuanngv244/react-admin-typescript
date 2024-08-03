import {
  Avatar,
  Box,
  Button,
  Chip,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import DashboardCard from "./components/DashboardCard";
import { useAppSelector } from "@/store";
import dayjs from "dayjs";
import { DATE_FORMATS } from "@/constants/format";
import Loading from "@/components/Loading";
import { displayNullish } from "@/utils/transform";
import { useTranslation } from "react-i18next";

const LatestOrder = () => {
  const { t } = useTranslation();
  const orderData = useAppSelector((state) => state.dashboard.lastOrders);
  const orderLoading = useAppSelector(
    (state) => state.dashboard.lastOrderLoading
  );

  return (
    <Loading isFullSize isLoading={orderLoading}>
      <DashboardCard
        title="Latest orders"
        action={
          <Button color="primary" variant="contained">
            {t("DASHBOARD.viewAll")}
          </Button>
        }
      >
        <TableContainer>
          <Table
            aria-label="simple table"
            sx={{
              whiteSpace: "nowrap",
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    {t("DASHBOARD.students")}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    {t("DASHBOARD.phone")}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    {t("DASHBOARD.courses")}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    {t("DASHBOARD.type")}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    {t("DASHBOARD.paymentMethod")}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    {t("DASHBOARD.date")}
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orderData?.map((basic) => (
                <TableRow key={basic.id}>
                  <TableCell>
                    <Stack direction="row" spacing={2}>
                      <Avatar sx={{ width: 40, height: 40 }}>
                        {basic?.name?.charAt(0)}
                      </Avatar>
                      <Box>
                        <Typography
                          color="textSecondary"
                          variant="subtitle2"
                          fontWeight={600}
                        >
                          {displayNullish(basic.name)}
                        </Typography>
                        <Typography
                          color="textSecondary"
                          fontSize="12px"
                          variant="subtitle2"
                        >
                          {displayNullish(basic.customer?.email)}
                        </Typography>
                      </Box>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Typography
                      color="textSecondary"
                      variant="subtitle2"
                      fontWeight={400}
                    >
                      {displayNullish(basic.phone)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      color="textSecondary"
                      variant="subtitle2"
                      fontWeight={600}
                    >
                      {displayNullish(basic.course?.name)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      sx={{
                        bgcolor:
                          basic.type === "Online"
                            ? (theme) => theme.palette.primary.light
                            : basic.type === "Offline"
                            ? (theme) => theme.palette.warning.light
                            : (theme) => theme.palette.secondary.light,
                        color:
                          basic.type === "Online"
                            ? (theme) => theme.palette.primary.main
                            : basic.type === "Offline"
                            ? (theme) => theme.palette.warning.main
                            : (theme) => theme.palette.secondary.main,
                        borderRadius: "8px",
                      }}
                      size="small"
                      label={basic.type}
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      sx={{
                        bgcolor:
                          basic.paymentMethod === "Transfer"
                            ? (theme) => theme.palette.secondary.light
                            : basic.paymentMethod === "Cash"
                            ? (theme) => theme.palette.success.light
                            : (theme) => theme.palette.secondary.light,
                        color:
                          basic.paymentMethod === "Transfer"
                            ? (theme) => theme.palette.secondary.main
                            : basic.paymentMethod === "Cash"
                            ? (theme) => theme.palette.success.main
                            : (theme) => theme.palette.secondary.main,
                        borderRadius: "8px",
                      }}
                      size="small"
                      label={basic.paymentMethod}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2">
                      {dayjs(basic.createdAt).format(DATE_FORMATS.DATE)}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DashboardCard>
    </Loading>
  );
};

export default LatestOrder;
