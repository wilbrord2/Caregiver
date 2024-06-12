export const handleFilterDate = (datefilter: string | number) => {
  function handleDate(date: Date | number) {
    const originalDate = new Date(date);
    const year = originalDate.getFullYear();
    const month = String(originalDate.getMonth() + 1).padStart(2, "0");
    const day = String(originalDate.getDate()).padStart(2, "0");
    const hours = String(originalDate.getHours()).padStart(2, "0");
    const minutes = String(originalDate.getMinutes()).padStart(2, "0");
    const seconds = String(originalDate.getSeconds()).padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }
  function handleDateToMidNight(date: number) {
    const originalDate = new Date(date);
    const year = originalDate.getFullYear();
    const month = String(originalDate.getMonth() + 1).padStart(2, "0");
    const day = String(originalDate.getDate()).padStart(2, "0");
    const hours = "00";
    const minutes = "00";
    const seconds = "00";
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }
  function getFirstDayOfWeek() {
    const curr = new Date();
    const first = curr.getDate() - curr.getDay();
    return handleDateToMidNight(
      new Date(new Date(curr.setDate(first)).toUTCString()).setUTCHours(
        0,
        0,
        0,
        0
      )
    );
  }
  function getLastWeek() {
    const d = new Date();
    const to = d.setTime(
      d.getTime() - (d.getDay() ? d.getDay() : 7) * 24 * 60 * 60 * 1000
    );
    const from = d.setTime(d.getTime() - 6 * 24 * 60 * 60 * 1000);
    return { to: handleDateToMidNight(to), from: handleDateToMidNight(from) };
  }
  function getThisMonth() {
    const date = new Date();
    return handleDate(new Date(date.getFullYear(), date.getMonth(), 1));
  }
  function getLastMonth() {
    var date = new Date();
    var firstDay = handleDate(
      new Date(date.getFullYear(), date.getMonth() - 1, 1)
    );
    var lastDay = handleDate(new Date(date.getFullYear(), date.getMonth(), 0));
    return { firstDay, lastDay };
  }
  function getThisYear() {
    const currentDate = new Date();
    const from = handleDate(new Date(currentDate.getFullYear(), 0, 1));
    const to = handleDate(new Date(currentDate.getFullYear(), 11, 31));
    return { from, to };
  }
  function getLastYear() {
    const lastyear = new Date(new Date().getFullYear() - 1, 0, 1);
    const from = handleDate(new Date(lastyear.getFullYear(), 0, 1).getTime());
    const to = handleDate(new Date(lastyear.getFullYear(), 11, 31).getTime());
    return { from, to };
  }
  switch (datefilter) {
    case "Today":
      return {
        startDate: handleDateToMidNight(new Date().setUTCHours(0, 0, 0, 0)),
        endDate: handleDate(new Date()),
      };
    case "Yesterday":
      return {
        startDate: handleDateToMidNight(
          new Date(new Date().setDate(new Date().getDate() - 1)).setUTCHours(
            0,
            0,
            0,
            0
          )
        ),
        endDate: handleDateToMidNight(new Date().setUTCHours(0, 0, 0, 0)),
      };
    case "This Week":
      return {
        startDate: getFirstDayOfWeek(),
        endDate: handleDate(new Date()),
      };
    case "Last Week":
      return {
        startDate: getLastWeek().from,
        endDate: getLastWeek().to,
      };
    case "This Month":
      return {
        startDate: getThisMonth(),
        endDate: handleDate(new Date()),
      };
    case "Last Month":
      return {
        startDate: getLastMonth().firstDay,
        endDate: getLastMonth().lastDay,
      };
    case "This Year":
      return {
        startDate: getThisYear().from,
        endDate: handleDate(new Date()),
      };
    case "Last Year":
      return {
        startDate: getLastYear().from,
        endDate: getLastYear().to,
      };
    default: {
      return {
        startDate: "",
        endDate: "",
      };
    }
  }
};

export const HandleFormatDate = (dates: string, removeHours?: boolean) => {
  const date = new Date(dates);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12;
  const time = `${hours}:${minutes.toString().padStart(2, "0")} ${ampm}`;

  const formattedDate = `${month} ${day}, ${year} ${removeHours ? "" : time}`;
  return formattedDate;
};

export const calculateRequestCodeTokenExp = () => {
  return new Date().setTime(new Date().getTime() + 5 * 60 * 1000) + 5000;
};
export const calculateResetTokenExp = () => {
  return new Date().setTime(new Date().getTime() + 2 * 60 * 1000);
};
