import {createSelector} from '@reduxjs/toolkit';
import {type ApplicationState} from '../../../core/redux/state';

const getSplashState = ({splash}: ApplicationState) => splash;

export const getSplash = createSelector(
  getSplashState,
  splash => {
    return splash;
  },
  {
    devModeChecks: {identityFunctionCheck: 'never'},
  },
);

export const getAppReady = createSelector(
  getSplash,
  auth => {
    return auth.isAppReady;
  },
  {
    devModeChecks: {identityFunctionCheck: 'never'},
  },
);
