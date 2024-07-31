export type PaginationType = {
  total?: number;
  limit?: number;
  page?: number;
};

export type Option = {
  label: string;
  value: string;
};

export enum ESortOrder {
  ASC = "1",
  DESC = "-1",
}

export interface IQuery {
  page: number;
  limit: number;
  order: string;
  orderBy: string;
  dateFrom: string;
  dateTo: string;
  search: string;
  active: boolean;
}
