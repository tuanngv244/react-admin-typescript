import Checkbox from "@/components/Checkbox";
import { SxProps, TableCell, TableRow as TableRowBase } from "@mui/material";
import { ChangeEvent } from "react";
import { ColumnsType } from ".";

type TableRowProps<RecordType extends object = any> = {
  data: RecordType;
  columns: ColumnsType<RecordType>[];
  rowStyles?: SxProps;
  hideSelecting?: boolean;
  isSelected?: boolean;
  hover?: boolean;
  handleSelectedChange?: (recordId: string, checked: boolean) => void;
  onClickRows?: () => void;
};

// enableLinkRows: clickable row in table

const TableRow: React.FC<TableRowProps> = ({
  data,
  columns,
  hideSelecting,
  rowStyles,
  handleSelectedChange,
  isSelected,
  hover,
  onClickRows,
}) => {
  return (
    <TableRowBase
      hover={hover}
      sx={{
        "&:last-child td, &:last-child th": { borderBottom: 0 },
        ...rowStyles,
      }}
    >
      {/* Using for case need render select record */}
      {!hideSelecting && (
        <TableCell>
          <Checkbox
            color="primary"
            checked={isSelected}
            onChange={(ev: ChangeEvent<HTMLInputElement>) =>
              handleSelectedChange?.(data.id, ev.target?.checked)
            }
          />
        </TableCell>
      )}
      {columns.map((column, idx) => {
        const { render, columnStyles, columnWidth, disableClick } = column;

        const findData = data[column.key]; // auto required column.index to get info render data.

        // Using for case need custom render outside with record data
        if (render && typeof render === "function")
          return (
            <TableCell
              key={idx}
              sx={{
                width: `${columnWidth}%`,
                wordBreak: "break-word",
                position: "relative",
                ...columnStyles,
              }}
              onClick={() => {
                if (disableClick) {
                  return;
                }
                onClickRows?.();
              }}
            >
              {render(data)}
            </TableCell>
          );

        // Using for case need auto render follow get record data by index key
        return (
          <TableCell
            key={idx}
            sx={{
              width: `${columnWidth}%`,
              wordBreak: "break-word",
              ...columnStyles,
            }}
            onClick={() => {
              if (!disableClick) {
                return;
              }
              onClickRows?.();
            }}
          >
            {findData}
          </TableCell>
        );
      })}
    </TableRowBase>
  );
};

export default TableRow;
