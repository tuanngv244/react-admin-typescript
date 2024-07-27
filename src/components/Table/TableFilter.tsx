import {
  BodyPanelStyled,
  BoxFilterIconStyled,
  FooterPanelStyled,
  HeaderPanelStyled,
  LabelItemStyled,
  PanelPopoverStyled,
} from "@/components/Table/styled";
import { DATE_FORMATS } from "@/constants/format";
import { useSearchQuery } from "@/hooks";
import { Option } from "@/types/general";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import {
  Box,
  Button,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import React from "react";
import { useTranslation } from "react-i18next";

export type TFilterItem = {
  label: string;
  type: "DATE" | "SELECT" | "MULTIPLE_SELECT";
  key: string;
  options?: Option[];
};

type TFilterProps = {
  filters: TFilterItem[];
};

const TableFilter: React.FC<TFilterProps> = ({ filters }) => {
  const { t } = useTranslation();
  const { searchParams, _onSetSearchParams } = useSearchQuery<{
    [key: string]: string;
  }>();
  const [anchorEl, setAnchorEl] = React.useState<HTMLDivElement | null>(null);
  const open = Boolean(anchorEl);

  const _onOpen = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const _onClose = () => {
    setAnchorEl(null);
  };

  const _onReset = () => {
    const filterKeys = filters.reduce((acc, curr) => {
      acc[curr.key] = undefined;
      return acc;
    }, {} as { [key: string]: undefined });

    _onSetSearchParams({ ...searchParams, ...filterKeys });
  };

  const _onSelectChange = (value: string, key: string) => {
    _onSetSearchParams({ ...searchParams, [key]: value });
  };

  return (
    <React.Fragment>
      <BoxFilterIconStyled component={"div"} onClick={_onOpen}>
        <FilterAltIcon />
      </BoxFilterIconStyled>
      <PanelPopoverStyled
        anchorEl={anchorEl}
        open={open}
        onClose={_onClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <HeaderPanelStyled>
          <h6>{t("COMMON.filter")}</h6>
        </HeaderPanelStyled>
        <BodyPanelStyled>
          {filters?.map((item, index) => {
            const { type, options, key, label } = item;
            if (type === "SELECT")
              return (
                <Box key={index}>
                  <LabelItemStyled>{label}</LabelItemStyled>
                  <Select
                    fullWidth
                    value={searchParams[key] || ""}
                    sx={{ marginTop: "0 !important" }}
                    onChange={(ev: SelectChangeEvent) =>
                      _onSelectChange(ev.target.value, key)
                    }
                  >
                    {options?.map((option, index) => (
                      <MenuItem key={index} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </Box>
              );
            if (type === "DATE")
              return (
                <Box key={index}>
                  <LabelItemStyled>{label}</LabelItemStyled>
                  <DatePicker
                    value={dayjs(searchParams?.[key])}
                    sx={{ width: "100%" }}
                    format={DATE_FORMATS.DATE}
                    onChange={(value: Dayjs | null) =>
                      _onSelectChange(
                        dayjs(value).format(DATE_FORMATS.DATE),
                        key
                      )
                    }
                    slots={{
                      textField: (params) => <TextField {...params} />,
                    }}
                  />
                </Box>
              );
            return <div key={index}></div>;
          })}
        </BodyPanelStyled>
        <FooterPanelStyled>
          <Button variant="outlined" color="error" onClick={_onClose}>
            {t("COMMON.cancel")}
          </Button>
          <Button onClick={_onReset}>{t("COMMON.reset")}</Button>
        </FooterPanelStyled>
      </PanelPopoverStyled>
    </React.Fragment>
  );
};

export default TableFilter;
