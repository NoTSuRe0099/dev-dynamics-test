export interface IActivity {
  label: string;
  fillColor: string;
  count: number;
}

export interface IDayWiseActivity {
  date: string;
  items: {
    children: IActivity[];
  };
}

export interface ITotalActivity {
  name: string;
  value: string;
}

export interface IAuthorWorklog {
  name: string;
  totalActivity: ITotalActivity[];
  dayWiseActivity: IDayWiseActivity[];
}

export interface ApiResponse {
  data: {
    AuthorWorklog: {
      activityMeta: IActivityMeta[];
      rows: IAuthorWorklog[];
    };
  };
}

export interface IActivityMeta {
  label: string;
  fillColor: String;
}

export const fetchData = async (): Promise<ApiResponse> => {
  const response = await fetch('./data.json');
  const data: ApiResponse = await response.json();
  return data;
};
