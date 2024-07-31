import React from 'react';
import { useSelector } from 'react-redux';
import ActivityChart from '../components/ActivityChart';
import ActivityStatistics from '../components/ActivityLogs/ActivityLogs';
import ActilityLogsPieChart from '../components/ActivityLogs/ActivityLogsPieChart';
import CalendarComponent from '../components/CalenderComponent';
import Navbar from '../components/Navbar';
import UserTable from '../components/UserTable';
import {
  aggregateData,
  calculateWeeklyAverages,
  processDayWiseActivity,
} from '../functions';
import {
  selectActivityMeta,
  selectDayWiseData,
  selectUserData,
} from '../reducers/userSlice';

const Dashboard: React.FC = () => {
  const userData = useSelector(selectUserData);
  const dayWiseData = useSelector(selectDayWiseData);
  const activityMeta = useSelector(selectActivityMeta);

  // // Calculate weekly averages for each user
  // userData.forEach((user) => {
  //   const weeklyAverages = calculateWeeklyAverages(user);
  //   console.log(`Weekly averages for ${user.name}:`, weeklyAverages);
  // });

  // // Calculate combined data
  // const combinedData = aggregateData(userData);
  // console.log('Combined weekly averages:', combinedData);
  return (
    <>
      <Navbar />
      <CalendarComponent
        dayWiseData={dayWiseData}
        activityMeta={activityMeta}
        userData={userData}
      />
      <ActivityStatistics
        activityMeta={activityMeta}
        userData={userData}
        dayWiseData={dayWiseData}
      />

      <div className="flex lg:flex-row flex-col gap-4 sm:gap-6 lg:h-[400px]">
        {dayWiseData?.length && activityMeta?.length && (
          <ActivityChart data={dayWiseData} activityMeta={activityMeta} />
        )}
        <ActilityLogsPieChart
          activityMeta={activityMeta}
          userData={processDayWiseActivity(dayWiseData)}
        />
      </div>
      <UserTable users={userData} />
    </>
  );
};

export default Dashboard;
