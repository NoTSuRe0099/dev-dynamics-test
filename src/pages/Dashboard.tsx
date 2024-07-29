import React, { useEffect, useState } from 'react';
import { fetchData, AuthorWorklog, DayWiseActivity } from '../services/api';
import ActivityChart from '../components/ActivityChart';
import UserTable from '../components/UserTable';

const Dashboard: React.FC = () => {
  const [userData, setUserData] = useState<AuthorWorklog[]>([]);
  const [dayWiseData, setDayWiseData] = useState<DayWiseActivity[]>([]);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchData();
      setUserData(data.data.AuthorWorklog.rows);
      setDayWiseData(
        data.data.AuthorWorklog.rows.flatMap((row) => row.dayWiseActivity)
      );
      console.log('Oi', data.data);
    };
    getData();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <ActivityChart data={dayWiseData} />
      <UserTable users={userData} />
    </div>
  );
};

export default Dashboard;
