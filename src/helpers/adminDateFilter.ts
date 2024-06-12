import { PresetTimeFrameType } from "../types/admin/users";

export const handleFilterDate = (
  datefilter: string | number
): { presetTimeFrame: PresetTimeFrameType } => {
  switch (datefilter) {
    case "Today":
      return {
        presetTimeFrame: PresetTimeFrameType.Today,
      };
    case "Yesterday":
      return {
        presetTimeFrame: PresetTimeFrameType.Yesterday,
      };
    case "This Week":
      return {
        presetTimeFrame: PresetTimeFrameType.ThisWeek,
      };
    case "Last Week":
      return {
        presetTimeFrame: PresetTimeFrameType.LastWeek,
      };
    case "This Month":
      return {
        presetTimeFrame: PresetTimeFrameType.ThisMonth,
      };
    case "Last Month":
      return {
        presetTimeFrame: PresetTimeFrameType.LastMonth,
      };
    case "This Year":
      return {
        presetTimeFrame: PresetTimeFrameType.ThisYear,
      };
    case "Last Year":
      return {
        presetTimeFrame: PresetTimeFrameType.LastYear,
      };
    default: {
      return {
        presetTimeFrame: PresetTimeFrameType.default,
      };
    }
  }
};
