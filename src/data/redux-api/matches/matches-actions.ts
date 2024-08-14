import {createAction} from '@reduxjs/toolkit';
import {type ActionsFromObject} from '../../../core/redux/actions';

export const matchesAsyncAction = {
  matchesRequest: createAction<any>('user/MATCHES'),
  matchesRequestSuccess: createAction<any>('user/MATCHES/SUCCESS'),
  reset: createAction('user/MATCHES/reset'),
};

export type MatchesActions = ActionsFromObject<typeof matchesAsyncAction>;
