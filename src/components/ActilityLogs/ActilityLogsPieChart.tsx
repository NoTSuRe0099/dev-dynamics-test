import React from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';
import { IActivityMeta, IAuthorWorklog } from '../../services/api';
interface IActilityLogsPieChartProps {
  userData: IAuthorWorklog[];
  activityMeta: IActivityMeta[];
}
const ActilityLogsPieChart: React.FC<IActilityLogsPieChartProps> = ({
  activityMeta,
  userData,
}) => {
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }: {
    cx: number;
    cy: number;
    midAngle: number;
    innerRadius: number;
    outerRadius: number;
    percent: number;
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

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

  console.log('activities', activities);
  return (
    <>
      <div className="bg-white border shadow-sm rounded-xl flex p-4">
        <div className="h-[300px] w-[300px] lg:h-[450px] lg:w-[450px]">
          <ResponsiveContainer minWidth="100%" minHeight="100%">
            <PieChart>
              <Pie
                data={activities}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                fill="#8884d8"
                dataKey="total"
              >
                {activities.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      entry?.fillColor ? entry?.fillColor.toString() : 'red'
                    }
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center flex-col items-left gap-x-4 ml-auto w-max">
          {activityMeta?.map((activity) => (
            <div className="inline-flex items-center">
              <span
                style={{ backgroundColor: activity?.fillColor }}
                className="size-2.5 inline-block  rounded-sm me-2"
              ></span>
              <span className="text-[13px] text-gray-600 dark:text-neutral-400">
                {activity?.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ActilityLogsPieChart;
