import React from 'react';
import { useSelector } from 'react-redux';
import ActilityLogsPieChart from '../../components/ActilityLogs/ActilityLogsPieChart';
import ActivityStatistics from '../../components/ActilityLogs/ActivityLogs';
import ActivityChart from '../../components/ActivityChart';
import Navbar from '../../components/Navbar';
import UserTable from '../../components/UserTable';
import { processDayWiseActivity } from '../../functions';
import {
  selectActivityMeta,
  selectDayWiseData,
  selectUserData,
} from '../userSlice';

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
