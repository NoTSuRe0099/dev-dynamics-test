import React from 'react';
import { useSelector } from 'react-redux';
import ActivityChart from '../components/ActivityChart';
import ActivityStatistics from '../components/ActivityLogs/ActivityLogs';
import ActilityLogsPieChart from '../components/ActivityLogs/ActivityLogsPieChart';
import CalendarComponent from '../components/CalenderComponent';
import Navbar from '../components/Navbar';
import UserTable from '../components/UserTable';
import { processDayWiseActivity } from '../functions';
import {
  selectActivityMeta,
  selectDayWiseData,
  selectUserData,
} from '../reducers/userSlice';

const Dashboard: React.FC = () => {
  const userData = useSelector(selectUserData);
  const dayWiseData = useSelector(selectDayWiseData);
  const activityMeta = useSelector(selectActivityMeta);

  return (
    <>
      <Navbar />
      <ActivityStatistics
        activityMeta={activityMeta}
        userData={userData}
        dayWiseData={dayWiseData}
      />
      <CalendarComponent
        dayWiseData={dayWiseData}
        activityMeta={activityMeta}
        userData={userData}
      />

      <div className="flex lg:flex-row flex-col gap-4 sm:gap-6 lg:h-[400px]">
        {dayWiseData?.length && activityMeta?.length && (
          <ActivityChart data={dayWiseData} activityMeta={activityMeta} />
        )}
        <ActilityLogsPieChart
          activityMeta={activityMeta}
          userData={processDayWiseActivity(dayWiseData, activityMeta)}
        />
      </div>
      <UserTable users={userData} />
    </>
  );
};

export default Dashboard;
