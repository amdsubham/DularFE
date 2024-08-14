import {createSlice} from '@reduxjs/toolkit';
import {matchesAsyncAction} from './matches-actions';
import {initialState} from './matches-state';

const matchesSlice = createSlice({
  name: 'matches',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(matchesAsyncAction.matchesRequest, state => {
      state.loading = true;
      delete state.error;
    });
    builder.addCase(
      matchesAsyncAction.matchesRequestSuccess,
      (state, {payload}) => {
        state.loading = false;
        state.matches = payload;
        delete state.error;
      },
    );
    builder.addCase(matchesAsyncAction.reset, () => {
      return initialState;
    });
  },
});

export const matchesSliceActions = matchesSlice.actions;
export const matchesReducer = matchesSlice.reducer;
