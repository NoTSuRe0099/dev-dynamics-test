import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import ActilityLogsPieChart from '../components/ActivityLogs/ActivityLogsPieChart';
import ActivityStatistics from '../components/ActivityLogs/ActivityLogs';
import ActivityChart from '../components/ActivityChart';
import { processDayWiseActivity } from '../functions';
import {
  getUserDetails,
  selectActivityMeta,
  selectUserDetails,
} from '../reducers/userSlice';
import { BiArrowBack } from 'react-icons/bi';
import CalendarComponent from '../components/CalenderComponent';

const UserDetails: React.FC = () => {
  const params = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserDetails(params?.name));
  }, [params, dispatch]);

  const userDetails = useSelector(selectUserDetails);
  const activityMeta = useSelector(selectActivityMeta);

  return (
    <>
      <div>
        <button
          onClick={() => navigate('/')}
          className="py-[7px] px-2.5 inline-flex items-center gap-1 font-medium text-sm rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100"
        >
          <BiArrowBack /> Back
        </button>
      </div>
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
        <ActilityLogsPieChart
          activityMeta={activityMeta || []}
          userData={processDayWiseActivity(userDetails?.dayWiseActivity || [])}
        />
      </div>
    </>
  );
};

export default UserDetails;
