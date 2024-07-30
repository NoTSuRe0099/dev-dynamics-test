import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  AreaChart,
  Area,
  ResponsiveContainer,
} from 'recharts';
import { IDayWiseActivity } from '../services/api';
import { processDayWiseActivity } from '../functions';

interface ActivityChartProps {
  data: IDayWiseActivity[];
}

const ActivityChart: React.FC<ActivityChartProps> = ({ data }) => {
  const chartData = processDayWiseActivity(data);
  console.log('chartData', chartData);
  return (
    <div className="bg-white border shadow-sm rounded-xl p-4 w-full">
      <ResponsiveContainer>
        <AreaChart width={900} height={300} data={chartData}>
          <XAxis dataKey="date" />
          <YAxis />
          <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
          <Tooltip />
          <Legend />
          <Area
            type="monotone"
            dataKey="commits"
            stroke="#8884d8"
            fill="#8884d8"
          />
          <Area
            type="monotone"
            dataKey="prOpen"
            stroke="#82ca9d"
            fill="#82ca9d"
          />
          <Area
            type="monotone"
            dataKey="prMerged"
            stroke="#ffc658"
            fill="#ffc658"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ActivityChart;
