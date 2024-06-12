import React, { useRef } from "react";
import { ChangeEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { Subscribers } from "../../../store/features/admin/users/joinedUsersSlice";
import UsersTable from ".";
import paginationStyles from "../../../pages/adminBoard/styles/styles";
import ReactPaginate from "react-paginate";
import CustomDropdown from "../../customDropdown";
import { handleFilterDate } from "../../../helpers/adminDateFilter";
import DatePicker from "../../model/datePickerModel";
import { useAppContext } from "../../../context";
import AdminSearchBox from "../../searchBox/adminSearchBox";
import usernotfound from "../../../assets/undraw_no_data_re_kwbl 1.svg";
import TableSkeleton from "./tableSkeleton";
import { Icon } from "@iconify/react";
import { PresetTimeFrameType } from "../../../types/admin/users";
import ExportUser from "./exportUsers";

const JoinedUsersTable = () => {
  // const users = useAppSelector((state) => state.users);

  const dispatch = useAppDispatch();
  const { setIsSessionEnd, setIsServerError } = useAppContext();
  const [page, setPage] = useState(1);
  const [clearFilter, setClearFilter] = useState(new Date().getTime());
  const [showClearFilter, setShowClearFilter] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState("ASC");
  const [filterSortBy, setFilterSortBy] = useState("Oldest-Newest");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [searchFilter, setSearchFilter] = useState("All");
  const [filterSearchFilter, setFilterSearchFilter] = useState("Search By");
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [filterName, setFilterName] = useState("Select Date Range");
  const [dateFilters, setDateFilters] = useState<{
    StartDate?: string;
    EndDate?: string;
    presetTimeFrame?: PresetTimeFrameType;
  }>({
    StartDate: "",
    EndDate: "",
    presetTimeFrame: PresetTimeFrameType.default,
  });
  const [searchValue, setSearchValue] = useState("");
  const modalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    dispatch(
      Subscribers({
        page: 1,
        searchOption: "All",
        sortingOptions: "ASC",
      })
    );
  }, [dispatch]);
  const users = {
    fechingError: { statusCode: "0" },
    dataFetching: false,
    dataLoading: false,
    SubscribersData: {
      users: [
        {
          emailId: "1",
          email: "example@gemail.com",
          SubscribedAt: "11th Mar 2024",
        },
        {
          emailId: "1",
          email: "example@gemail.com",
          SubscribedAt: "11th Mar 2024",
        },
        {
          emailId: "1",
          email: "example@gemail.com",
          SubscribedAt: "11th Mar 2024",
        },
      ],
      page: 1,
      take: 1,
      totalUsers: 1,
      pageCount: 1,
      hasNextPage: false,
    },
  };
  useEffect(() => {
    const isAuthError = `${users.fechingError?.statusCode}`.includes("401");
    const dataFetching = !users.dataFetching && !users.dataLoading;
    if (isAuthError && dataFetching) {
      // setIsSessionEnd(true);
    }

    const isServerError = `${users.fechingError?.statusCode}`.includes("50");
    if (isServerError) {
      // setIsServerError(true);
    }
  });
  const handlePageClick = (data: { selected: number }) => {
    if (data.selected + 1 > users.SubscribersData.pageCount) {
      setPage(users.SubscribersData.pageCount);
      dispatch(
        Subscribers({
          page: page,
          searchOption: handleSearchOption(),
          sortingOptions: sortBy,
          searchTerm: handleSearchTerm(),
          fromDate: dateFilters.StartDate,
          toDate: dateFilters.EndDate,
        })
      );
    } else {
      setPage(data.selected + 1);
      dispatch(
        Subscribers({
          page: data.selected + 1,
          searchOption: handleSearchOption(),
          sortingOptions: sortBy,
          searchTerm: handleSearchTerm(),
          fromDate: dateFilters.StartDate,
          toDate: dateFilters.EndDate,
        })
      );
    }
  };
  const handleSearch = () => {
    searchValue.length > 0 &&
      dispatch(
        Subscribers({
          page: 1,
          searchOption: handleSearchOption(),
          sortingOptions: sortBy,
          searchTerm: handleSearchTerm(),
          fromDate: dateFilters.StartDate,
          toDate: dateFilters.EndDate,
        })
      );
  };
  const handleClearFilter = () => {
    setClearFilter(new Date().getTime());
    setFilterName("Select Date Range");
    setSearchValue("");
    setSearchFilter("All");
    setFilterSearchFilter("Search By");
    setSortBy("ASC");
    setFilterSortBy("Oldest-Newest");
    setDateFilters({
      StartDate: "",
      EndDate: "",
      presetTimeFrame: PresetTimeFrameType.default,
    });
    dispatch(
      Subscribers({
        page: 1,
        searchOption: "All",
        sortingOptions: "ASC",
      })
    );
    setShowClearFilter(false);
  };
  const handleSearchTerm = () => {
    if (searchFilter !== "All") return searchValue;
  };
  const handleSearchOption = () => {
    if (searchValue.length <= 0) return "All";
    return searchFilter;
  };
  const pickDate = [
    "Select Custom date",
    "Today",
    "Yesterday",
    "This Week",
    "Last Week",
    "This Month",
    "Last Month",
    "This Year",
    "Last Year",
    "Clear",
  ];
  const tableTitle = ["Email ID", "Email", "Subscribed On"];
  return (
    <div className=" py-2 lg:p-1 xl:p-2 ">
      <div
        key={clearFilter}
        className="flex flex-row flex-wrap justify-between px-2 pb-4 gap-2"
      >
        <div className="flex w-full sm:w-auto 2xl:w-[30%] border border-gray-300 rounded-lg  dark:bg-defaultGray dark:border-gray-600">
          <CustomDropdown
            name={filterSearchFilter}
            type={"searchAdmin"}
            listItems={["Email Id", "Email"]}
            handleClick={(item: string | number) => {
              setFilterSearchFilter(String(item));
              setShowClearFilter(true);
              setSearchFilter(
                item === "Name"
                  ? "UserName"
                  : item === "Phone Number"
                  ? "Phone"
                  : String(item)
              );
            }}
          />
          <AdminSearchBox
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            handleSearch={handleSearch}
            disabled={!searchValue || filterSearchFilter === "Search By"}
            inputType={
              filterSearchFilter.toLowerCase().includes("id")
                ? "number"
                : "text"
            }
            handleCleanSearch={(e: ChangeEvent<HTMLInputElement>) => {
              const value = e.target.value;
              if (value.length === 0 && filterSearchFilter !== "Search By") {
                dispatch(
                  Subscribers({
                    page: 1,
                    searchOption: "All",

                    sortingOptions: sortBy,
                    fromDate: dateFilters.StartDate,
                    toDate: dateFilters.EndDate,
                  })
                );
              }
            }}
          />
        </div>
        <div>
          <CustomDropdown
            name={filterName}
            type={"admin"}
            filterName={filterName}
            listItems={pickDate}
            handleClick={(value) => {
              setShowClearFilter(true);
              if (value === "Select Custom date") {
                setDateFilters({
                  ...dateFilters,
                  presetTimeFrame: PresetTimeFrameType.default,
                });
                setIsModelOpen(true);
              } else if (value === "Clear") {
                setFilterName("Select Date Range");
                filterSortBy !== "Oldest-Newest" ||
                filterSearchFilter !== "Search By"
                  ? setShowClearFilter(true)
                  : setShowClearFilter(false);
                setDateFilters({
                  StartDate: "",
                  EndDate: "",
                  presetTimeFrame: PresetTimeFrameType.default,
                });
                dispatch(
                  Subscribers({
                    page: 1,
                    searchOption: handleSearchOption(),

                    sortingOptions: sortBy,
                    searchTerm: handleSearchTerm(),
                  })
                );
              } else {
                setFilterName(String(value));
                const result = handleFilterDate(value);
                setDateFilters({
                  StartDate: "",
                  EndDate: "",
                  presetTimeFrame: result.presetTimeFrame,
                });
                dispatch(
                  Subscribers({
                    page: 1,
                    searchOption: handleSearchOption(),

                    sortingOptions: sortBy,
                    searchTerm: handleSearchTerm(),
                    presetTimeFrame: result.presetTimeFrame,
                  })
                );
              }
            }}
          />
          <DatePicker
            isModelOpen={isModelOpen}
            setIsModelOpen={setIsModelOpen}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            handleDatePicker={(startDate: string, endDate: string) => {
              setFilterName(`${startDate} - ${endDate}`);
              setDateFilters({
                ...dateFilters,
                presetTimeFrame: PresetTimeFrameType.default,
                StartDate: startDate,
                EndDate: endDate,
              });

              dispatch(
                Subscribers({
                  page: 1,
                  searchOption: handleSearchOption(),

                  sortingOptions: sortBy,
                  searchTerm: handleSearchTerm(),
                  fromDate: startDate,
                  toDate: endDate,
                })
              );
            }}
          />
        </div>
        <CustomDropdown
          name={filterSortBy}
          type={"admin"}
          listItems={["Oldest-Newest", "Newest-Oldest"]}
          handleClick={(item: string | number) => {
            item !== "Oldest-Newest" || filterSearchFilter !== "Search By"
              ? setShowClearFilter(true)
              : setShowClearFilter(false);
            setSortBy(item === "Oldest-Newest" ? "ASC" : "DESC");
            setFilterSortBy(String(item));
            dispatch(
              Subscribers({
                page: 1,
                searchOption: handleSearchOption(),

                sortingOptions: item === "Oldest-Newest" ? "ASC" : "DESC",
                searchTerm: handleSearchTerm(),
                fromDate: dateFilters.StartDate,
                toDate: dateFilters.EndDate,
              })
            );
          }}
        />
        <div
          onClick={() => {
            handleClearFilter();
          }}
          className={
            showClearFilter
              ? "flex flex-row items-center gap-2 p-2  text-sm font-medium cursor-pointer text-[#0F86E5]"
              : "hidden"
          }
        >
          {" "}
          <Icon
            icon="tabler:filter-x"
            strokeWidth={100}
            width="24"
            height="24"
            fill="#0F86E5"
          />
          Clear Filters
        </div>
        <div
          className="flex flex-row items-center gap-2 p-2 border text-sm rounded-lg cursor-pointer dark:border-defaultGray"
          onClick={() => modalRef.current?.showModal()}
        >
          <Icon icon="ph:export" width="18" height="20" />
          Export Users
        </div>
        {/* export users modal */}
        {/* <ExportUser modalRef={modalRef} /> */}
      </div>
      {users.dataLoading ? (
        <TableSkeleton
          tableTitle={tableTitle}
          dataloading={users.dataLoading}
        />
      ) : users.SubscribersData?.users?.length <= 0 ? (
        <div className="w-full flex flex-col gap-3 items-center justify-center h-[400px] border rounded-lg border-defaultGray border-opacity-10">
          <img src={usernotfound} alt="userNotFound.png" />
          <span className="text-defaultGreen font-bold text-base">
            User not found
          </span>
        </div>
      ) : (
        <div className="sm:border sm:rounded-t-lg sm:border-defaultGray sm:border-opacity-10 ">
          <UsersTable
            tableTitle={tableTitle}
            tableData={users.SubscribersData.users}
          />
        </div>
      )}
      <div
        className={`${
          users.SubscribersData?.users?.length <= 0
            ? "hidden"
            : "w-full flex flex-row justify-center sm:justify-between mr-5 p-1 sm:border-r sm:border-l sm:border-b rounded-b-lg border-defaultGray border-opacity-10 "
        }`}
      >
        {users.dataLoading && (
          <div className="flex">
            <span className="loading loading-dots loading-md text-defaultTextColor dark:text-defaultGray ml-4"></span>{" "}
            <span className="loading loading-dots loading-md text-defaultTextColor dark:text-defaultGray ml-4"></span>
          </div>
        )}
        <div
          className={`${
            users.SubscribersData?.users?.length <= 0
              ? "hidden"
              : "w-full flex justify-center sm:justify-end sm:py-2 sm:px-1"
          }`}
        >
          <div className=" mt-2 px-2 text-center text-sm font-medium">
            <span>Pages</span> <span>{page}</span> <span> of </span>
            <span> {users.SubscribersData.pageCount}</span>
          </div>
          <ReactPaginate
            onPageChange={handlePageClick}
            previousLabel={
              <Icon icon="uil:angle-left" width="30" height="30" />
            }
            nextLabel={<Icon icon="uil:angle-right" width="30" height="30" />}
            breakLabel={".."}
            pageCount={Math.ceil(users.SubscribersData.pageCount)}
            marginPagesDisplayed={1}
            pageRangeDisplayed={2}
            containerClassName={
              "flex  flex-row rounded-3xl   dark:bg-defaultGray  "
            }
            pageClassName={
              "border dark:border-gray-700 dark:bg-defaultBlack bg-white px-2 py-1 text-black dark:text-defaultTextColor"
            }
            breakClassName={
              "border dark:border-gray-700 dark:bg-defaultBlack bg-white px-2 py-1 text-black dark:text-defaultTextColor"
            }
            pageLinkClassName={"px-1  text-dark"}
            breakLinkClassName={"px-1  text-dark"}
            previousClassName={paginationStyles.previous}
            previousLinkClassName={paginationStyles.previous}
            nextClassName={paginationStyles.next}
            nextLinkClassName={paginationStyles.next}
            activeClassName={paginationStyles.activePagination}
            activeLinkClassName={paginationStyles.activePaginationLink}
          />
        </div>
      </div>
    </div>
  );
};

export default JoinedUsersTable;
