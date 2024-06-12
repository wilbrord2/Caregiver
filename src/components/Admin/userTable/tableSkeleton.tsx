import React from "react";
import { SkeletonComponent } from "../../../pages/skeletons";
interface Props {
  tableTitle: String[];
  dataloading: boolean;
}
const TableSkeleton = ({ tableTitle, dataloading }: Props) => {
  let array: number[] = [];
  let row = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  let col = 0;
  while (tableTitle.length > col) {
    array.push(col);
    col++;
  }
  return (
    <div className="overflow-x-auto sm:border sm:rounded-lg sm:border-defaultGray sm:border-opacity-10 ">
      <div className="hidden sm:block">
        <table className="table min-w-[1000px] lg:min-w-0  rounded-lg  table-auto lg:w-full">
          <thead className="rounded-lg bg-[#EDEFF2] dark:bg-[#3D404B]">
            <tr className=" sm:border-defaultGray sm:border-opacity-10 ">
              {tableTitle.map((title, index) => (
                <th
                  key={index}
                  className={`${
                    title === "Name" || title === "Associated Email"
                      ? "text-start text-sm"
                      : ""
                  } py-3 font-bold text-xs`}
                >
                  {title}
                </th>
              ))}
            </tr>
          </thead>
          {dataloading && (
            <tbody>
              {row.map((index) => (
                <tr
                  key={index}
                  className=" sm:border-defaultGray sm:border-opacity-10 "
                >
                  {array.map((index) => (
                    <td key={index}>
                      <SkeletonComponent />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
      <div className="sm:hidden block">
        <div className=" flex flex-col gap-2 border rounded-lg mb-5 border-defaultGray border-opacity-10 p-4 font-bold text-xs">
          <SkeletonComponent />
          <SkeletonComponent />
          <SkeletonComponent />
          <SkeletonComponent />
          <SkeletonComponent />
          <SkeletonComponent />
          <SkeletonComponent />
          <SkeletonComponent />
          <SkeletonComponent />
          <SkeletonComponent />
        </div>
      </div>
    </div>
  );
};
export default TableSkeleton;
