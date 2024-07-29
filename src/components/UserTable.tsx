import React from 'react';
import { AuthorWorklog } from '../services/api';

interface UserTableProps {
  users: AuthorWorklog[];
}

const UserTable: React.FC<UserTableProps> = ({ users }) => {
  return (
    <table className="min-w-full leading-normal">
      <thead>
        <tr>
          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
            User
          </th>
          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
            PR Open
          </th>
          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
            PR Merged
          </th>
          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Commits
          </th>
          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
            PR Reviewed
          </th>
          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
            --
          </th>
          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
            --
          </th>
          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
            --
          </th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.name}>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
              {user.name}
            </td>
            {user.totalActivity.map((activity) => (
              <td
                key={activity.name}
                className="px-5 py-5 border-b border-gray-200 bg-white text-sm"
              >
                {activity.value}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
