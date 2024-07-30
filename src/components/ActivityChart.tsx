import React from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { processDayWiseActivity } from '../functions';
import { IActivityMeta, IDayWiseActivity } from '../services/api';

interface ActivityChartProps {
  data: IDayWiseActivity[];
  activityMeta: IActivityMeta[];
}

const ActivityChart: React.FC<ActivityChartProps> = ({
  data,
  activityMeta,
}) => {
  const chartData = processDayWiseActivity(data) || [];

  return (
    <div className="bg-white border shadow-sm rounded-xl p-4 w-full lg:w-[75%] h-[500px] lg:h-full">
      {activityMeta?.length && chartData?.length && (
        <ResponsiveContainer height={'100%'}>
          <AreaChart width={700} height={400} data={chartData || []}>
            <XAxis dataKey="date" />
            <YAxis />
            <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
            <Tooltip
              contentStyle={{
                width: 'max-content',
                fontSize: 12,
                padding: 10,
                margin: 0,
                gap: 0,
                fontWeight: '500',
              }}
            />
            <Legend />
            {activityMeta?.length &&
              activityMeta?.map((activity) => (
                <Area
                  type="monotone"
                  dataKey={activity?.label}
                  stroke={activity?.fillColor?.toString()}
                  fill={activity?.fillColor?.toString()}
                />
              ))}
          </AreaChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default ActivityChart;
