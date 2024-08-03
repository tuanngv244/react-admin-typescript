export interface IMemberStatistic {
  users: number;
  students: number;
  instructors: number;
  subscribes: number;
}

export interface IRevenueStatistic {
  thisYear: { [month: string]: number }[];
  prevYear: { [month: string]: number }[];
}
