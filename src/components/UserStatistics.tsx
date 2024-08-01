import React from 'react';
import { IActivityMeta, IAuthorWorklog } from '../services/api';

interface IUserStatisticsProps {
  userData: IAuthorWorklog[];
  activityMeta: IActivityMeta[];
}
const UserStatistics: React.FC<IUserStatisticsProps> = ({ userData }) => {
  console.log(
    'aaaaaaaaaaaaaaaaa',
    userData?.map((it) => {
      const { dayWiseActivity, ...rest } = it;
      return rest;
    })
  );

  return <div>Commin Soon...</div>;
};

export default UserStatistics;
