import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as authAPI from "../../API/common";
import { logout } from "./userProfileSlice";
import { AxiosError } from "axios";
type resetPasswordType = {
  message: string;
  statusCode: number;
};
interface InitialStateType {
  signupLoading: boolean;
  signinLoading: boolean;
  token: string;
  signinError: string;
  signupError: string;
  resendCodeError: boolean | string;
  resendCodeLoading: boolean;
  resendCodeSuccess: boolean;
  requestCodeLoading: boolean;
  requestCodeError: boolean | string;
  requestCodeSuccess: boolean;
  verifyCodeSuccess: boolean;
  resetPasswordError: resetPasswordType;
  resetPasswordLoading: boolean;
  resetPasswordSuccess: boolean | string;
}

const initialState: InitialStateType = {
  signupLoading: false,
  signinLoading: false,
  token: "",
  signinError: "",
  signupError: "",
  resendCodeError: false,
  resendCodeLoading: false,
  resendCodeSuccess: false,
  requestCodeLoading: false,
  requestCodeError: false,
  requestCodeSuccess: false,
  verifyCodeSuccess: false,
  resetPasswordError: { message: "", statusCode: 0 },
  resetPasswordLoading: false,
  resetPasswordSuccess: false,
};


export const signin = createAsyncThunk<
  { access_token: string },
  { phone: string; password: string }
>("auth/getToken", async (userData) => {
  localStorage.setItem(
    "access_token",
    JSON.stringify("ahiwruowiuerqwuorfcnoaiwdjcmqwoieuwoi")
  );
  const { data } = await authAPI.login(userData);
  return data;
});
export const requestCodeOnEmail = createAsyncThunk<
  { access_token: string },
  { email: string }
>("auth/requestCodeOnEmail", async (userData, { rejectWithValue }) => {
  try {
    const { data } = await authAPI.requestCodeOnEmail(userData);
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return rejectWithValue(error.response?.data);
    }
  }
});
export const requestCodeOnPhone = createAsyncThunk<
  { access_token: string },
  { phone: string }
>("auth/requestCodeOnPhone", async (userData, { rejectWithValue }) => {
  try {
    const { data } = await authAPI.requestCodeOnPhone(userData);
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return rejectWithValue(error.response?.data);
    }
  }
});
export const verifyCodeOnEmail = createAsyncThunk<
  { access_token: string },
  { code: string; email: string; token: string }
>("auth/verifyUserEmail", async (userData, { rejectWithValue }) => {
  try {
    const { data } = await authAPI.verifyCodeOnEmail(userData);
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return rejectWithValue(error.response?.data);
    }
  }
});
export const verifyCodeOnPhone = createAsyncThunk<
  { access_token: string },
  { code: string; phone: string; token: string }
>("auth/verifyUserPhone", async (userData, { rejectWithValue }) => {
  try {
    const { data } = await authAPI.verifyCodeOnPhone(userData);
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return rejectWithValue(error.response?.data);
    }
  }
});
export const resendCodeOnEmail = createAsyncThunk<
  { access_token: string },
  { email: string }
>("auth/resendCodeOnEmail", async (userData, { rejectWithValue }) => {
  try {
    const { data } = await authAPI.resendCodeOnEmail(userData);
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return rejectWithValue(error.response?.data);
    }
  }
});
export const resendCodeOnPhone = createAsyncThunk<
  { access_token: string },
  { phone: string }
>("auth/resendCodePhone", async (userData, { rejectWithValue }) => {
  try {
    const { data } = await authAPI.resendCodeOnPhone(userData);
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return rejectWithValue(error.response?.data);
    }
  }
});
export const resetPassword = createAsyncThunk<
  {},
  { password: string; token: string }
