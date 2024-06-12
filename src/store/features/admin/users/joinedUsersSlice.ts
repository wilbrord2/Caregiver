import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getMonthlyUserGrowthReport,
  getYearlyUserGrowthReport,
  getJoinedUsersTable,
  exportUsers,
} from "../../../../API/admin/users";
import {
  PresetTimeFrameType,
  joinedUsersType,
  userGrowthChartType,
} from "../../../../types/admin/users";
import { AxiosError } from "axios";

type CustomError = Record<"statusCode" | "message", number | string>;
export type State = {
  dataFetching: boolean;
  dataLoading: boolean;
  fechingError: CustomError;
  TotalSubscribers: { totalSubscribers: number };
  userGrowthReport: userGrowthChartType[];
  SubscribersData: joinedUsersType;
  exportUsersError: CustomError;
  exportLoading: boolean;
  confirmExportMessage: string;
};

const initialState: State = {
  confirmExportMessage: "",
  dataFetching: false,
  dataLoading: false,
  exportLoading: false,
  TotalSubscribers: { totalSubscribers: 0 },
  userGrowthReport: [],
  SubscribersData: {
    users: [],
    page: 0,
    take: 0,
    totalUsers: 0,
    pageCount: 0,
    hasNextPage: false,
  },
  fechingError: { message: "", statusCode: 0 },
  exportUsersError: { message: "", statusCode: 0 },
};
// Yearly User Growth chart Report
export const usersYearlyReport = createAsyncThunk(
  "admin/getYearlyUserGrowthReport",
  async (params: { year: number }, { rejectWithValue }) => {
    try {
      const { data } = await getYearlyUserGrowthReport(params.year);
      return data;
    } catch (error) {
      if (error instanceof AxiosError)
        return rejectWithValue(error.response?.data);
    }
  }
);
// Montly User Growth chart Report
export const usersMonthyReport = createAsyncThunk(
  "admin/getMonthlyUserGrowthReport",
  async (params: { year: number; month: number }, { rejectWithValue }) => {
    try {
      const { data } = await getMonthlyUserGrowthReport(
        params.year,
        params.month
      );
      return data;
    } catch (error) {
      if (error instanceof AxiosError)
        return rejectWithValue(error.response?.data);
    }
  }
);
// Joined Users Table
export const Subscribers = createAsyncThunk(
  "admin/Subscribers",
  async (
    {
      page,
      searchOption,
      sortingOptions,
      searchTerm,
      fromDate,
      toDate,
      presetTimeFrame,
    }: {
      page: number;
      searchOption: string;
      sortingOptions: string;
      searchTerm?: string;
      fromDate?: string;
      toDate?: string;
      presetTimeFrame?: PresetTimeFrameType;
    },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await  getJoinedUsersTable(
        page,
        searchOption,
        sortingOptions,
        searchTerm,
        fromDate,
        toDate,
        presetTimeFrame
      );
      return data;
    } catch (error) {
      if (error instanceof AxiosError)
        return rejectWithValue(error.response?.data);
    }
  }
);

export const getExportUsers = createAsyncThunk(
  "admin/exportUsers",
  async (
    {
      selectedColumns,
      productOptions,
      formatOptions,
      
      sortingOptions,
      fromDate,
      toDate,
      presetTimeFrame,
    }: {
      selectedColumns: string[];
      productOptions: string;
      formatOptions: string;
      sortingOptions: string;
      fromDate?: string;
      toDate?: string;
      presetTimeFrame?: PresetTimeFrameType;
    },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await exportUsers(
        selectedColumns,
        productOptions,
        formatOptions,
        sortingOptions,
        fromDate,
        toDate,
        presetTimeFrame
      );

      return data;
    } catch (error) {
      if (error instanceof AxiosError)
        return rejectWithValue(error.response?.data);
    }
  }
);

const adminUsersSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      // Yearly reports
      .addCase(usersYearlyReport.pending, (state, action) => {
        state.dataFetching = true;
        state.fechingError = { message: "", statusCode: 0 };
      })
      .addCase(usersYearlyReport.fulfilled, (state, action) => {
        state.dataFetching = false;
        state.userGrowthReport = action.payload;
        state.fechingError = { message: "", statusCode: 0 };
      })
      .addCase(usersYearlyReport.rejected, (state, action) => {
        state.dataFetching = false;
        state.fechingError = action.payload as CustomError;
      })
      // Monthly Reports
      .addCase(usersMonthyReport.pending, (state, action) => {
        state.dataFetching = true;
        state.fechingError = { message: "", statusCode: 0 };
      })
      .addCase(usersMonthyReport.fulfilled, (state, action) => {
        state.dataFetching = false;
        state.userGrowthReport = action.payload;
        state.fechingError = { message: "", statusCode: 0 };
      })
      .addCase(usersMonthyReport.rejected, (state, action) => {
        state.dataFetching = false;
        state.fechingError = action.payload as CustomError;
      })
      // Joined Users Table
      .addCase(Subscribers.pending, (state, action) => {
        state.dataLoading = true;
        state.fechingError = { message: "", statusCode: 0 };
      })
      .addCase(Subscribers.fulfilled, (state, action) => {
        state.dataLoading = false;
        state.SubscribersData = action.payload;
        state.fechingError = { message: "", statusCode: 0 };
      })
      .addCase(Subscribers.rejected, (state, action) => {
        state.dataLoading = false;
        state.fechingError = action.payload as CustomError;
      })
      // export users
      .addCase(getExportUsers.pending, (state, action) => {
        state.exportLoading = true;
        state.fechingError = { message: "", statusCode: 0 };
      })
      .addCase(getExportUsers.fulfilled, (state, action) => {
        state.exportLoading = false;
        state.confirmExportMessage = action.payload.message;
        state.exportUsersError = { message: "", statusCode: 0 };
      })
      .addCase(getExportUsers.rejected, (state, action) => {
        state.exportLoading = false;
        state.exportUsersError = action.payload as CustomError;
      });
  },
});

export default adminUsersSlice.reducer;
