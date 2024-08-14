import {createSelector} from '@reduxjs/toolkit';
import {type ApplicationState} from '../../../core/redux/state';

const getMatchesState = ({matches}: ApplicationState) => matches;

export const getMatche = createSelector(
  getMatchesState,
  matches => {
    return matches;
  },
  {
    devModeChecks: {identityFunctionCheck: 'never'},
  },
);

export const getLoading = createSelector(
  getMatche,
  card => {
    return card.loading;
  },
  {
    devModeChecks: {identityFunctionCheck: 'never'},
  },
);

export const getError = createSelector(
  getMatche,
  card => {
    return card.error;
  },
  {
    devModeChecks: {identityFunctionCheck: 'never'},
  },
);

export const getMatches = createSelector(
  getMatche,
  card => {
    return card.matches ?? [];
  },
  {
    devModeChecks: {identityFunctionCheck: 'never'},
  },
);
