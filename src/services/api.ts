export interface Activity {
  label: string;
  fillColor: string;
  count: number;
}

export interface DayWiseActivity {
  date: string;
  items: {
    children: Activity[];
  };
}

export interface TotalActivity {
  name: string;
  value: string;
}

export interface AuthorWorklog {
  name: string;
  totalActivity: TotalActivity[];
  dayWiseActivity: DayWiseActivity[];
}

export interface ApiResponse {
  data: {
    AuthorWorklog: {
      activityMeta: { label: string; fillColor: string }[];
      rows: AuthorWorklog[];
    };
  };
}

export const fetchData = async (): Promise<ApiResponse> => {
  const response = await fetch('./data.json');
  const data: ApiResponse = await response.json();
  return data;
};
