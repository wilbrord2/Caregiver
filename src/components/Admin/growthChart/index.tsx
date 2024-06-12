import React, { useEffect, useState } from "react";
import CustomDropdown from "../../customDropdown";
import { getDateInfo } from "../../../helpers/getDateInfo";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
} from "chart.js";
import { useAppContext } from "../../../context";
import { State } from "../../../store/features/admin/users/joinedUsersSlice";
import { AsyncThunk } from "@reduxjs/toolkit";
import { userGrowthChartType } from "../../../types/admin/users";
import { useAppDispatch } from "../../../hooks";
import { UserGrouthSkeleton } from "../../../pages/skeletons";
import CustomTooltip from "../../tooltip";
ChartJS.register(CategoryScale, Tooltip, LinearScale, BarElement);

type FiltersType = {
  year: string;
  month: number;
};
type graphData ={
  fechingError:string,
  dataFetching:boolean,
  userGrowthReport:userGrowthChartType[],
}
interface Props {
  graphTitle: string;
  graphLabels: {
    labelYAxis: string;
    label1: string;
  };
  graphData:graphData;
  usersYearlyReport: AsyncThunk<userGrowthChartType, { year: number }, {}>;
  usersMonthyReport: AsyncThunk<
    userGrowthChartType,
    { year: number; month: number },
    {}
  >;
  graphFilters: FiltersType;
  timeFrameValue: string | number;
  setTimeFrameValue: (timeFrameValue: string | number) => void;
  setGraphFilters: (filters: FiltersType) => void;
}

const GrowthChart = ({
  graphTitle,
  graphLabels,
  graphData,
  graphFilters,
  timeFrameValue,
  setTimeFrameValue,
  setGraphFilters,
  usersYearlyReport,
  usersMonthyReport,
}: Props) => {
  const { isDarkMode, setIsSessionEnd, setIsServerError } = useAppContext();
  const dispatch = useAppDispatch();
  const { months, years } = getDateInfo();
  const [windowWidth, setWindowWidth] = useState(getWindowSize());

  useEffect(() => {
    if (timeFrameValue === "Yearly") {
      dispatch(usersYearlyReport({ year: Number(graphFilters.year) }));
    }
    if (timeFrameValue === "Monthly") {
      dispatch(
        usersMonthyReport({
          year: Number(graphFilters.year),
          month: graphFilters.month,
        })
      );
    }
  }, [graphFilters, timeFrameValue]);

  useEffect(() => {
    const isAuthError = `${graphData.fechingError}`.includes("401");
    if (isAuthError) {
      // setIsSessionEnd(true);
    }

    const isServerError = `${graphData.fechingError}`.includes("50");
    if (isServerError) {
      // setIsServerError(true);
    }
  });

  const data = {
    labels: graphData.userGrowthReport.map((x) => x.month || x.day),
    color: isDarkMode ? "#3D404B" : "#D9D9D9",
    datasets: [
      {
        label: graphLabels.label1,
        data: graphData.userGrowthReport.map((x) => x.totalActiveUsers),
        backgroundColor: "#1E4D80",
        borderRadius: 2,
        barThickness: 20,
      },
      
    ],
  };
  useEffect(() => {
    function handleWindowResize() {
      setWindowWidth(getWindowSize());
    }
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <div
      className="relative max-md:w-full min-h-[400px] mt-10 md:block rounded-lg shadow-sm shadow-gray-400 dark:shadow-defaultGray p-2 sm:p-4 sm:mx-4"
      style={{
        width: `${
          windowWidth.innerWidth >= 1100
            ? windowWidth.innerWidth - 290
            : windowWidth.innerWidth >= 1024
            ? windowWidth.innerWidth - 287
            : windowWidth.innerWidth >= 640
            ? windowWidth.innerWidth - 51
            : windowWidth.innerWidth - 35
        }px `,
      }}
    >
      {graphData.dataFetching ? (
        <div className="w-1/6">
          <UserGrouthSkeleton height={"20px"} />
        </div>
      ) : (
        <h2 className="font-bold text-sm"> {graphTitle} </h2>
      )}

      {graphData.dataFetching ? (
        <div className="md:w-1/4 w-1/">
          <UserGrouthSkeleton height={"30px"} />
        </div>
      ) : (
        <div className="flex flex-row gap-4 mt-4 mb-4">
          <div tabIndex={-1} className="flex gap-4 relative self-start">
            <CustomDropdown
              name={timeFrameValue.toString()}
              listItems={["Yearly", "Monthly"]}
              handleClick={(value: string | number) => setTimeFrameValue(value)}
            />
          </div>
          <div className="self-start flex max-sm:w-full max-sm:justify-end max-sm:items-center flex-wrap  gap-4">
            <CustomDropdown
              name={graphFilters.year}
              listItems={years}
              handleClick={(value) => {
                setGraphFilters({
                  ...graphFilters,
                  year: value.toString(),
                  month: new Date().getMonth() + 1,
                });
              }}
            />
            {timeFrameValue === "Monthly" && (
              <CustomDropdown
                name={months[graphFilters.month - 1]}
                month={graphFilters.month}
                listItems={
                  graphFilters.year === new Date().getFullYear().toString()
                    ? months.slice(0, new Date().getMonth() + 1)
                    : months
                }
                handleClick={(value) => {
                  setGraphFilters({
                    ...graphFilters,
                    month: months.indexOf(value.toString()) + 1,
                  });
                  dispatch(
                    usersMonthyReport({
                      year: Number(graphFilters.year),
                      month: months.indexOf(value.toString()) + 1,
                    })
                  );
                }}
              />
            )}
          </div>
        </div>
      )}

      {graphData.dataFetching ? (
        <div className="w-full">
          <UserGrouthSkeleton height={"300px"} />
        </div>
      ) : (
        <div className=" w-full overflow-x-auto">
          <div
            className={`h-[400px]`}
          >
            <Bar
              height={"inherit"}
              width={"inherit"}
              data={data}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: "bottom",
                    title: {
                      color: isDarkMode ? "#3D404B" : "#D9D9D9",
                    },
                  },
                },
                scales: {
                  
                  x: {
                    grid: {
                      color: isDarkMode ? "#3D404B" : "#D9D9D9",
                    },
                    ticks: {
                      color: isDarkMode ? "#CAD0D7" : "#121212",
                    },
                    
                  },
                  y: {
                    title: {
                      display: true,
                      text: graphLabels.labelYAxis,
                      color: isDarkMode ? "#787A7F" : "#000",
                      font: {
                        size: 13,
                        weight: 500,
                        family: "Arial",
                      },
                    },
                    grid: {
                      color: isDarkMode ? "#3D404B" : "#D9D9D9",
                    },
                    ticks: {
                      stepSize: 100,
                    },
                  },
                },
              }}
            />
          </div>
        </div>
      )}

      <div className="flex gap-6 ml-8 mt-4 text-sm">
        {graphData.dataFetching ? (
          <div className="w-1/6">
            <UserGrouthSkeleton height={"20px"} />
          </div>
        ) : (
          <span className="flex gap-2 items-center ">
            <span className="rounded-full block h-[15px] w-[15px] bg-defaultGreen">
              {" "}
            </span>
            <h2 className="font-medium text-xs">{graphLabels.label1} </h2>
            <CustomTooltip
              content={
                "Total number of subscribers within a certain period"
              }
            />
          </span>
        )}
      </div>
    </div>
  );
};

function getWindowSize() {
  const { innerWidth, innerHeight } = window;
  return { innerWidth, innerHeight };
}
export default GrowthChart;
