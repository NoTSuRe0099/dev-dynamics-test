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
import { DateRange, RangeKeyDict } from 'react-date-range';
import { MdOutlineDateRange } from 'react-icons/md';
interface ActivityChartProps {
  data: IDayWiseActivity[];
  activityMeta: IActivityMeta[];
}

const ActivityChart: React.FC<ActivityChartProps> = ({
  data,
  activityMeta,
}) => {
  const chartData = processDayWiseActivity(data) || [];
  console.log('chartData', chartData);
  const selectionRange = {
    startDate: new Date(chartData[0]?.date),
    endDate: new Date(chartData[chartData?.length - 1]?.date),
    key: 'selection',
  };

  const [dateRange, setDateRange] = useState(selectionRange);

  const handleSelect = (e: RangeKeyDict) => {
    //@ts-ignore
    setDateRange(e?.selection);
  };

  console.log('dateRange', dateRange);

  const [isDateRangeOpened, setIsDateRangeOpened] = useState(false);

  return (
    <div className="bg-white border shadow-sm rounded-xl p-4 w-full lg:w-[75%] h-[400px] lg:h-full relative">
      <div className="flex justify-end">
        <button
          onClick={() => setIsDateRangeOpened((prevState) => !prevState)}
          className="py-[7px] px-2.5 inline-flex items-center gap-1 font-medium text-sm rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100"
        >
          {isDateRangeOpened ? 'Close' : 'All Time'} <MdOutlineDateRange />
        </button>
        {isDateRangeOpened && (
          <div className="absolute right-4 top-14 z-10 bg-white border shadow-sm rounded-xl p-4">
            <DateRange
              focusedRange={[0, 0]}
              minDate={new Date(chartData[0]?.date)}
              maxDate={new Date(chartData[chartData?.length - 1]?.date)}
              ranges={[dateRange]}
              onChange={handleSelect}
            />
          </div>
        )}
      </div>

      <div className="mt-4 w-full h-full max-h-[320px]">
        {activityMeta?.length && chartData?.length && (
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
