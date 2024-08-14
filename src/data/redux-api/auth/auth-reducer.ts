import {createSlice} from '@reduxjs/toolkit';
import {authAsyncAction} from './auth-actions';
import {initialState} from './auth-state';

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(authAsyncAction.loginRequest, state => {
      state.loading = true;
      state.isAuthenicated = false;
      delete state.confirmation;
      delete state.error;
      delete state.user;
    });
    builder.addCase(authAsyncAction.loginRequestSuccess, (state, {payload}) => {
      state.loading = false;
      state.confirmation = payload;
      delete state.error;
    });
    builder.addCase(authAsyncAction.loginRequestFailure, (state, {payload}) => {
      state.loading = false;
      state.error = payload;
      if (payload !== undefined) {
        delete state.confirmation;
      }
    });
    builder.addCase(authAsyncAction.verifyCodeRequest, state => {
      state.loading = true;
      delete state.error;
      delete state.user;
    });
    builder.addCase(
      authAsyncAction.verifyCodeRequestSuccess,
      (state, {payload}) => {
        state.loading = false;
        state.user = payload;
        if (payload?.stepCompleted > 8) {
          state.isAuthenicated = true;
        }
        delete state.confirmation;
      },
    );
    builder.addCase(authAsyncAction.checkCurrentUserRequest, state => {
      state.loading = true;
      delete state.confirmation;
      delete state.error;
    });
    builder.addCase(
      authAsyncAction.getNotificationLists,
      (state, {payload}) => {
        state.notifications = payload.data;
        state.notificationCount = payload.count;
      },
    );
    builder.addCase(authAsyncAction.mySeekerRequests, (state, {payload}) => {
      state.mySendSeekerRequests = payload.data;
    });
    builder.addCase(authAsyncAction.getSeekerRequests, (state, {payload}) => {
      state.seekerRequests = payload.data;
      state.seekerUnreadCount = payload.count;
    });
    builder.addCase(
      authAsyncAction.getSeekerRequestsCount,
      (state, {payload}) => {
        state.seekerUnreadCount = payload;
      },
    );
    builder.addCase(authAsyncAction.getUserLiked, (state, {payload}) => {
      state.peopleWhoLiked = payload.data;
      state.whoLikedUnreadCount = payload.count;
    });
    builder.addCase(authAsyncAction.getConversations, (state, {payload}) => {
      state.conversations = payload.data;
      state.conversationCount = payload.count;
    });
    builder.addCase(authAsyncAction.reset, () => {
      return initialState;
    });
  },
});

export const authSliceActions = authSlice.actions;
export const authReducer = authSlice.reducer;
