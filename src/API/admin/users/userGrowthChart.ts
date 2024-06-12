import consumeAPI from "../..";

export const getYearlyUserGrowthReport = async (year: number) => {
  return await consumeAPI().get(
    `/v1/admin/users/graphs/yearly-timeframe?selectedYear=${year}`
  );
};
export const getMonthlyUserGrowthReport = async (year: number, month:number) => {
    return await consumeAPI().get(
      `/v1/admin/users/graphs/monthly-timeframe?selectedYear=${year}&selectedMonth=${month}`
    );
  };
  export const getTotalJoineUsers = async () => {
    return await consumeAPI().get(
      `/v1/admin/users/intros/joined-users`
    );
  };


  