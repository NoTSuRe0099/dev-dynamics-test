import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  IActivityMeta,
  IAuthorWorklog,
  IDayWiseActivity,
  fetchData,
} from '../services/api';
import { RootState } from '../store/store';

export interface UserState {
  userData: IAuthorWorklog[];
  dayWiseData: IDayWiseActivity[];
  activityMeta: IActivityMeta[];
  userDetails: IAuthorWorklog | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  userData: [],
  dayWiseData: [],
  activityMeta: [],
  userDetails: null,
  loading: false,
  error: null,
};

export const fetchUserData = createAsyncThunk('user/fetchData', async () => {
  const data = await fetchData();
  return {
    userData: data?.data?.AuthorWorklog?.rows,
    dayWiseData: data?.data?.AuthorWorklog?.rows?.flatMap(
      (row) => row?.dayWiseActivity
    ),
    activityMeta: data?.data?.AuthorWorklog?.activityMeta,
  };
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUserDetails: (state, action) => {
      state.userDetails =
        state?.userData?.find((user) => user?.name === action?.payload) || null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchUserData.fulfilled,
        (
          state,
          action: PayloadAction<{
            userData: IAuthorWorklog[];
            dayWiseData: IDayWiseActivity[];
            activityMeta: IActivityMeta[];
          }>
        ) => {
          state.userData = action?.payload?.userData;
          state.dayWiseData = action?.payload?.dayWiseData;
          state.activityMeta = action?.payload?.activityMeta;
          state.loading = false;
        }
      )
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch data';
      });
  },
});

export default userSlice.reducer;

export const { getUserDetails } = userSlice.actions;

export const selectUserData = (state: RootState) => state?.user?.userData;
export const selectDayWiseData = (state: RootState) => state?.user?.dayWiseData;
export const selectActivityMeta = (state: RootState) =>
  state?.user?.activityMeta;
export const selectLoading = (state: RootState) => state?.user?.loading;
export const selectError = (state: RootState) => state?.user?.error;
export const selectUserDetails = (state: RootState) => state?.user?.userDetails;
