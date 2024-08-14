import {configureStore, EnhancedStore, Middleware} from '@reduxjs/toolkit';
import {createEpicMiddleware, Epic} from 'redux-observable';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistStore,
} from 'redux-persist';
import {PersistPartial} from 'redux-persist/lib/persistReducer';
import {BehaviorSubject} from 'rxjs';
import {switchMap} from 'rxjs/operators';

import {ApplicationActions} from './actions';
import {epicDependencies, EpicDependencies, rootEpic} from './epic';
import {rootReducer} from './reducer';
import {ApplicationState} from './state';

declare const module: {
  hot?: {accept: (callback: () => void) => void};
};

let applicationStore: ApplicationStore | undefined;

type ApplicationStore = EnhancedStore<
  ApplicationState & PersistPartial,
  ApplicationActions
>;

const createStore = (): ApplicationStore => {
  if (applicationStore) {
    return applicationStore;
  }

  const epicMiddleware = createEpicMiddleware<
    ApplicationActions,
    ApplicationActions,
    ApplicationState,
    EpicDependencies
  >({
    dependencies: epicDependencies,
  });

  applicationStore = configureStore<
    ApplicationState & PersistPartial,
    ApplicationActions,
    Middleware[]
  >({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => {
      const middleware: Middleware[] = [
        ...getDefaultMiddleware({
          thunk: false,
          serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          },
        }),
        epicMiddleware,
      ];

      return middleware;
    },
  });

  const epicSubject = new BehaviorSubject(rootEpic);

  const reloadEpic: Epic = (...epicArguments) => {
    return epicSubject.pipe(
      switchMap(epic => {
        return epic(...epicArguments);
      }),
    );
  };

  epicMiddleware.run(reloadEpic);

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootEpic = (
        require('./epic') as {
          rootEpic: typeof rootEpic;
        }
      ).rootEpic;
      epicSubject.next(nextRootEpic);
    });
  }

  return applicationStore;
};

const store = createStore();
const persistor = persistStore(store);

type AppState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export {store, persistor, applicationStore};
export type {AppState, AppDispatch, ApplicationStore};
