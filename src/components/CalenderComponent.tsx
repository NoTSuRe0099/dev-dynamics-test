import React from 'react';
import { Calendar, Popover, Whisper, Tooltip } from 'rsuite';
import 'rsuite/Calendar/styles/index.css';
import {
  IActivityMeta,
  IAuthorWorklog,
  IDayWiseActivity,
} from '../services/api';

interface ICalenderComponent {
  activityMeta: IActivityMeta[];
  dayWiseData: IDayWiseActivity[];
  userData: IAuthorWorklog[];
}
interface IActivities extends IActivityMeta {
  total: number;
}
interface IActivityByDate {
  date: string | number | Date;
  activities: IActivities[];
}

const CalenderComponent: React.FC<ICalenderComponent> = ({
  dayWiseData,
  activityMeta,
  userData,
}) => {
  // const getDayWiseData = (users: IUser[]): IDayWiseActivity[] => {
  //   return users.flatMap((user) => user.dayWiseActivity);
  // };

  // const _dayWiseData = getDayWiseData(users);

  // // Function to get additional statistics for tooltips and day boxes
  // const getUserStatistics = (date: string) => {
  //   return users.map((user) => {
  //     const dayActivity = user.dayWiseActivity.find(
  //       (activity) => activity.date === date
  //     );
  //     return {
  //       name: user.name,
  //       totalActivity: user.totalActivity,
  //       dayActivity,
  //       isBurnOut: user.activeDays.isBurnOut,
  //     };
  //   });
  // };

  const getActivities = (dayWiseData: IDayWiseActivity[]) => {
    //@ts-ignore
    const obj = Object.groupBy(dayWiseData, (it: { date: string }) => it?.date);
    const activityByDate: IActivityByDate[] = [];
    interface IActivities extends IActivityMeta {
      label: string;
      total: number;
    }

    //@ts-ignore
    for (let date in obj) {
      const activities: IActivities[] = activityMeta.map((activity) => ({
        ...activity,
        total: 0,
      }));
      const allActivities = obj[date]?.flatMap(
        (it: { items: { children: any } }) => it?.items?.children
      );

      activities.forEach((activity) => {
        allActivities?.forEach(
          (tActivity: { label: string; count: string | number }) => {
            if (
              tActivity.label.toLocaleLowerCase() ===
              activity.label.toLocaleLowerCase()
            ) {
              activity.total += +tActivity.count;
            }
          }
        );
      });

      const newObj = {
        date: date,
        activities: activities,
      };

      activityByDate?.push(newObj);
    }

    return activityByDate;
  };

  const activityByDate = getActivities(dayWiseData);
  console.log('activityByDate', activityByDate);
  const renderCell = (data: any) => {
    const isActivityAvailable = activityByDate?.find(
      (activity) =>
        new Date(activity?.date).toDateString() ===
        new Date(data).toDateString()
    );

    if (!isActivityAvailable) return null;

    if (isActivityAvailable?.activities) {
      const totalActivities = isActivityAvailable.activities.reduce(
        (sum, activity) => sum + activity.total,
        0
      );

      const moreItem = (
        <li>
          <Whisper
            placement="top"
            trigger="click"
            speaker={
              <Popover>
                {isActivityAvailable?.activities?.map(
                  (item: any, index: any) => (
                    <p className="font-bold" key={index}>
                      <b style={{ color: item?.fillColor?.toString() }}>
                        {item.label}
                      </b>{' '}
                      - {item.total}
                    </p>
                  )
                )}
              </Popover>
            }
          >
            <a className="font-bold text-xs underline ml-1 block " href="#">
              View Details
            </a>
          </Whisper>
        </li>
      );

      return (
        <Whisper
          placement="top"
          trigger="hover"
          speaker={
            <div>
              <div>
                <strong>Total Activities:</strong> {totalActivities}
              </div>
              {isActivityAvailable?.activities?.map((item, index) => (
                <div key={index}>
                  <b style={{ color: item?.fillColor?.toString() }}>
                    {item.label}
                  </b>{' '}
                  - {item.total}
                </div>
              ))}
            </div>
          }
        >
          <ul
            onClick={(e) => {
              e?.preventDefault();
            }}
            className="calendar-todo-list flex items-center flex-wrap m-0 p-0 gap-2 "
          >
            <li className="font-bold text-[12px]">
              <strong>Total:</strong> {totalActivities}
            </li>
            {[...isActivityAvailable?.activities]
              ?.splice(0,2)
              ?.map((item, index) => (
                <li className="font-bold text-[12px]" key={index}>
                  <b style={{ color: item?.fillColor?.toString() }}>
                    {item.label}
                  </b>
                  - {item.total}
                </li>
              ))}
            {moreItem}
          </ul>
        </Whisper>
      );
    }
  };

  return (
    <div className="">
      <Calendar
        defaultValue={new Date(activityByDate[0]?.date)}
        renderCell={renderCell}
        onSelect={(e) => {
          e?.preventDefault();
        }}
        bordered
        className="bg-white border shadow-sm rounded-xl p-4"
      />
    </div>
  );
};

export default CalenderComponent;
