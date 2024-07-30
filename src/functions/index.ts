import { IActivity, IActivityMeta, IDayWiseActivity } from '../services/api';

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
            obj[it?.label] = getItemCount(day, it?.label)?.count;
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
