import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts';
import { DayWiseActivity } from '../services/api';

interface ActivityChartProps {
  data: DayWiseActivity[];
}

const ActivityChart: React.FC<ActivityChartProps> = ({ data }) => {
  const chartData = data.map((day) => ({
    date: day.date,
    commits:
      day.items.children.find((item) => item.label === 'Commits')?.count || 0,
    prOpen:
      day.items.children.find((item) => item.label === 'PR Open')?.count || 0,
    prMerged:
      day.items.children.find((item) => item.label === 'PR Merged')?.count || 0,
    prReviewed:
      day.items.children.find((item) => item.label === 'PR Reviewed')?.count ||
      0,
    prComments:
      day.items.children.find((item) => item.label === 'PR Comments')?.count ||
      0,
    incidentAlerts:
      day.items.children.find((item) => item.label === 'Incident Alerts')
        ?.count || 0,
    incidentsResolved:
      day.items.children.find((item) => item.label === 'Incidents Resolved')
        ?.count || 0,
  }));

  return (
    <LineChart width={600} height={300} data={chartData}>
      <XAxis dataKey="date" />
      <YAxis />
      <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="commits" stroke="#8884d8" />
      <Line type="monotone" dataKey="prOpen" stroke="#82ca9d" />
      <Line type="monotone" dataKey="prMerged" stroke="#ffc658" />
    </LineChart>
  );
};

export default ActivityChart;
