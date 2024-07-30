import React from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';
import { IActivityMeta } from '../../services/api';
interface IActilityLogsPieChartProps {
  userData: {
    date: string;
    activities: { count: string; fillColor: string; label: string }[];
  }[];
  activityMeta: IActivityMeta[];
}

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
      fontSize={14}
      fontWeight={500}
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

const ActilityLogsPieChart: React.FC<IActilityLogsPieChartProps> = ({
  activityMeta,
  userData,
}) => {
  interface IActivities extends IActivityMeta {
    label: string;
    total: number;
  }

  const activities: IActivities[] =
    activityMeta.map((activity) => ({
      ...activity,
      total: 0,
    })) || [];

  if (activities) {
    activities.map((activity) => {
      userData?.forEach((user) =>
        user.activities?.forEach((tActivity) => {
          if (
            tActivity.label.toLocaleLowerCase() ===
            activity.label.toLocaleLowerCase()
          ) {
            activity.total += +tActivity.count;
          }
        })
      );
    });
  }

  return (
    <>
      <div className="bg-white border shadow-sm rounded-xl flex p-4 w-full lg:w-[35%] lg:h-full h-[300px]">
        <ResponsiveContainer>
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
                  fill={entry?.fillColor ? entry?.fillColor.toString() : 'red'}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="flex justify-center flex-col items-left gap-x-4 ml-auto w-max">
          {activityMeta?.map((activity) => (
            <div className="inline-flex items-center">
              <span
                style={{ backgroundColor: activity?.fillColor.toString() }}
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
