export type userGrowthChartType = {
  day?: string;
  month?: string;
  totalActiveUsers: number;
};
export type joinedUsersType = {
  users: joinedUsers[];
  page: number;
  take: number;
  totalUsers: number;
  pageCount: number;
  hasNextPage: boolean;
};
export type joinedUsers = {
  emailId:string, 
  email:string,
  SubscribedAt:string,
  optional?:string
};
export enum PresetTimeFrameType {
  "default" = "",
  "Today" = "Today",
  "Yesterday" = "Yesterday",
  "ThisWeek" = "ThisWeek",
  "LastWeek" = "LastWeek",
  "ThisMonth" = "ThisMonth",
  "LastMonth" = "LastMonth",
  "ThisYear" = "ThisYear",
  "LastYear" = "LastYear",
}