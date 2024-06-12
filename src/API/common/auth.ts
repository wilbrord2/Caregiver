import consumeAPI from "..";
type token = {
  token: string;
  password?: string;
  code?: string;
  email?: string;
  phone?: string;
};
export const login = async (data: { phone: string; password: string }) => {
  return await consumeAPI().post("/v1/auth/signin", data);
};

// // Reset password flow
// Request code
export const requestCodeOnEmail = async (data: { email: string }) => {
  return await consumeAPI().post(
    "/v1/auth/password-reset/request-reset-code-via-email",
    data
  );
};
export const requestCodeOnPhone = async (data: { phone: string }) => {
  return await consumeAPI().post(
    "/v1/auth/password-reset/request-reset-code-via-phone",
    data
  );
};

// Verifier code
export const verifyCodeOnEmail = async (data: token) => {
  return await consumeAPI(data.token).patch(
    "/v1/auth/password-reset/verify-reset-code-sent-via-email",
    data
  );
};
export const verifyCodeOnPhone = async (data: token) => {
  return await consumeAPI(data.token).patch(
    "/v1/auth/password-reset/verify-reset-code-sent-via-phone",
    data
  );
};
// Resend code
export const resendCodeOnEmail = async (data: { email: string }) => {
  return await consumeAPI().patch(
    "/v1/auth/password-reset/resend-reset-code-via-email",
    data
  );
};
export const resendCodeOnPhone = async (data: { phone: string }) => {
  return await consumeAPI().patch(
    "/v1/auth/password-reset/resend-reset-code-via-phone",
    data
  );
};

// Reset Password
export const resetPassword = async (data: token) => {
  return await consumeAPI(data.token).patch(
    "/v1/auth/password-reset/change-user-password",
    data
  );
};
