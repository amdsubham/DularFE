import {createSelector} from '@reduxjs/toolkit';
import {type ApplicationState} from '../../../core/redux/state';

const getAuthState = ({auth}: ApplicationState) => auth;

export const getAuth = createSelector(
  getAuthState,
  auth => {
    return auth;
  },
  {
    devModeChecks: {identityFunctionCheck: 'never'},
  },
);

export const getLoading = createSelector(
  getAuth,
  auth => {
    return auth.loading;
  },
  {
    devModeChecks: {identityFunctionCheck: 'never'},
  },
);

export const getConfirmation = createSelector(
  getAuth,
  auth => {
    return auth.confirmation;
  },
  {
    devModeChecks: {identityFunctionCheck: 'never'},
  },
);

export const getError = createSelector(
  getAuth,
  auth => {
    return auth.error;
  },
  {
    devModeChecks: {identityFunctionCheck: 'never'},
  },
);

export const getUser = createSelector(
  getAuth,
  auth => {
    return auth.user;
  },
  {
    devModeChecks: {identityFunctionCheck: 'never'},
  },
);

export const getAuthenicated = createSelector(
  getUser,
  user => {
    return user && user?.stepCompleted > 8;
  },
  {
    devModeChecks: {identityFunctionCheck: 'never'},
  },
);

export const getNotificationsList = createSelector(
  getAuth,
  auth => {
    return auth.notifications;
  },
  {
    devModeChecks: {identityFunctionCheck: 'never'},
  },
);

export const getNotificationsListCount = createSelector(
  getAuth,
  auth => {
    return auth.notificationCount;
  },
  {
    devModeChecks: {identityFunctionCheck: 'never'},
  },
);

export const getPeopleWhoLikedList = createSelector(
  getAuth,
  auth => {
    return auth.peopleWhoLiked;
  },
  {
    devModeChecks: {identityFunctionCheck: 'never'},
  },
);

export const getPeopleWhoLikedListCount = createSelector(
  getAuth,
  auth => {
    return auth.whoLikedUnreadCount;
  },
  {
    devModeChecks: {identityFunctionCheck: 'never'},
  },
);

export const getMySendSeekerRequestsList = createSelector(
  getAuth,
  auth => {
    return auth.mySendSeekerRequests;
  },
  {
    devModeChecks: {identityFunctionCheck: 'never'},
  },
);

export const getSeekerRequestsList = createSelector(
  getAuth,
  auth => {
    return auth.seekerRequests;
  },
  {
    devModeChecks: {identityFunctionCheck: 'never'},
  },
);

export const getSeekerRequestsListCount = createSelector(
  getAuth,
  auth => {
    return auth.seekerUnreadCount;
  },
  {
    devModeChecks: {identityFunctionCheck: 'never'},
  },
);

export const getConversationsList = createSelector(
  getAuth,
  auth => {
    return auth.conversations;
  },
  {
    devModeChecks: {identityFunctionCheck: 'never'},
  },
);

export const getConversationsListCount = createSelector(
  getAuth,
  auth => {
    return auth.conversationCount;
  },
  {
    devModeChecks: {identityFunctionCheck: 'never'},
  },
);
