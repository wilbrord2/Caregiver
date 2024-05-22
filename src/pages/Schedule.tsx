import { InlineWidget } from "react-calendly";

const Schedule = () => {
  // const url=process.env.CALENDLY_LINK as string
  return (
    <div className="pt-32 w-[90%] mx-auto px-8">
      <h1 className="heading2 text-btnPrimary">Schedule a Discovery Call</h1>
      <div className="">
        <InlineWidget url="https://calendly.com/bwilbrord" />
      </div>
    </div>
  );
};

export default Schedule;
