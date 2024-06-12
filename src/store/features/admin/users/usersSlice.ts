import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getTotalActiveUsers,
} from "../../../../API/admin/users";

type CustomError = Record<"statusCode" | "message", number | string>;
type State = {
  // active users
  activeUsersFetching: boolean;
  totalActiveUsers?: number;
  activeUsersError: CustomError;
};

const initialState: State = {
  // active users
  activeUsersFetching: false,
  totalActiveUsers: 0,
  activeUsersError: { message: "", statusCode: 0 },
};

// active users
export const onTotalActiveUsers = createAsyncThunk(
  "admin/getTotalActiveUsers",
  async () => {
    const { data } = await getTotalActiveUsers();
    return data;
  }
);


const adminUsersSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      // active users
      .addCase(onTotalActiveUsers.pending, (state, action) => {
        state.activeUsersError = { message: "", statusCode: 0 };
        state.activeUsersFetching = true;
      })
      .addCase(onTotalActiveUsers.fulfilled, (state, action) => {
        state.activeUsersError = { message: "", statusCode: 0 };
        state.activeUsersFetching = false;
        state.totalActiveUsers = action.payload.totalActiveUsers;
      })
      .addCase(onTotalActiveUsers.rejected, (state, action) => {
        state.activeUsersError = action.payload as CustomError;
        state.activeUsersFetching = false;
      })
  },
});

export default adminUsersSlice.reducer;
