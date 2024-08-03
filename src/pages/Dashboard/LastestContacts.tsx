import {
  Avatar,
  Box,
  Button,
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
import Loading from "@/components/Loading";
import dayjs from "dayjs";
import { DATE_FORMATS } from "@/constants/format";
import { displayNullish } from "@/utils/transform";
import { useTranslation } from "react-i18next";

const LatestContacts = () => {
  const { t } = useTranslation();
  const contactData = useAppSelector((state) => state.dashboard.lastContacts);
  const contactLoading = useAppSelector(
    (state) => state.dashboard.lastContactLoading
  );

  return (
    <Loading isLoading={contactLoading} isFullSize>
      <DashboardCard
        title="Latest contacts"
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
                    {t("DASHBOARD.users")}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    {t("DASHBOARD.subject")}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    {t("DASHBOARD.phone")}
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
              {contactData?.map((basic) => (
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
                          {displayNullish(basic.email)}
                        </Typography>
                      </Box>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Typography
                      color="textSecondary"
                      variant="subtitle2"
                      fontWeight={600}
                    >
                      {displayNullish(basic.description)}
                    </Typography>
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
                      fontWeight={400}
                    >
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

export default LatestContacts;
