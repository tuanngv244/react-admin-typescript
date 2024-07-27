import * as React from "react";
import TablePagination from "@mui/material/TablePagination";
import { useSearchQuery } from "@/hooks/useSearchQuery";
import { PaginationType } from "@/types/general";

type PaginationProps = {
  pagination?: PaginationType;
};

const Pagination = <T extends object = any>({
  pagination,
}: PaginationProps) => {
  const { searchParams, _onSetSearchParams } = useSearchQuery<
    { limit: number; page: number } & T
  >();

  const handleChangePage = (
    _: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    const page = newPage + 1;
    // Default TablePagination receive page start is 0 so when we change paging need plus 1 more.
    _onSetSearchParams({ limit: searchParams?.limit, page } as T);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const limit = parseInt(event.target.value, 10);
    _onSetSearchParams({ limit: limit, page: searchParams?.page } as T);
  };

  return (
    <TablePagination
      component="div"
      count={pagination?.total || 0}
      page={Number(searchParams?.page || 1) - 1}
      onPageChange={handleChangePage}
      rowsPerPage={Number(searchParams?.limit || 10)}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  );
};

export default Pagination;
