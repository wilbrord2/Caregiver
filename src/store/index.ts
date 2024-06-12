import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/authSlice";
import usersSlice from "./features/admin/users/usersSlice";
import adminUsersSlice from "./features/admin/users/joinedUsersSlice";
import userProfileSlice from "./features/userProfileSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    userProfile: userProfileSlice,
  
    // ADMIN Store
    storeUsers: usersSlice,
    users: adminUsersSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
