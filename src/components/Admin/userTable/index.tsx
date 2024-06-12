import { joinedUsers } from "../../../types/admin/users";
interface Props {
  tableTitle: String[];
  tableData: joinedUsers[];
}
const UsersTable = ({ tableTitle, tableData }: Props) => {
  return (
    <div className="overflow-x-auto">
      <div className="hidden sm:block">
        <table className="w-full rounded-lg  table-auto">
          <thead className="rounded-lg bg-[#EDEFF2] dark:bg-[#3D404B]">
            <tr>
              {tableTitle?.map((title, index) => (
                <th key={index} className={`py-3 font-bold px-2 text-xs`}>
                  {title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData?.map((user) => (
              <tr
                key={user.emailId}
                className="border-b border-defaultGray border-opacity-10 text-center text-sm"
              >
                <td className="py-3 px-2">{user.emailId}</td>
                <td className="py-3 px-2">{user.email}</td>
                <td className="py-3 px-2">{user.SubscribedAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="sm:hidden block">
        {tableData?.map((user) => (
          <div
            key={user.emailId}
            className=" flex flex-col gap-2 border rounded-lg mb-5 border-defaultGray border-opacity-10 p-4  text-xs"
          >
            <div>
              <span className="font-bold">Email ID: </span>
              {user.emailId}
            </div>
            <div>
              <span className="font-bold">Email: </span> {user.email}
            </div>
            <div>
              <span className="font-bold">Subscribed On: </span>{" "}
              {user.SubscribedAt}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersTable;
