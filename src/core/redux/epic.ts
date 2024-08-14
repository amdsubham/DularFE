import {combineEpics, Epic} from 'redux-observable';
import {
  checkCurrentUserEpic,
  loginWithPhoneEpic,
  updateUserInfoEpic,
  verifyPhoneCodeEpic,
  verifySocialEpic,
} from '../../data/redux-api/auth/auth-epic';
import {ApplicationActions} from './actions';
import {ApplicationState} from './state';
import {request} from '../../data/web-services/api';
import {splashEpic} from '../../data/redux-api/splash-ready/splash-epic';
import {cardsEpic} from '../../data/redux-api/cards/cards-epic';
import {matchesEpic} from '../../data/redux-api/matches/matches-epic';

export const epicDependencies = {
  request,
};

export type EpicDependencies = typeof epicDependencies;

export const rootEpic = combineEpics<
  ApplicationActions,
  ApplicationActions,
  Pick<ApplicationState, 'auth'>,
  EpicDependencies
>(
  loginWithPhoneEpic,
  verifyPhoneCodeEpic,
  verifySocialEpic,
  checkCurrentUserEpic,
  updateUserInfoEpic,
  cardsEpic,
  matchesEpic,
  splashEpic,
);

export type ApplicationEpic<
  ApplicationStateSlice extends
    | (keyof ApplicationState)[]
    | keyof ApplicationState
    | unknown = unknown,
> = Epic<
  ApplicationActions,
  ApplicationActions,
  ApplicationStateSlice extends (keyof ApplicationState)[]
    ? Pick<ApplicationState, ApplicationStateSlice[number]>
    : ApplicationStateSlice extends keyof ApplicationState
    ? Pick<ApplicationState, ApplicationStateSlice>
    : unknown,
  EpicDependencies
>;
