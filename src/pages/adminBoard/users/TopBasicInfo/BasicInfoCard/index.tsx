import Tooltip from "../../../../../components/tooltip/tooltip";
import { UserGrouthSkeleton } from "../../../../skeletons";

const BasicInfoCard = ({
  dataloading,
  infoName,
  infoValue,
  toolTipContent,
}: {
  dataloading: boolean;
  infoName: string;
  infoValue?: number | string;
  toolTipContent: string;
  lastChild?: boolean;
}) => {
  return (
    <div className={`w-4/5 m-4`}>
      {dataloading ? (
        <div className="w-4/5">
          <UserGrouthSkeleton height="30px" />
        </div>
      ) : (
        <p className="text-sm flex items-center justify-center  gap-2 font-medium">
          <span className="font-medium">{infoName}</span>
          <Tooltip content={toolTipContent} />
        </p>
      )}
      {dataloading ? (
        <div className="w-2/5">
          <UserGrouthSkeleton height="25px" />
        </div>
      ) : (
        <p className="text-2xl mt-2 text-center font-bold">{infoValue}</p>
      )}
    </div>
  );
};

export default BasicInfoCard;
