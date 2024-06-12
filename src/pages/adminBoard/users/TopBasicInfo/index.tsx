import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../../../hooks";
import {
  onTotalActiveUsers,
} from "../../../../store/features/admin/users/usersSlice";
import BasicInfoCard from "./BasicInfoCard";
import { useAppContext } from "../../../../context";

const TopBasicInfo = () => {
  const users = useAppSelector((state) => state.storeUsers);
  const dispatch = useAppDispatch();
  const { setIsSessionEnd, setIsServerError } = useAppContext();
  useEffect(() => {
    dispatch(onTotalActiveUsers());

  }, []);

  useEffect(() => {
    const isAuthError = `${
      users.activeUsersError?.message
    }`.includes("401");
    if (isAuthError) {
      // setIsSessionEnd(true);
    }

    const isServerError = `${
      users.activeUsersError?.message
    }`.includes("50");
    if (isServerError) {
      // setIsServerError(true);
    }
  });

  return (
    <div className=" w-1/2 md:w-1/4 flex flex-col md:flex-row border-[1px] border-secondGray/60 dark:border-defaultGray/60 rounded-lg mx-4">
      <BasicInfoCard
        dataloading={users.activeUsersFetching}
        infoName="Total Subscribers"
        infoValue={85}
        toolTipContent="Total number of emails that made subscription."
      />
    </div>
  );
};

export default TopBasicInfo;
