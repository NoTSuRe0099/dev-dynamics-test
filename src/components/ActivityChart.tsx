import React, { useState } from 'react';
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
import DatePicker from './DatePicker/DatePicker';
interface ActivityChartProps {
  data: IDayWiseActivity[];
  activityMeta: IActivityMeta[];
}

const ActivityChart: React.FC<ActivityChartProps> = ({
  data,
  activityMeta,
}) => {
  const initChartData = processDayWiseActivity(data, activityMeta) || [];
  const [chartData, setChartData] = useState(initChartData);
  const selectionRange = {
    startDate: new Date(initChartData[0]?.date),
    endDate: new Date(initChartData[initChartData?.length - 1]?.date),
    key: 'selection',
  };

  const [dateRange, setDateRange] = useState(selectionRange);
  const handleRangeChange = (e: any) => {
    setDateRange(e);

    const _chartData = initChartData?.filter((it) => {
      const itemDate = new Date(it?.date);
      const startDate = new Date(e?.startDate);
      const endDate = new Date(e?.endDate);

      if (
        isNaN(itemDate.getTime()) ||
        isNaN(startDate.getTime()) ||
        isNaN(endDate.getTime())
      ) {
        return false;
      }

      return itemDate >= startDate && itemDate <= endDate;
    });

    setChartData(_chartData);
  };

  console.log('dateRange', dateRange, initChartData);

  return (
    <div className="bg-white border shadow-sm rounded-xl p-4 w-full lg:w-[75%] h-max lg:h-full">
      <div className="flex items-center justify-between pt-4 ">
        <h1 className="font-semibold text-xl text-gray-800">Activity Graph</h1>{' '}
        <DatePicker
          dateRange={[dateRange]}
          minDate={initChartData[0]?.date}
          maxDate={initChartData[initChartData?.length - 1]?.date}
          handleRangeChange={handleRangeChange}
        />
      </div>

      <div className="mt-4 w-full h-full max-h-[370px]">
        {activityMeta?.length && initChartData?.length && (
          <ResponsiveContainer>
            <AreaChart data={chartData || []}>
              <XAxis
                style={{ fontWeight: '500', fontSize: 14 }}
                dataKey="date"
              />
              <YAxis style={{ fontWeight: '500', fontSize: 14 }} />
              <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
              <Tooltip
                contentStyle={{
                  width: 'max-content',
                  fontSize: 12,
                  padding: 10,
                  margin: 0,
                  gap: 0,
                  fontWeight: '500',
                  borderRadius: 5,
                }}
                itemStyle={{
                  padding: 2,
                }}
                labelStyle={{
                  backgroundColor: '#eeeeee',
                  borderRadius: 5,
                  display: 'flex',
                  justifyContent: 'center',
                  marginBottom: 5,
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
    </div>
  );
};

export default ActivityChart;
