import React from 'react';
import { Calendar, Popover, Whisper } from 'rsuite';
import 'rsuite/Calendar/styles/index.css';
import {
  IActivityMeta,
  IAuthorWorklog,
  IDayWiseActivity,
} from '../services/api';
import { dateWiseUserActivities, getActivities } from '../functions';

interface ICalenderComponent {
  activityMeta: IActivityMeta[];
  dayWiseData: IDayWiseActivity[];
  userData: IAuthorWorklog[];
}

const CalenderComponent: React.FC<ICalenderComponent> = ({
  dayWiseData,
  activityMeta,
  userData,
}) => {
  const activityByDate = getActivities(dayWiseData, activityMeta);
  const dateWiseUserActivitiesData = dateWiseUserActivities(
    userData,
    activityMeta
  );

  const getUserActivitiesByDate: any = (date: string) => {
    return dateWiseUserActivitiesData?.map((it) => {
      let obj = {
        name: it?.name,
      };

      const userActs = it?.activities?.find(
        (activity) =>
          new Date(activity?.date).toDateString() ===
          new Date(date).toDateString()
      );

      obj = { ...obj, ...userActs };

      return obj;
    });
  };

  interface Activity {
    label: string;
    fillColor: string;
    total: number;
  }

  interface UserData {
    name: string;
    date: string;
    activities: Activity[];
  }

  const generateComparativeInsights = (data: UserData[]): string[] => {
    const activityTotals: { [key: string]: { [key: string]: number } } = {};
    const insights: string[] = [];

    data.forEach((user) => {
      user.activities.forEach((activity) => {
        if (!activityTotals[activity.label]) {
          activityTotals[activity.label] = {};
        }
        if (!activityTotals[activity.label][user.name]) {
          activityTotals[activity.label][user.name] = 0;
        }
        activityTotals[activity.label][user.name] += activity.total;
      });
    });

    Object.keys(activityTotals).forEach((activityLabel) => {
      const users = activityTotals[activityLabel];
      const sortedUsers = Object.keys(users).sort(
        (a, b) => users[b] - users[a]
      );
      const topUser = sortedUsers[0];
      insights.push(
        `${topUser} has created the most ${activityLabel} with a total of ${users[topUser]} activities.`
      );
    });

    return insights;
  };

  const renderCell = (date: any) => {
    const isActivityAvailable = activityByDate.find(
      (activity) =>
        new Date(activity.date).toDateString() === new Date(date).toDateString()
    );

    if (!isActivityAvailable) return null;

    if (isActivityAvailable.activities) {
      const totalActivities = isActivityAvailable.activities.reduce(
        (sum, activity) => sum + activity.total,
        0
      );

      console.log('getUserActivitiesByDate', getUserActivitiesByDate(date));

      const moreItem = (
        <li>
          <Whisper
            placement="top"
            trigger="click"
            speaker={
              <Popover>
                <div className="max-h-[200px] overflow-auto">
                  <div className="bg-gray-100 p-2 rounded-md">
                    <div className="flex items-center gap-2">
                      {' '}
                      <b className="text-[14px] font-bold">
                        Top Insights:
                      </b>{' '}
                      <p>!"Top contributor by activity"</p>
                    </div>
                    {generateComparativeInsights(
                      getUserActivitiesByDate(date)
                    )?.map((it) => (
                      <p className="font-light">{it}</p>
                    ))}
                  </div>
                  <hr className="mt-2 mb-2" />
                  <b className="text-[14px] font-bold mb-2">
                    Detailed User Overview:
                  </b>
                  <div className="bg-gray-100 p-2 rounded-md">
                    {getUserActivitiesByDate(date)?.map(
                      (item: any, index: any) => (
                        <>
                          <p className="font-bold">
                            <b>Name</b> - {item?.name}
                          </p>
                          {item?.activities?.map((el: any) => (
                            <p className="font-bold" key={index}>
                              <b style={{ color: el.fillColor?.toString() }}>
                                {el.label}
                              </b>{' '}
                              - {el.total}
                            </p>
                          ))}
                        </>
                      )
                    )}
                  </div>
                </div>
              </Popover>
            }
          >
            <a className="font-bold text-xs underline block" href="#">
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
              {isActivityAvailable.activities.map((item, index) => (
                <div key={index}>
                  <b style={{ color: item.fillColor?.toString() }}>
                    {item.label}
                  </b>{' '}
                  - {item.total}
                </div>
              ))}
            </div>
          }
        >
          <ul
            onClick={(e) => e.preventDefault()}
            className="calendar-todo-list ml-4 -mt-2 p-0 w-[90%]"
          >
            <li className="font-bold text-[12px] flex items-center gap-1">
              <strong>Total:</strong> {totalActivities} |
              <ul className="flex items-center gap-1 calendar-todo-list">
                {isActivityAvailable.activities?.map((item, index) => (
                  <li className="font-bold text-[12px]" key={index}>
                    <b style={{ color: item.fillColor?.toString() }}>
                      {item.label}
                    </b>{' '}
                    - {item.total}
                  </li>
                ))}
              </ul>
            </li>

            {/* {generateComparativeInsights(getUserActivitiesByDate(date))
              ?.splice(0, 2)
              ?.map((it) => (
                <li>
                  <p className="font-light text-xs">{it}</p>
                </li>
              ))} */}
            {moreItem}
          </ul>
        </Whisper>
      );
    }
  };

  return (
    <div className="bg-white border shadow-sm rounded-xl p-4">
      <div className="flex items-center p-4 ">
        <h1 className="text-2xl font-bold text-gray-800">Daywise Activities</h1>
      </div>
      <Calendar
        defaultValue={new Date(activityByDate[0]?.date)}
        renderCell={renderCell}
        // @ts-ignore
        onSelect={(e) => e.preventDefault()}
        bordered
        className="bg-white border shadow-sm rounded-xl"
        value={new Date(activityByDate[0]?.date)}
      />
    </div>
  );
};

export default CalenderComponent;
