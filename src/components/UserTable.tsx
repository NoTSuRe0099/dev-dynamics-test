import React from 'react';
import { useNavigate } from 'react-router';
import { IAuthorWorklog } from '../services/api';

interface UserTableProps {
  users: IAuthorWorklog[];
}

const UserTable: React.FC<UserTableProps> = ({ users }) => {
  const navigate = useNavigate();
  const openDetailsPage = (user: IAuthorWorklog) => {
    navigate(`/userDetails/${user?.name}`);
  };

  return (
    <>
      <div className="flex-col bg-white border shadow-sm rounded-xl flex p-4">
        <div className="-m-1.5 overflow-x-auto">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="border rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                    >
                      Name
                    </th>
                    {users[0]?.totalActivity?.map((it) => (
                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                      >
                        {it?.name ?? 'NA'}
                      </th>
                    ))}

                    <th
                      scope="col"
                      className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {users?.map((el) => (
                    <tr key={el?.name}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                        {el?.name}
                      </td>
                      {el?.totalActivity?.map((it, i) => (
                        <td
                          key={`_${it?.name}_${i}`}
                          className="px-6 py-4 whitespace-nowrap text-sm text-gray-800"
                        >
                          {it?.value}
                        </td>
                      ))}
                      <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                        <button
                          onClick={() => openDetailsPage(el)}
                          type="button"
                          className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 focus:outline-none focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none"
                        >
                          Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserTable;
