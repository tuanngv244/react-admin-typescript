import Breadcrumb from "@/components/Breadcrumb";
import Input from "@/components/Input";
import { useSearchQuery } from "@/hooks/useSearchQuery";
import {
  OutlinedInputStyled,
  BoxHeadStyled,
} from "@/layouts/ListPageLayout/styled";
import { Box, Button, InputAdornment } from "@mui/material";
import { IconSearch } from "@tabler/icons-react";
import debounce from "lodash/debounce";
import React, { ChangeEvent, ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

type ListPageLayoutProps = {
  pageTitle: string;
  renderTable: ReactNode;
  createPath?: string;
  hideSearch?: boolean;
  searchPlaceholder?: string;
  breadCrumbs: { title: string; to?: string }[];
};

const ListPageLayout: React.FC<ListPageLayoutProps> = ({
  pageTitle,
  renderTable,
  hideSearch,
  createPath,
  searchPlaceholder,
  breadCrumbs,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { _onSetSearchParams } = useSearchQuery();
  const title = pageTitle.charAt(0).toUpperCase() + pageTitle.slice(1);

  const _onSearchChange = debounce((ev: ChangeEvent<HTMLInputElement>) => {
    _onSetSearchParams({ search: ev.target?.value });
  }, 500);

  return (
    <Box
      className="ListPageLayout"
      sx={{
        marginTop: "20px",
      }}
    >
      <Breadcrumb title={title} items={breadCrumbs || []} />
      <BoxHeadStyled>
        <Button
          onClick={() => navigate(createPath || location.pathname + "/create")}
          color="primary"
          variant="contained"
          size="large"
        >
          {t("COMMON.create")} {pageTitle}
        </Button>
        {!hideSearch && (
          <Input
            renderInput={() => (
              <OutlinedInputStyled
                onChange={_onSearchChange}
                placeholder={searchPlaceholder}
                className="customInput"
                startAdornment={
                  <InputAdornment position="start">
                    <IconSearch size={"16"} />
                  </InputAdornment>
                }
              />
            )}
          />
        )}
      </BoxHeadStyled>
      {renderTable}
    </Box>
  );
};

export default ListPageLayout;
