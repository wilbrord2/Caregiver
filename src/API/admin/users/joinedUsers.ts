import consumeAPI from "../..";
import { PresetTimeFrameType } from "../../../types/admin/users";

export const getJoinedUsersTable = async (
  page: number,
  searchOption: string,
  sortingOptions: string,
  searchTerm?: string,
  fromDate?: string,
  toDate?: string,
  presetTimeFrame?: PresetTimeFrameType
) => {
  const api = ``;
  return await consumeAPI().get(api);
};

export const exportUsers = async (
  selectedColumns: string[],
  productOptions: string,
  formatOptions: string,
  sortingOptions: string,
  fromDate?: string,
  toDate?: string,
  presetTimeFrame?: PresetTimeFrameType
) => {
  const api = ``;
  return await consumeAPI().post(api, {
    columns: selectedColumns,
  });
};
