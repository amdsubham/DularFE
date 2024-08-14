import {createSlice} from '@reduxjs/toolkit';
import {splashAsyncAction} from './splash-actions';
import {initialState} from './splash-state';

const splashSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(splashAsyncAction.requestAppReady, state => {
      state.isAppReady = false;
    });
    builder.addCase(splashAsyncAction.requestAppReadySuccess, state => {
      state.isAppReady = true;
    });
  },
});

export const splashSliceActions = splashSlice.actions;
export const splashReducer = splashSlice.reducer;
