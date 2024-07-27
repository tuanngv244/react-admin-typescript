import { TypographyStyled, WrapToolbarStyled } from "@/components/Table/styled";
import { Box, Fab, Tooltip, Typography } from "@mui/material";
import { IconTrash } from "@tabler/icons-react";
import React from "react";
import { useTranslation } from "react-i18next";
import TableFilter, { TFilterItem } from "./TableFilter";
import Dialog from "../Dialog";

type TableToolbarProps = {
  numSelected: number;
  handleDeleteSelected: VoidFunction;
  filters?: TFilterItem[];
  titleTable?: string;
};

const TableToolbar: React.FC<TableToolbarProps> = ({
  numSelected,
  handleDeleteSelected,
  filters,
  titleTable,
}) => {
  const { t } = useTranslation();

  return (
    <WrapToolbarStyled>
      {numSelected > 0 ? (
        <Typography variant="h5">
          {numSelected} {t("COMMON.selected")}
        </Typography>
      ) : (
        <TypographyStyled variant="h5">
          {titleTable ?? t("COMMON.table")}
        </TypographyStyled>
      )}
      {numSelected > 0 && (
        <Dialog
          handleAgree={handleDeleteSelected}
          renderButton={(toggle) => (
            <Box
              sx={{
                cursor: "pointer",
              }}
              onClick={toggle}
            >
              <Tooltip title="Delete">
                <Fab color="error" aria-label="delete" size="small">
                  <IconTrash size={15} />
                </Fab>
              </Tooltip>
            </Box>
          )}
          renderContent={
            <Typography>
              {t("COMMON.areYouSureWantToDeleteSelected")}
            </Typography>
          }
        />
      )}
      {numSelected === 0 && filters && <TableFilter filters={filters} />}
    </WrapToolbarStyled>
  );
};

export default TableToolbar;
