import React, { useEffect, useState } from 'react';
import {
  fetchData,
  IActivityMeta,
  IAuthorWorklog,
  IDayWiseActivity,
} from '../services/api';
import ActivityChart from '../components/ActivityChart';
import UserTable from '../components/UserTable';
import ActivityStatistics from '../components/ActilityLogs/ActivityLogs';
import Navbar from '../components/Navbar';
import ActilityLogsPieChart from '../components/ActilityLogs/ActilityLogsPieChart';

const Dashboard: React.FC = () => {
  const [userData, setUserData] = useState<IAuthorWorklog[]>([]);
  const [dayWiseData, setDayWiseData] = useState<IDayWiseActivity[]>([]);
  const [activityMeta, setActivityMeta] = useState<IActivityMeta[]>([]);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchData();
      setUserData(data.data.AuthorWorklog.rows);
      setDayWiseData(
        data.data.AuthorWorklog.rows.flatMap((row) => row.dayWiseActivity)
      );
      setActivityMeta(data.data.AuthorWorklog.activityMeta);
      console.log(
        'qqqq',
        data.data.AuthorWorklog.rows.flatMap((row) => row.dayWiseActivity)
      );
      console.log('userData', userData);
      data.data?.AuthorWorklog?.rows?.forEach((element) => {
        console.log('Oi', element.name, element);
      });
    };
    getData();
  }, []);

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 bg-gray-50">
      <Navbar />
      <ActivityStatistics
        activityMeta={activityMeta}
        userData={userData}
        dayWiseData={dayWiseData}
      />
      <div className="flex gap-4 sm:gap-6">
        <ActivityChart data={dayWiseData} />
        <ActilityLogsPieChart activityMeta={activityMeta} userData={userData} />
      </div>
      <UserTable users={userData} />
    </div>
  );
};

export default Dashboard;
