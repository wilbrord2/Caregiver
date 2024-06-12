import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import skeletonStyles from "./style";

export function PageSkeleton() {
  return (
    <div className="flex flex-col lg:flex-row w-full gap-2 md:gap-10 px-4 h-screen">
      <div className="flex flex-col w-full lg:w-1/2 gap-2 md:gap-4 h-full">
        <div className="w-[65%] h-[30%] lg:h-[10%]">
          <Skeleton
            enableAnimation={false}
            duration={0}
            height={"100%"}
            borderRadius="1rem"
            className={skeletonStyles.background}
          />
        </div>
        <div className="w-full h-[30%] lg:h-[35%]">
          <Skeleton
            enableAnimation={false}
            duration={0}
            height={"100%"}
            borderRadius="1rem"
            className={skeletonStyles.background}
          />
        </div>
        <div className="w-full h-[30%] lg:h-[40%]">
          <Skeleton
            enableAnimation={false}
            duration={0}
            height={"100%"}
            borderRadius="1rem"
            className={skeletonStyles.background}
          />
        </div>
      </div>
      <div className="flex flex-col w-full lg:w-1/2 gap-2 md:gap-6 h-full">
        <div className="w-full h-[30%] lg:h-[25%]">
          <Skeleton
            enableAnimation={false}
            duration={0}
            height={"100%"}
            borderRadius="1rem"
            className={skeletonStyles.background}
          />
        </div>
        <div className="w-full h-[30%] lg:h-[25%]">
          <Skeleton
            enableAnimation={false}
            duration={0}
            height={"100%"}
            borderRadius="1rem"
            className={skeletonStyles.background}
          />
        </div>
        <div className="w-full h-[30%] lg:h-[34%]">
          <Skeleton
            enableAnimation={false}
            duration={0}
            height={"100%"}
            borderRadius="1rem"
            className={skeletonStyles.background}
          />
        </div>
      </div>
    </div>
  );
}
export function GroupSkeleton() {
  return (
    <div>
      <Skeleton
        count={3}
        enableAnimation={false}
        duration={0}
        height={130}
        borderRadius="1rem"
        className={skeletonStyles.background}
      />
    </div>
  );
}
export function ReportSkeleton() {
  return (
    <div className="p-3">
      <Skeleton
        count={4}
        enableAnimation={false}
        duration={0}
        height={130}
        borderRadius="1rem"
        className={skeletonStyles.background}
      />
    </div>
  );
}
export function ContributionSkeleton() {
  return (
    <div className="flex flex-col items-center  justify-center rounded-2xl shadow-sm shadow-gray-400 dark:shadow-defaultGray p-[7px] gap-1 ">
      <p className="w-4/5">
        <Skeleton
          enableAnimation={false}
          duration={0}
          baseColor={skeletonStyles.baseColor}
          highlightColor={skeletonStyles.hightlightColor}
          height={20}
          borderRadius="1rem"
          className={skeletonStyles.background}
        />
      </p>
      <p className=" w-1/4">
        <Skeleton
          enableAnimation={false}
          duration={0}
          baseColor={skeletonStyles.baseColor}
          highlightColor={skeletonStyles.hightlightColor}
          height={20}
          borderRadius="1rem"
          className={skeletonStyles.background}
        />
      </p>
      <p className="w-4/5">
        <Skeleton
          enableAnimation={false}
          duration={0}
          baseColor={skeletonStyles.baseColor}
          highlightColor={skeletonStyles.hightlightColor}
          height={20}
          borderRadius="1rem"
          className={skeletonStyles.background}
        />
      </p>
    </div>
  );
}
export function RecentActivitySkeleton() {
  return (
    <div>
      <Skeleton
        count={7}
        enableAnimation={false}
        duration={0}
        height={50}
        borderRadius="1rem"
        className={skeletonStyles.background}
      />
    </div>
  );
}
export function FetchingErrorSkeleton() {
  return (
    <div className=" flex items-center justify-center w-3/4 mx-auto h-full">
      <p className="w-3/5">
        <Skeleton
          enableAnimation={false}
          duration={0}
          baseColor={skeletonStyles.baseColor}
          highlightColor={skeletonStyles.hightlightColor}
          height={20}
          borderRadius="1rem"
          className={skeletonStyles.background}
        />
      </p>
    </div>
  );
}
export function PledgesSkeleton() {
  return (
    <div>
      <div className="flex justify-between">
        <p className="w-1/4">
          <Skeleton
            enableAnimation={false}
            duration={0}
            baseColor={skeletonStyles.baseColor}
            highlightColor={skeletonStyles.hightlightColor}
            height={20}
            borderRadius="1rem"
            className={skeletonStyles.background}
          />
        </p>
      </div>
      <div className="flex items-center w-full justify-center">
        <span className=" w-[10rem] h-[10rem] rounded-full">
          <Skeleton
            enableAnimation={false}
            duration={0}
            baseColor={skeletonStyles.baseColor}
            highlightColor={skeletonStyles.hightlightColor}
            height={160}
            borderRadius="100%"
            className={skeletonStyles.background}
          />
        </span>
      </div>
      <div className="flex justify-between mt-6 text-sm">
        <p className="w-1/4">
          <Skeleton
            enableAnimation={false}
            duration={0}
            baseColor={skeletonStyles.baseColor}
            highlightColor={skeletonStyles.hightlightColor}
            height={20}
            borderRadius="1rem"
            className={skeletonStyles.background}
          />
        </p>
        <p className="w-1/4">
          <Skeleton
            enableAnimation={false}
            duration={0}
            baseColor={skeletonStyles.baseColor}
            highlightColor={skeletonStyles.hightlightColor}
            height={20}
            borderRadius="1rem"
            className={skeletonStyles.background}
          />
        </p>
        <p className="w-1/4">
          <Skeleton
            enableAnimation={false}
            duration={0}
            baseColor={skeletonStyles.baseColor}
            highlightColor={skeletonStyles.hightlightColor}
            height={20}
            borderRadius="1rem"
            className={skeletonStyles.background}
          />
        </p>
      </div>
    </div>
  );
}
export function NoGroupPageSkeleton() {
  return (
    <div>
      <div className="flex justify-between">
        <p className="w-1/4">
          <Skeleton
            enableAnimation={false}
            duration={0}
            baseColor={skeletonStyles.baseColor}
            highlightColor={skeletonStyles.hightlightColor}
            height={100}
            borderRadius="1rem"
            className={skeletonStyles.background}
          />
        </p>
      </div>
      <div className="flex items-center w-full justify-center">
        <span className=" w-[40%] ">
          <Skeleton
            enableAnimation={false}
            duration={0}
            baseColor={skeletonStyles.baseColor}
            highlightColor={skeletonStyles.hightlightColor}
            height={300}
            borderRadius="2rem"
            className={skeletonStyles.background}
          />
        </span>
      </div>
      <div className="flex flex-col items-center justify-center mt-2 text-sm">
        <p className="w-1/2">
          <Skeleton
            enableAnimation={false}
            duration={0}
            baseColor={skeletonStyles.baseColor}
            highlightColor={skeletonStyles.hightlightColor}
            height={50}
            borderRadius="1rem"
            className={skeletonStyles.background}
          />
        </p>
        <div className="flex row items-center w-1/2 justify-evenly mt-2 text-sm">
          {" "}
          <p className="w-[30%]">
            <Skeleton
              enableAnimation={false}
              duration={0}
              baseColor={skeletonStyles.baseColor}
              highlightColor={skeletonStyles.hightlightColor}
              height={50}
              borderRadius="1rem"
              className={skeletonStyles.background}
            />
          </p>
          <p className="w-[30%]">
            <Skeleton
              enableAnimation={false}
              duration={0}
              baseColor={skeletonStyles.baseColor}
              highlightColor={skeletonStyles.hightlightColor}
              height={50}
              borderRadius="1rem"
              className={skeletonStyles.background}
            />
          </p>
        </div>
      </div>
    </div>
  );
}

export function UserGrouthSkeleton({ height }: { height: string }) {
  return (
    <SkeletonTheme>
      <Skeleton
        enableAnimation={false}
        duration={0}
        height={height}
        baseColor={skeletonStyles.baseColor}
        highlightColor={skeletonStyles.hightlightColor}
        width={"100%"}
        className={skeletonStyles.background}
      />
    </SkeletonTheme>
  );
}
export const SkeletonComponent = () => (
  <SkeletonTheme highlightColor="#444">
    <section>
      <Skeleton
        enableAnimation={false}
        height={10}
        width={"90%"}
        className={skeletonStyles.background}
      />
    </section>
  </SkeletonTheme>
);
