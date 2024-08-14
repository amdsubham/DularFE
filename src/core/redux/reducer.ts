import AsyncStorage from '@react-native-async-storage/async-storage';
import {Action, combineReducers} from '@reduxjs/toolkit';
import {PersistConfig, persistReducer} from 'redux-persist';
import {PersistPartial} from 'redux-persist/lib/persistReducer';

import {ApplicationState} from './state';
import {reset} from './actions';
import {authReducer} from '../../data/redux-api';
import {splashReducer} from '../../data/redux-api/splash-ready/splash-reducer';
import {cardsReducer} from '../../data/redux-api/cards/cards-reducer';
import {matchesReducer} from '../../data/redux-api/matches/matches-reducer';

const persistConfig: PersistConfig<ApplicationState> = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth'],
  debug: __DEV__,
};

export const appReducer = combineReducers({
  splash: splashReducer,
  auth: persistReducer({key: 'auth', storage: AsyncStorage}, authReducer),
  cards: cardsReducer,
  matches: matchesReducer,
});

export const rootReducer = (
  state: (ApplicationState & PersistPartial) | undefined,
  action: Action,
) => {
  const persistedReducer = persistReducer(persistConfig, appReducer);
  return persistedReducer(reset.match(action) ? undefined : state, action);
};