>("auth/resetPassword", async (userData, { rejectWithValue }) => {
  try {
    const { data } = await authAPI.resetPassword(userData);
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return rejectWithValue(error.response?.data);
    }
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearToken(state) {
      state.token = "";
      state.signinError = "";
      state.signinLoading = false;
      state.signupError = "";
      state.signupLoading = false;
      state.resendCodeError = false;
      state.resendCodeLoading = false;
      state.requestCodeLoading = false;
      state.requestCodeError = false;
      state.verifyCodeSuccess = false;
      state.requestCodeSuccess = false;
      state.resetPasswordError.message = "";
      state.resetPasswordLoading = false;
      state.resetPasswordSuccess = false;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(logout, (state) => {
        return initialState;
      })
      // Sign in
      .addCase(signin.pending, (state) => {
        state.signinLoading = true;
        state.token = "";
        state.signinError = "";
      })
      .addCase(signin.fulfilled, (state, action) => {
        state.signinLoading = false;
        state.token = "ahiwruowiuerqwuorfcnoaiwdjcmqwoieuwoi";
        state.signinError = "";
      })
      .addCase(signin.rejected, (state, action) => {
        state.signinLoading = false;
        state.token = "";
        if (action.error.message?.includes("401")) {
          state.signinError = "Incorrect number or password";
        } else if (action.error.message?.includes("500")) {
          state.signinError = "Sorry, it's on our end! working on it";
        } else state.signinError = "Oops! Something went wrong!";
      })
      // Reset Password
      // Request code on email
      .addCase(requestCodeOnEmail.pending, (state) => {
        state.requestCodeLoading = true;
        state.requestCodeError = false;
        state.resendCodeSuccess = false;
        state.token = "";
      })
      .addCase(requestCodeOnEmail.fulfilled, (state, action) => {
        state.requestCodeLoading = false;
        state.token = action.payload.access_token;
        state.requestCodeSuccess = true;
        state.requestCodeError = false;
      })
      .addCase(requestCodeOnEmail.rejected, (state, action) => {
        state.requestCodeLoading = false;
        const payload = action.payload as AxiosError;
        state.requestCodeError = payload.message;
      })
      // Request code on Phone
      .addCase(requestCodeOnPhone.pending, (state) => {
        state.requestCodeLoading = true;
        state.requestCodeError = false;
        state.token = "";
      })
      .addCase(requestCodeOnPhone.fulfilled, (state, action) => {
        state.requestCodeLoading = false;
        state.token = action.payload.access_token;
        state.requestCodeSuccess = true;
        state.requestCodeError = false;
      })
      .addCase(requestCodeOnPhone.rejected, (state, action) => {
        state.requestCodeLoading = false;
        const payload = action.payload as AxiosError;
        state.requestCodeError = payload.message;
      })
      // verifier code via email
      .addCase(verifyCodeOnEmail.pending, (state) => {
        state.requestCodeLoading = true;
        state.token = "";
        state.requestCodeError = false;
      })
      .addCase(verifyCodeOnEmail.fulfilled, (state, action) => {
        state.requestCodeLoading = false;
        state.token = action.payload.access_token;
        state.requestCodeError = false;
        state.verifyCodeSuccess = true;
      })
      .addCase(verifyCodeOnEmail.rejected, (state, action) => {
        state.requestCodeLoading = false;
        const payload = action.payload as AxiosError;
        state.requestCodeError = payload.message;
      })
      // verifier code via phone
      .addCase(verifyCodeOnPhone.pending, (state) => {
        state.requestCodeLoading = true;
        state.token = "";
        state.requestCodeError = false;
      })
      .addCase(verifyCodeOnPhone.fulfilled, (state, action) => {
        state.requestCodeLoading = false;
        state.token = action.payload.access_token;
        state.requestCodeError = false;
        state.verifyCodeSuccess = true;
      })
      .addCase(verifyCodeOnPhone.rejected, (state, action) => {
        state.requestCodeLoading = false;
        state.requestCodeError = (action.payload as AxiosError).message;
      })
      // resend code via phone
      .addCase(resendCodeOnEmail.pending, (state) => {
        state.resendCodeLoading = true;
        state.token = "";
        state.resendCodeSuccess = false;
        state.resendCodeError = false;
      })
      .addCase(resendCodeOnEmail.fulfilled, (state, action) => {
        state.resendCodeLoading = false;
        state.token = action.payload.access_token;
        state.resendCodeSuccess = true;
        state.resendCodeError = false;
      })
      .addCase(resendCodeOnEmail.rejected, (state, action) => {
        state.resendCodeLoading = false;
        state.resendCodeSuccess = false;
        state.requestCodeError = (action.payload as AxiosError).message;
      })
      // resend code via phone
      .addCase(resendCodeOnPhone.pending, (state) => {
        state.resendCodeLoading = true;
        state.token = "";
        state.resendCodeSuccess = false;
        state.resendCodeError = false;
      })
      .addCase(resendCodeOnPhone.fulfilled, (state, action) => {
        state.resendCodeLoading = false;
        state.token = action.payload.access_token;
        state.resendCodeSuccess = true;
        state.resendCodeError = false;
      })
      .addCase(resendCodeOnPhone.rejected, (state, action) => {
        state.resendCodeLoading = false;
        state.resendCodeSuccess = false;
        state.requestCodeError = (action.payload as AxiosError).message;
      })
      //  Reset Password
      .addCase(resetPassword.pending, (state) => {
        state.resetPasswordLoading = true;
        state.resetPasswordSuccess = false;
        state.resetPasswordError.message = "";
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.resetPasswordLoading = false;
        state.resetPasswordSuccess = "Password Changed successfully";
        state.resetPasswordError.message = "";
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.resetPasswordLoading = false;
        state.resetPasswordSuccess = true;
        state.requestCodeError = (action.payload as AxiosError).message;
      });
  },
});
export const { clearToken } = authSlice.actions;
export default authSlice.reducer;
