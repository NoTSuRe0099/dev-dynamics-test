import React from 'react';
import { useSelector } from 'react-redux';
import ActilityLogsPieChart from '../components/ActivityLogs/ActivityLogsPieChart';
import ActivityStatistics from '../components/ActivityLogs/ActivityLogs';
import ActivityChart from '../components/ActivityChart';
import Navbar from '../components/Navbar';
import UserTable from '../components/UserTable';
import { processDayWiseActivity } from '../functions';
import {
  selectActivityMeta,
  selectDayWiseData,
  selectUserData,
} from '../reducers/userSlice';
import CalendarComponent from '../components/CalenderComponent';
import { IActivityMeta, IAuthorWorklog } from '../services/api';

const Dashboard: React.FC = () => {
  const userData = useSelector(selectUserData);
  const dayWiseData = useSelector(selectDayWiseData);
  const activityMeta = useSelector(selectActivityMeta);

  console.log('userData', userData);

  function calculateWeeklyAverages(user: IAuthorWorklog) {
    const activitySums: { [key: string]: number } = {};
    const activityCounts: { [key: string]: number } = {};

    user.dayWiseActivity.forEach((dayActivity, index) => {
      dayActivity.items.children.forEach((activity) => {
        if (!activitySums[activity.label]) {
          activitySums[activity.label] = 0;
          activityCounts[activity.label] = 0;
        }
        activitySums[activity.label] += parseInt(activity?.count.toString());
        activityCounts[activity.label] += 1;
      });

      if ((index + 1) % 7 === 0) {
        // Calculate weekly average
        for (const label in activitySums) {
          activitySums[label] /= activityCounts[label];
        }
      }
    });

    return activitySums;
  }

  function aggregateData(users: IAuthorWorklog[]) {
    const combinedSums: { [key: string]: number } = {};
    const combinedCounts: { [key: string]: number } = {};

    users.forEach((user) => {
      const weeklyAverages = calculateWeeklyAverages(user);
      for (const label in weeklyAverages) {
        if (!combinedSums[label]) {
          combinedSums[label] = 0;
          combinedCounts[label] = 0;
        }
        combinedSums[label] += weeklyAverages[label];
        combinedCounts[label] += 1;
      }
    });

    for (const label in combinedSums) {
      combinedSums[label] /= combinedCounts[label];
    }

    return combinedSums;
  }

  // Calculate weekly averages for each user
  userData.forEach((user: IAuthorWorklog) => {
    const weeklyAverages = calculateWeeklyAverages(user);
    console.log(`Weekly averages for ${user.name}:`, weeklyAverages);
  });

  // Calculate combined data
  const combinedData = aggregateData(userData);
  console.log('Combined weekly averages:', combinedData);

  return (
    <>
      <Navbar />
      {/* <CalendarComponent
        dayWiseData={dayWiseData}
        activityMeta={activityMeta}
        userData={userData}
      /> */}
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
