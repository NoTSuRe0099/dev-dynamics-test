import {
  IActivity,
  IActivityMeta,
  IAuthorWorklog,
  IDayWiseActivity,
} from '../services/api';

const init = [
  {
    label: 'PR Open',
    fillColor: '#EF6B6B',
  },
  {
    label: 'PR Merged',
    fillColor: '#61CDBB',
  },
  {
    label: 'Commits',
    fillColor: '#FAC76E',
  },
  {
    label: 'PR Reviewed',
    fillColor: '#C2528B',
  },
  {
    label: 'PR Comments',
    fillColor: '#0396A6',
  },
  {
    label: 'Incident Alerts',
    fillColor: '#5F50A9',
  },
  {
    label: 'Incidents Resolved',
    fillColor: '#8F3519',
  },
];

export const processDayWiseActivity = (
  data: IDayWiseActivity[],
  activityMeta: IActivityMeta[] = init
) => {
  const _data: IDayWiseActivity[] = JSON.parse(JSON.stringify(data));

  return _data?.length
    ? _data
        //@ts-ignore
        ?.sort((a, b) => new Date(a?.date) - new Date(b?.date))
        ?.map((day) => {
          const obj: any = { date: day?.date };
          obj.activities = activityMeta?.map((it) => {
            obj[it?.label] = getItemCount(day, it?.label)?.count || 0;
            return {
              ...it,
              ...getItemCount(day, it?.label),
            };
          });
          return obj;
        })
    : [];
};

const getItemCount = (
  day: IDayWiseActivity,
  label: string
): IActivity | null => {
  return day?.items?.children?.find((item) => item?.label === label) || null;
};

export interface IActivities extends IActivityMeta {
  total: number;
}

export interface IActivityByDate {
  date: string | number | Date;
  activities: IActivities[];
}

export const getActivities = (
  dayWiseData: IDayWiseActivity[],
  activityMeta: IActivityMeta[]
) => {
  const groupedData = dayWiseData.reduce((acc, curr) => {
    acc[curr.date] = acc[curr.date] || [];
    acc[curr.date].push(curr);
    return acc;
  }, {} as { [key: string]: IDayWiseActivity[] });

  const activityByDate: IActivityByDate[] = Object.keys(groupedData).map(
    (date) => {
      const activities: IActivities[] = activityMeta?.map((activity) => ({
        ...activity,
        total: 0,
      }));
      const allActivities = groupedData[date].flatMap(
        (it) => it?.items?.children
      );

      activities?.forEach((activity) => {
        allActivities?.forEach((tActivity) => {
          if (
            tActivity.label.toLowerCase() === activity?.label?.toLowerCase()
          ) {
            activity.total += +tActivity?.count;
          }
        });
      });

      return {
        date: new Date(date),
        activities,
      };
    }
  );

  return activityByDate;
};

export interface WeeklyAverage {
  [key: string]: { average: number; trend: string };
}

export function calculateWeeklyAverages(user: IAuthorWorklog): WeeklyAverage {
  const weeklyActivitySums: { [key: string]: number } = {};
  const weeklyActivityCounts: { [key: string]: number } = {};
  const activitySums: { [key: string]: number[] } = {};

  user?.dayWiseActivity?.forEach((dayActivity, index) => {
    dayActivity?.items?.children.forEach((activity) => {
      if (!activitySums[activity?.label]) {
        activitySums[activity?.label] = [];
        weeklyActivitySums[activity?.label] = 0;
        weeklyActivityCounts[activity?.label] = 0;
      }
      const activityCount = +activity?.count || 0;
      weeklyActivitySums[activity?.label] += activityCount;

      if (
        (index + 1) % 7 === 0 ||
        index === user?.dayWiseActivity?.length - 1
      ) {
        activitySums[activity?.label].push(weeklyActivitySums[activity?.label]);
        weeklyActivitySums[activity?.label] = 0; // Reset for the next week
        weeklyActivityCounts[activity?.label]++;
      }
    });
  });

  // Calculate the average and trend for each activity type
  const averages: WeeklyAverage = {};
  for (const label in activitySums) {
    const weeklyCounts = activitySums[label];
    const totalWeeks = weeklyCounts.length;
    const sum = weeklyCounts.reduce((acc, count) => acc + count, 0);
    const average = sum / totalWeeks;

    // Determine the trend based on the comparison of the last two weeks
    let trend = 'No change';
    if (totalWeeks > 1) {
      const lastWeek = weeklyCounts[totalWeeks - 1];
      const previousWeek = weeklyCounts[totalWeeks - 2];
      if (lastWeek > previousWeek) {
        trend = 'Increased';
      } else if (lastWeek < previousWeek) {
        trend = 'Decreased';
      }
    }

    averages[label] = { average, trend };
  }

  return averages;
}

export function aggregateData(users: IAuthorWorklog[]): WeeklyAverage {
  const combinedSums: { [key: string]: number } = {};
  const combinedCounts: { [key: string]: number } = {};
  const combinedTrends: { [key: string]: string[] } = {};

  users.forEach((user) => {
    const weeklyAverages = calculateWeeklyAverages(user);
    for (const label in weeklyAverages) {
      if (!combinedSums[label]) {
        combinedSums[label] = 0;
        combinedCounts[label] = 0;
        combinedTrends[label] = [];
      }
      combinedSums[label] += weeklyAverages[label].average;
      combinedCounts[label]++;
      combinedTrends[label].push(weeklyAverages[label].trend);
    }
  });

  const combinedAverages: WeeklyAverage = {};
  for (const label in combinedSums) {
    const average = combinedSums[label] / combinedCounts[label];

    // Determine the combined trend based on the majority of individual trends
    const trendCounts = combinedTrends[label].reduce(
      (acc: any, trend: string) => {
        if (!acc[trend]) acc[trend] = 0;
        acc[trend]++;
        return acc;
      },
      { Increased: 0, Decreased: 0, 'No change': 0 }
    );

    let combinedTrend = 'No change';
    if (
      trendCounts['Increased'] > trendCounts['Decreased'] &&
      trendCounts['Increased'] > trendCounts['No change']
    ) {
      combinedTrend = 'Increased';
    } else if (
      trendCounts['Decreased'] > trendCounts['Increased'] &&
      trendCounts['Decreased'] > trendCounts['No change']
    ) {
      combinedTrend = 'Decreased';
    }

    combinedAverages[label] = { average, trend: combinedTrend };
  }

  return combinedAverages;
}

export const dateWiseUserActivities = (
  userData: IAuthorWorklog[],
  activityMeta: IActivityMeta[]
) => {
  return userData?.map((user) => {
    const activitiesWithDate = getActivities(
      user?.dayWiseActivity,
      activityMeta
    );

    const { name, totalActivity } = user;

    return {
      name,
      totalActivity,
      activities: activitiesWithDate,
    };
  });
};
