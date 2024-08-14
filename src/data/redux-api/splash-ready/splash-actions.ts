import {createAction} from '@reduxjs/toolkit';
import {type ActionsFromObject} from '../../../core/redux/actions';

export const splashAsyncAction = {
  requestAppReady: createAction('splash/APP_READY_REQUEST'),
  requestAppReadySuccess: createAction('splash/APP_READY_REQUEST/SUCCESS'),
};

export type SplashActions = ActionsFromObject<typeof splashAsyncAction>;
