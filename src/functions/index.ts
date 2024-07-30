import { IDayWiseActivity } from '../services/api';

export const processDayWiseActivity = (data: IDayWiseActivity[]) => {
  return data
    .sort((a, b) => new Date(a?.date) - new Date(b?.date))
    .map((day) => ({
      date: day.date,
      commits: getItemCount(day, 'Commits'),
      prOpen: getItemCount(day, 'PR Open'),
      prMerged: getItemCount(day, 'PR Merged'),
      prReviewed: getItemCount(day, 'PR Reviewed'),
      prComments: getItemCount(day, 'PR Comments'),
      incidentAlerts: getItemCount(day, 'Incident Alerts'),
      incidentsResolved: getItemCount(day, 'Incidents Resolved'),
    }));
};

const getItemCount = (day: IDayWiseActivity, label: string) => {
  return day.items.children.find((item) => item.label === label)?.count || 0;
};
