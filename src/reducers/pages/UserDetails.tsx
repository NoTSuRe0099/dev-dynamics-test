import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import ActilityLogsPieChart from '../../components/ActilityLogs/ActilityLogsPieChart';
import ActivityStatistics from '../../components/ActilityLogs/ActivityLogs';
import ActivityChart from '../../components/ActivityChart';
import { processDayWiseActivity } from '../../functions';
import {
  getUserDetails,
  selectActivityMeta,
  selectUserDetails,
} from '../userSlice';

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
      <ActivityStatistics
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
        <ActilityLogsPieChart
          activityMeta={activityMeta || []}
          userData={processDayWiseActivity(userDetails?.dayWiseActivity || [])}
        />
      </div>
    </>
  );
};

export default UserDetails;
