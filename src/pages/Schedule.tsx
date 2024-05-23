import { InlineWidget } from "react-calendly";

const Schedule = () => {
  const url = import.meta.env.VITE_CALENDLY_LINK;
  return (
    <div className="pt-32 w-[90%] mx-auto px-8">
      <h1 className="heading2 text-btnPrimary">Schedule a Discovery Call</h1>
      <div className="">
        <InlineWidget styles={{height:"700px"}} url={url} />
      </div>
    </div>
  );
};

export default Schedule;
