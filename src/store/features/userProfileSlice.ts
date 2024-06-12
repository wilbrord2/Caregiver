import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type State = {
  userLoading: boolean;
  userError: boolean;
  userImage: string;
  id: string;
  phone: string;
  name: string;
  email: string;
  role: string;
};
const initialState: State = {
  userLoading: false,
  userError: false,
  userImage: "",
  id: "",
  phone: "",
  name: "",
  email: "",
  role: "",
};

const userProfile = createSlice({
  name: "profile",
  initialState,
  reducers: {
    logout(state) {
      localStorage.removeItem("access_token");
      return initialState;
    },
  },
});
export const { logout } = userProfile.actions;
export default userProfile.reducer;
