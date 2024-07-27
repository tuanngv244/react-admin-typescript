import {
  Box,
  Card,
  SxProps,
  TableBody,
  TableCell,
  Table as TableComponent,
  TableContainer,
  TableHead,
  TableRow as TableRowBase,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

import { useSearchQuery } from "@/hooks/useSearchQuery";
import { ESortOrder, PaginationType } from "@/types/general";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import React, {
  ChangeEvent,
  ReactNode,
  useCallback,
  useMemo,
  useState,
} from "react";

import TableRow from "./TableRow";
import TableToolbar from "./TableToolbar";
import Pagination from "@/components/Pagination";
import Loading from "@/components/Loading";
import Checkbox from "@/components/Checkbox";
import { WrapFilter } from "@/components/Table/styled";
import { TFilterItem } from "./TableFilter";

export type ColumnsType<RecordType extends object = any> = {
  key: string;
  label?: string;
  sortKey?: string;
  columnStyles?: SxProps;
  headColumnStyles?: SxProps;
  disableClick?: boolean;
  columnWidth?: number; // Column width is calculated as a percentage base on the value passed. Ex: 4 ---> 4%
  render?(record: RecordType, index?: number): ReactNode;
  renderHead?(index?: number): ReactNode;
};

export type TableProps<RecordType extends object = any> = {
  columns: ColumnsType<RecordType>[];
  loading?: boolean;
  data: RecordType[] | null;
  wrapTableStyles?: SxProps;
  rowStyles?: SxProps;
  headStyles?: SxProps;
  hidePagination?: boolean;
  pagination?: PaginationType;
  hideSelecting?: boolean;
  handleDeleteSelected?: (selected: string[], onSuccess: VoidFunction) => void;
  filters?: TFilterItem[];
  titleTable?: string;
  hover?: boolean;
  onClickRows?: (record: RecordType) => void;
};

const Table: React.FC<TableProps> = ({
  columns,
  loading,
  data,
  wrapTableStyles,
  rowStyles,
  headStyles,
  hidePagination = false,
  pagination,
  hideSelecting,
  handleDeleteSelected,
  filters,
  titleTable,
  onClickRows,
  hover,
}) => {
  const theme = useTheme();
  const borderColor = theme.palette.divider;
  const { searchParams, _onSetSearchParams } = useSearchQuery<{
    order: ESortOrder;
    orderBy: string;
  }>();
  const [selected, setSelected] = useState<string[]>([]);

  const handleSelectedAll = (ev: ChangeEvent<HTMLInputElement>) => {
    const checked = ev.target.checked;

    return !!data?.length && checked
      ? setSelected((prev) => [
          ...prev,
          ...data?.reduce((acc, curr) => {
            if (selected?.includes(curr.id)) return acc;
            acc.push(curr.id);
            return acc;
          }, []),
        ])
      : setSelected((prev) =>
          prev?.filter(
            (selectItem) => !data?.some((item) => item.id === selectItem)
          )
        );
  };
  const handleSelectedChange = (recordId: string, checked: boolean) => {
    checked
      ? setSelected((prev) => [...(prev || []), recordId])
      : setSelected((prev) => prev?.filter((item) => item !== recordId));
  };
  const handleSortChange = (sortKey: string) => {
    _onSetSearchParams({
      ...searchParams,
      order:
        searchParams?.order === ESortOrder.ASC
          ? ESortOrder.DESC
          : ESortOrder.ASC,
      orderBy: sortKey,
    });
  };

  const isSelectedAll = useMemo(() => {
    if (!!!selected?.length) return false;
    return data?.every((item) => selected?.includes(item.id));
  }, [selected, data]);

  const renderSortArrow = useCallback(
    (sortKey: string) => {
      return (
        <Box
          onClick={() => handleSortChange(sortKey)}
          className="sortArrow"
          sx={{
            position: "absolute",
            top: "0px",
            right: "-30px",
            opacity: 0,
            visibility: "hidden",
            width: "20px",
            height: "20px",
            cursor: "pointer",
            transition: "all .25s linear",
            svg: {
              width: "inherit",
              height: "inherit",
              transform: `rotate(${
                searchParams?.orderBy === sortKey &&
                searchParams?.order === ESortOrder.ASC
                  ? -180
                  : 0
              }deg)`,
              transition: "all .25s linear",
            },
          }}
        >
          <ArrowDownwardIcon />
        </Box>
      );
    },
    [searchParams]
  );

  return (
    <>
      {" "}
      <Card sx={{ padding: 0, border: `1px solid ${borderColor}` }}>
        <Box sx={wrapTableStyles}>
          <TableToolbar
            numSelected={selected?.length}
            handleDeleteSelected={() =>
              handleDeleteSelected?.(selected, () => setSelected([]))
            }
            filters={filters}
            titleTable={titleTable}
          />
          <Loading isLoading={loading || false} styles={{ width: "100%" }}>
            <TableContainer>
              <TableComponent
                sx={{
                  maxHeight: 600,
                  overflowY: data && data?.length > 10 ? "scroll" : "hidden",
                  whiteSpace: "nowrap",
                }}
                aria-label="table"
              >
                <TableHead
                  sx={{
                    ...headStyles,
                  }}
                >
                  <TableRowBase>
                    {!hideSelecting && (
                      <TableCell>
                        <Checkbox
                          checked={isSelectedAll}
                          onChange={handleSelectedAll}
                          tabIndex={-1}
                          inputProps={{
                            "aria-labelledby": "select all desserts",
                          }}
                        />
                      </TableCell>
                    )}
                    {columns.map((column, idx) => {
                      const {
                        key,
                        label,
                        renderHead,
                        headColumnStyles,
                        sortKey,
                      } = column;

                      return typeof renderHead === "function" ? (
                        <TableCell key={key}>
                          {renderHead(idx)}
                          {sortKey && renderSortArrow(sortKey)}
                        </TableCell>
                      ) : (
                        <TableCell
                          key={key}
                          sx={{
                            position: "relative",
                            fontWeight: 600,
                            "&:hover": {
                              ".sortArrow": {
                                opacity: 1,
                                visibility: "visible",
                              },
                            },
                            ...headColumnStyles,
                          }}
                        >
                          <WrapFilter>
                            {label}
                            {sortKey && renderSortArrow(sortKey)}
                          </WrapFilter>
                        </TableCell>
                      );
                    })}
                  </TableRowBase>
                </TableHead>
                <TableBody>
                  {data &&
                    data?.map((record, idx) => {
                      return (
                        <TableRow
                          hover={hover}
                          key={idx}
                          data={record}
                          columns={columns}
                          rowStyles={rowStyles}
                          hideSelecting={hideSelecting}
                          isSelected={selected?.includes(record.id)}
                          handleSelectedChange={handleSelectedChange}
                          onClickRows={() => onClickRows?.(record)}
                        />
                      );
                    })}
                </TableBody>
              </TableComponent>
            </TableContainer>
          </Loading>
        </Box>
      </Card>
      {!hidePagination && data && data.length > 0 && data?.length >= 10 && (
        <Pagination pagination={pagination} />
      )}
    </>
  );
};

export default Table;
