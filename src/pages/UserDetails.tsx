import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import ActivityChart from '../components/ActivityChart';
import ActivityStatistics from '../components/ActivityLogs/ActivityLogs';
import ActilityLogsPieChart from '../components/ActivityLogs/ActivityLogsPieChart';
import CalendarComponent from '../components/CalenderComponent';
import Navbar from '../components/Navbar';
import {
  getUserDetails,
  selectActivityMeta,
  selectUserDetails,
} from '../reducers/userSlice';

const UserDetails: React.FC = () => {
  const params = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserDetails(params?.name));
  }, [params, dispatch]);

  const userDetails = useSelector(selectUserDetails);
  const activityMeta = useSelector(selectActivityMeta);

  return (
    <>
      <Navbar title={`Statistics of "${userDetails?.name}" 🥷`} />

      <ActivityStatistics
        activityMeta={activityMeta}
        userData={userDetails ? [userDetails] : []}
        dayWiseData={userDetails?.dayWiseActivity || []}
      />
      <CalendarComponent
        activityMeta={activityMeta}
        userData={userDetails ? [userDetails] : []}
        dayWiseData={userDetails?.dayWiseActivity || []}
      />

      <div className="flex lg:flex-row flex-col gap-4 sm:gap-6 lg:h-[400px]">
        {userDetails?.dayWiseActivity && activityMeta && (
          <ActivityChart
            data={userDetails?.dayWiseActivity || []}
            activityMeta={activityMeta || []}
          />
        )}
        {userDetails?.dayWiseActivity && activityMeta && (
          <ActilityLogsPieChart
            activityMeta={activityMeta || []}
            dayWiseData={userDetails?.dayWiseActivity || []}
          />
        )}
      </div>
    </>
  );
};

export default UserDetails;
