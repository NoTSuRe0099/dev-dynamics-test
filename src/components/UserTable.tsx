import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import { IActivityMeta, IAuthorWorklog } from '../services/api';
import { FcGenericSortingAsc, FcGenericSortingDesc } from 'react-icons/fc';

interface UserTableProps {
  users: IAuthorWorklog[];
  activityMeta: IActivityMeta[];
}

const UserTable: React.FC<UserTableProps> = ({ users, activityMeta }) => {
  const navigate = useNavigate();
  const openDetailsPage = (user: IAuthorWorklog) => {
    navigate(`/userDetails/${user?.name}`);
  };

  const _users = users?.map((it) => {
    const { activeDays, name } = it;
    const activities: { [key: string]: number } = {};

    it?.totalActivity?.forEach((el) => {
      activities[el?.name] = +el?.value;
    });

    return {
      name,
      ...activeDays,
      ...activities,
    };
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: 'asc' | 'desc';
  } | null>(null);
  const [filterBurnOut, setFilterBurnOut] = useState<boolean | null>(null);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === 'asc'
    ) {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const handleBurnOutFilterChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = event.target.value;
    setFilterBurnOut(value === 'all' ? null : value === 'true');
  };

  const filteredUsers = useMemo(() => {
    return _users
      .filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter(
        (user) => filterBurnOut === null || user.isBurnOut === filterBurnOut
      );
  }, [_users, searchTerm, filterBurnOut]);

  const sortedUsers = useMemo(() => {
    if (!sortConfig) return filteredUsers;
    const sorted = [...filteredUsers].sort((a, b) => {
      // @ts-ignore
      const aValue = a[sortConfig?.key?.toString()];
      // @ts-ignore
      const bValue = b[sortConfig?.key?.toString()];
      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [filteredUsers, sortConfig]);

  return (
    <>
      <div className="flex-col bg-white border shadow-sm rounded-xl flex p-4">
        <div className="flex items-center p-4">
          <h1 className="font-semibold text-xl text-gray-800">
            Contributors List
          </h1>
          <div className="ml-auto flex gap-x-4">
            <input
              type="text"
              placeholder="Search by name"
              value={searchTerm}
              onChange={handleSearchChange}
              className="border px-2 py-1 rounded"
            />
            <select
              onChange={handleBurnOutFilterChange}
              className="border px-2 py-1 rounded"
            >
              <option value="all">All</option>
              <option value="true">Burned Out</option>
              <option value="false">Not Burned Out</option>
            </select>
          </div>
        </div>
        <div className="-m-1.5 overflow-x-auto">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="border rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase cursor-pointer"
                      onClick={() => handleSort('name')}
                    >
                      <div className="flex items-center gap-1">
                        Name{' '}
                        {sortConfig?.key === 'name' ? (
                          sortConfig.direction === 'asc' ? (
                            <FcGenericSortingAsc />
                          ) : (
                            <FcGenericSortingDesc />
                          )
                        ) : (
                          <FcGenericSortingAsc />
                        )}
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase cursor-pointer"
                      onClick={() => handleSort('days')}
                    >
                      <div className="flex items-center gap-1">
                        Active Days{' '}
                        {sortConfig?.key === 'days' ? (
                          sortConfig.direction === 'asc' ? (
                            <FcGenericSortingAsc />
                          ) : (
                            <FcGenericSortingDesc />
                          )
                        ) : (
                          <FcGenericSortingAsc />
                        )}
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase cursor-pointer"
                      onClick={() => handleSort('isBurnOut')}
                    >
                      Burn Out
                    </th>
                    {activityMeta?.map((it) => (
                      <th
                        key={it?.label ?? 'NA'}
                        scope="col"
                        className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase cursor-pointer"
                        onClick={() => handleSort(`${it?.label}`)}
                      >
                        <div className="flex items-center gap-1">
                          {' '}
                          {it?.label ?? 'NA'}
                          {sortConfig?.key === it?.label ? (
                            sortConfig.direction === 'asc' ? (
                              <FcGenericSortingAsc />
                            ) : (
                              <FcGenericSortingDesc />
                            )
                          ) : (
                            <FcGenericSortingAsc />
                          )}
                        </div>
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
                  {sortedUsers?.map((el) => (
                    <tr key={el?.name}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                        {el?.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                        {el?.days}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                        {el?.isBurnOut ? 'Yes' : 'No'}
                      </td>
                      {activityMeta?.map((it, i) => (
                        <td
                          key={`_${it?.label}_${i}`}
                          className="px-6 py-4 whitespace-nowrap text-sm text-gray-800"
                        >
                          {/* @ts-ignore */}
                          {el?.[it?.label] ?? 'NA'}
                        </td>
                      ))}

                      <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                        <button
                          //  @ts-ignore
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
