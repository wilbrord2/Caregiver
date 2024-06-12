interface filter {
    searchFilter: string;
    searchValue: string;
  }
  export const handleSearchTerm = ({ searchFilter, searchValue }: filter) => {
    if (searchFilter !== "All") return searchValue;
  };
  export const handleSearchOption = ({ searchFilter, searchValue }: filter) => {
    if (searchValue.length <= 0) return "All";
    return searchFilter;
  };
  
  export const pickDate = [
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
  
  export const handleUserName=({name}:{name:string}): string=>{
  const username= (name && name.endsWith(" ")? name.slice(0, name.length-1) : name)+"'s"
  return username;
  }