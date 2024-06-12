import { RefObject, useEffect, useState } from "react";
import { PresetTimeFrameType } from "../../../types/admin/users";
import CustomDropdown from "../../customDropdown";
import { handleFilterDate } from "../../../helpers/adminDateFilter";
import DatePicker from "../../model/datePickerModel";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { getExportUsers } from "../../../store/features/admin/users/joinedUsersSlice";
import Toast from "../../toast";
import { Icon } from "@iconify/react";
import { useAppContext } from "../../../context";

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

const tableTitle = [
  "ID",
  "Name",
  "Phone",
  "Email",
  "Contributed",
  "Withdrawn",
  "Joined",
  "Status",
];

let columnsKey = new Date().getMilliseconds();

const ExportUser = ({
  modalRef,
}: {
  modalRef: RefObject<HTMLDialogElement>;
}) => {
  const users = useAppSelector((state) => state.users);
  const { setIsSessionEnd, setIsServerError, isDarkMode } = useAppContext();
  const dispatch = useAppDispatch();
  const [fileFormat, setFileFormat] = useState<"Excel" | "Pdf">("Excel");
  const [columns, setColumns] = useState<string[]>(tableTitle);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filterName, setFilterName] = useState("Select Date Range");
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [activeFilterProduct, setActiveFilterProduct] = useState("All");
  const [activeFilterUsers, setActiveFilterUsers] = useState("All");
  const [filterSortBy, setFilterSortBy] = useState("ASC");
  const [dateFilters, setDateFilters] = useState<{
    StartDate?: string;
    EndDate?: string;
    presetTimeFrame?: PresetTimeFrameType;
  }>({
    StartDate: "",
    EndDate: "",
    presetTimeFrame: PresetTimeFrameType.default,
  });
  const [isErrorExporting, setIsErrorExporting] = useState(false);
  const [isSuccessExporting, setIsSuccessExporting] = useState(false);

  const closeModal = () => {
    columnsKey = new Date().getMilliseconds();
    setColumns(() => tableTitle);
    setFileFormat("Excel");
    setActiveFilterProduct("All");
    setActiveFilterUsers("All");
    setFilterName("Select Date Range");
    setDateFilters({
      StartDate: "",
      EndDate: "",
      presetTimeFrame: PresetTimeFrameType.default,
    });
    setFilterSortBy("ASC");
    setIsErrorExporting(false);
    setIsSuccessExporting(false);
    modalRef.current?.close();
  };

  useEffect(() => {
    if (!users.exportUsersError.message && users.confirmExportMessage) {
      setIsErrorExporting(false);
      setIsSuccessExporting(true);
    } else if (users.exportUsersError.message && !users.confirmExportMessage) {
      setIsErrorExporting(true);
      setIsSuccessExporting(false);
    }

    let id = setTimeout(() => {
      setIsErrorExporting(false);
      setIsSuccessExporting(false);
      if (!users.exportUsersError.message && users.confirmExportMessage) {
        closeModal();
      }
    }, 5000);
    return () => clearTimeout(id);
  }, [users.exportLoading]);

  useEffect(() => {
    const isAuthError = `${users.exportUsersError.statusCode}`.includes("401");
    if (isAuthError) {
      modalRef.current?.close();
      setIsSessionEnd(true);
    }

    const isServerError = `${users.exportUsersError?.statusCode}`.includes(
      "50"
    );
    if (isServerError) {
      modalRef.current?.close();
      setIsServerError(true);
    }
  });

  const displayTitle = (titleValue: string) => {
    titleValue = titleValue.toLowerCase();
    if (titleValue === "id") return "User ID";
    else if (titleValue === "name") return "Name";
    else if (titleValue === "phone") return "Phone Number";
    else if (titleValue === "email") return "Associated Email";
    else if (titleValue === "contributed") return "Contributed Amount (RWF)";
    else if (titleValue === "withdrawn") return "Withdrawn Amount(RWF)";
    else if (titleValue === "joined") return "Date Joined";
    else if (titleValue === "status") return "Status";
  };

  return (
    <div key={columnsKey}>
      <dialog ref={modalRef} className="modal text-sm">
        <div className="modal-box  bg-white text-defaultBlack dark:bg-defaultBlack dark:text-white rounded-lg p-4">
          <form>
            <button
              className="btn btn-sm btn-circle  btn-ghost absolute right-2 top-2 font-bold"
              onClick={(evt) => {
                evt.preventDefault();
                closeModal();
              }}
            >
              ✕
            </button>
          </form>
          <h3 className="font-bold">Export Users</h3>
          <div className="divider m-0"></div>

          <div className="flex flex-col md:flex-row gap-3 md:gap-28 mt-3">
            <div>
              <p className="font-bold ">Choose format</p>
              <div className="flex gap-2 text-xs">
                <div className="form-control">
                  <label className="label cursor-pointer gap-2">
                    <span className="">Excel(.xlsx)</span>
                    <input
                      data-theme={isDarkMode ? "dark" : "light"}
                      type="radio"
                      name="file-format"
                      className="radio checked:bg-defaultGreen border-defaultGreen radio-sm"
                      checked={fileFormat === "Excel"}
                      onChange={() => setFileFormat("Excel")}
                    />
                  </label>
                </div>
                <div className="form-control">
                  <label className="label cursor-pointer gap-2">
                    <span className="">PDF</span>
                    <input
                      data-theme={isDarkMode ? "dark" : "light"}
                      type="radio"
                      name="file-format"
                      className="radio checked:bg-defaultGreen border-defaultGreen radio-sm"
                      checked={fileFormat === "Pdf"}
                      onChange={() => setFileFormat("Pdf")}
                    />
                  </label>
                </div>
              </div>

              <div>
                <p className="font-bold mt-2">Columns</p>
                {columns.length < 3 && (
                  <small className="mb-2 text-xs text-gray-400">
                    Select at least 3 columns
                  </small>
                )}
                {tableTitle.map((title) => {
                  return (
                    <div key={title} className="form-control text-xs">
                      <label className="label cursor-pointer justify-start gap-3">
                        <input
                          type="checkbox"
                          defaultChecked={columns.includes(title)}
                          className="checkbox checkbox-sm [--chkbg:theme(colors.defaultGreen)] [--chkfg:white]"
                          value={title}
                          onChange={(evt) => {
                            if (columns.includes(title)) {
                              setColumns([
                                ...columns.filter(
                                  (col) => col !== evt.currentTarget.value
                                ),
                              ]);
                            } else {
                              setColumns([...columns, evt.currentTarget.value]);
                            }
                          }}
                        />
                        <span className="">{displayTitle(title)}</span>
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>

            <div>
              <p className="font-bold mb-6">Apply filters</p>

              <div className="flex flex-col gap-5">
                <div>
                  <CustomDropdown
                    name={filterName}
                    type={"admin"}
                    filterName={filterName}
                    listItems={pickDate}
                    handleClick={(value) => {
                      if (value === "Select Custom date") {
                        setDateFilters({
                          ...dateFilters,
                          presetTimeFrame: PresetTimeFrameType.default,
                        });
                        setIsModelOpen(true);
                      } else if (value === "Clear") {
                        setFilterName("Select Date Range");
                        setDateFilters({
                          StartDate: "",
                          EndDate: "",
                          presetTimeFrame: PresetTimeFrameType.default,
                        });
                      } else {
                        setFilterName(String(value));
                        const result = handleFilterDate(value);
                        setDateFilters({
                          StartDate: "",
                          EndDate: "",
                          presetTimeFrame: result.presetTimeFrame,
                        });
                      }
                    }}
                  />
                  <DatePicker
                  admin={true}
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
                    }}
                  />
                </div>

                <CustomDropdown
                  name={
                    activeFilterProduct === "All"
                      ? "All Products"
                      : activeFilterProduct
                  }
                  type={"admin"}
                  listItems={[
                    "All Products",
                    "Social Crowdfund",
                    "Ikimina",
                    "Individual Savings",
                  ]}
                  handleClick={(item: string | number) => {
                    let itemName;
                    if (item === "All Products") itemName = "All";
                    else if (item === "Social Crowdfund")
                      itemName = "Crowdfund";
                    else if (item === "Individual Savings")
                      itemName = "IndividualSavings";
                    else itemName = item;
                    setActiveFilterProduct(String(itemName));
                  }}
                />
                <CustomDropdown
                  name={
                    activeFilterUsers === "All"
                      ? "All Users"
                      : activeFilterUsers
                  }
                  type={"admin"}
                  listItems={["All Users", "Active", "Inactive"]}
                  handleClick={(item: string | number) => {
                    let itemName;
                    if (item === "All Users") itemName = "All";
                    else itemName = item;
                    setActiveFilterUsers(String(itemName));
                  }}
                />
                <CustomDropdown
                  name={
                    filterSortBy === "ASC" ? "Oldest-Newest" : "Newest-Oldest"
                  }
                  type={"admin"}
                  listItems={["Oldest-Newest", "Newest-Oldest"]}
                  handleClick={(item: string | number) => {
                    setFilterSortBy(item === "Oldest-Newest" ? "ASC" : "DESC");
                  }}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 justify-center items-center my-3 md:m-0">
            <button
              className=" flex items-center justify-center gap-3 w-1/2 py-2 text-white rounded-md bg-defaultGreen font-normal disabled:cursor-not-allowed disabled:bg-opacity-20 dark:disabled:text-opacity-20"
              disabled={
                columns.length < 3 ||
                users.exportLoading ||
                (!dateFilters.StartDate && !dateFilters.presetTimeFrame)
              }
              onClick={() => {
                dispatch(
                  getExportUsers({
                    selectedColumns: columns,
                    productOptions: activeFilterProduct,
                    formatOptions: fileFormat,
                    sortingOptions: filterSortBy,
                    fromDate: dateFilters.StartDate,
                    toDate: dateFilters.EndDate,
                    presetTimeFrame: dateFilters.presetTimeFrame,
                  })
                );
              }}
            >
              {users.exportLoading && (
                <Icon
                  icon="line-md:loading-twotone-loop"
                  width="20"
                  height="20"
                />
              )}
              Export Users
            </button>
          </div>
          <div>
            <Toast
              isToastShown={isErrorExporting}
              message={String(users?.exportUsersError?.message)}
              setIsToastShown={setIsErrorExporting}
            />
            <Toast
              isToastShown={isSuccessExporting}
              message={String(users?.confirmExportMessage)}
              isSuccess={true}
              setIsToastShown={setIsSuccessExporting}
            />
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ExportUser;
