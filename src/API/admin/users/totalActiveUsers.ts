import consumeAPI from "../..";

export const getTotalActiveUsers = async () => {
  return await consumeAPI().get<{ totalActiveUsers: number }>(
    "/v1/admin/users/intros/active-users"
  );
};
