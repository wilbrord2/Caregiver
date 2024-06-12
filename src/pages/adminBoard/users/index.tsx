import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import {
  usersYearlyReport,
  usersMonthyReport,
} from "../../../store/features/admin/users/joinedUsersSlice";

import GrowthChart from "../../../components/Admin/growthChart";
import TopBasicInfo from "./TopBasicInfo";
import {} from "../../../store/features/admin/users/usersSlice";
import JoinedUsersTable from "../../../components/Admin/userTable/joinedUsersTable";

function UsersPage() {
  // const userChartReport = useAppSelector((state) => state.users);
  const userChartReport = {
    fechingError: "",
    dataFetching: false,
    userGrowthReport: [
      {
        day: "Jan",
        month: "Jan",
        totalActiveUsers: 10,
      },
      {
        day: "Feb",
        month: "Feb",
        totalActiveUsers: 30,
      },
      {
        day: "Mar",
        month: "Mar",
        totalActiveUsers: 20,
      },
      {
        day: "May",
        month: "May",
        totalActiveUsers: 5,
      },
    ],
  };
  const dispatch = useAppDispatch();
  const [timeFrameValue, setTimeFrameValue] = useState<string | number>(
    "Yearly"
  );
  const [graphFilters, setGraphFilters] = useState({
    year: `${new Date().getFullYear()}`,
    month: new Date().getMonth() + 1,
  });
  const [tableDisplayed, setTableDisplayed] = useState("users");
  const labels = {
    label1: "Total Subscribers",
    labelYAxis: "Number of Subscribers",
  };

  return (
    <div>
      {/* Top basic info card */}
      <TopBasicInfo />
      {/* User growth chart */}
      <GrowthChart
        usersYearlyReport={usersYearlyReport}
        usersMonthyReport={usersMonthyReport}
        graphData={userChartReport}
        graphFilters={graphFilters}
        timeFrameValue={timeFrameValue}
        setTimeFrameValue={setTimeFrameValue}
        setGraphFilters={setGraphFilters}
        graphTitle={"Subscribers Growth Chart"}
        graphLabels={labels}
      />
      <div className="py-2 md:py-4 md:mx-4">
        {/* Table titles, Joined user Table and Pending invitation Table */}
        <div className=" flex items-center justify-center gap-4  w-full">
          <span
            className={`text-xl text-defaultGreen p-2 border-b border-opacity-5 dark:border-defaultGray border-x-defaultTextColor font-bold flex gap-1 items-center`}
          >
            Subscribers Table
          </span>
        </div>
      </div>
      <JoinedUsersTable />
    </div>
  );
}
export default UsersPage;