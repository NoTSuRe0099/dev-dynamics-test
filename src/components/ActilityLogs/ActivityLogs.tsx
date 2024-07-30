import React from 'react';
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

// const init = [
//   {
//     label: 'PR Opene',
//     total: 0,
//     weeklyAverage: 10,
//   },
//   {
//     label: 'PR Merged',
//     total: 0,
//     weeklyAverage: 10,
//   },
//   {
//     label: 'Commits',
//     total: 0,
//     weeklyAverage: 10,
//   },
//   {
//     label: 'PR Reviewed',
//     total: 0,
//     weeklyAverage: 10,
//   },
// ];

const ActivityStatistics: React.FC<iActivityStatisticsProps> = ({
  userData,
  activityMeta,
  dayWiseData,
}) => {
  interface IActivities extends IActivityMeta {
    label: string;
    total: number;
    change: number;
  }

  let activities: IActivities[] = activityMeta.map((activity) => ({
    ...activity,
    total: 0,
    change: 0,
  }));

  activities.map((activity) => {
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

  return (
    <>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {activities?.length ? (
          activities.map((activity, index) => (
            <div
              key={index}
              className="flex flex-col bg-white border shadow-sm rounded-xl "
            >
              <div className="p-4 md:p-5">
                <div className="flex items-center gap-x-2">
                  <p
                    className={`text-xs uppercase tracking-wide text-gray-500 `}
                  >
                    {activity.label}
                  </p>
                </div>
                <div className="mt-1 flex items-center gap-x-2">
                  <h3 className="text-xl sm:text-2xl font-medium text-gray-800">
                    {activity.total}
                  </h3>
                  {/* <span
                className={`flex items-center gap-x-1 ${
                  activity.change >= 0 ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {activity.change >= 0 ? <FaArrowUp /> : <FaArrowDown />}
                <span className="inline-block text-sm">
                  {Math.abs(activity.change)}%
                </span>
              </span> */}
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
