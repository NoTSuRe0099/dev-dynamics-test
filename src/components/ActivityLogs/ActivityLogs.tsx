import React from 'react';
import { IoIosTrendingDown, IoIosTrendingUp } from 'react-icons/io';
import { aggregateData } from '../../functions';
import {
  IActivityMeta,
  IAuthorWorklog,
  IDayWiseActivity,
} from '../../services/api';

interface iActivityStatisticsProps {
  userData: IAuthorWorklog[];
  activityMeta: IActivityMeta[];
  dayWiseData: IDayWiseActivity[];
}

const ActivityStatistics: React.FC<iActivityStatisticsProps> = ({
  userData,
  activityMeta,
}) => {
  interface IActivities extends IActivityMeta {
    label: string;
    total: number;
    change: number;
  }

  const activities: IActivities[] = activityMeta.map((activity) => ({
    ...activity,
    total: 0,
    change: 0,
  }));

  activities.forEach((activity) => {
    userData?.forEach((user) =>
      user.totalActivity?.forEach((tActivity) => {
        if (
          tActivity.name.toLocaleLowerCase() ===
          activity.label.toLocaleLowerCase()
        ) {
          activity.total += +tActivity.value;
        }
      })
    );
  });

  const weeklyAverage = aggregateData(userData);
  console.log('weeklyAverage', weeklyAverage);
  return (
    <>
      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-2 sm:gap-5">
        {activities?.length ? (
          activities.map((activity, index) => (
            <div
              key={index}
              className="flex flex-col bg-white border shadow-sm rounded-xl p-4 md:p-5 space-y-2"
            >
              <div className="flex items-center gap-x-2">
                <p className="text-xs uppercase tracking-wide text-gray-500">
                  {activity.label}
                </p>
              </div>

              <div className="mt-1 flex items-center justify-between">
                <h3 className="text-xl sm:text-2xl font-medium text-gray-800">
                  {activity.total}
                </h3>
                <div className="flex flex-col items-end">
                  <span className="text-sm text-gray-500">Weekly Avg</span>
                  <span
                    className={`text-md font-semibold text-gray-800 flex items-center gap-1 justify-center ${
                      weeklyAverage[activity.label]?.trend === 'Increased'
                        ? 'text-green-600'
                        : 'text-red-600'
                    }`}
                  >
                    {weeklyAverage[activity.label]?.average?.toFixed(2)}{' '}
                    {weeklyAverage[activity.label]?.trend === 'Increased' ? (
                      <IoIosTrendingUp />
                    ) : (
                      <IoIosTrendingDown />
                    )}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col bg-white border shadow-sm rounded-xl">
            <div className="p-4 md:p-5">
              <div className="flex items-center gap-x-2">
                <p className={`text-xs uppercase tracking-wide text-gray-500 `}>
                  PR Open
                </p>
              </div>
              <div className="mt-1 flex items-center gap-x-2">
                <h3 className="text-xl sm:text-2xl font-medium text-gray-800">
                  0
                </h3>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ActivityStatistics;
