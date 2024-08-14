import {of} from 'rxjs';
import {filter, switchMap} from 'rxjs/operators';
import {type ApplicationEpic} from '../../../core/redux/epic';
import {splashAsyncAction} from './splash-actions';

export const splashEpic: ApplicationEpic = (epicActions, _) =>
  epicActions.pipe(
    filter(splashAsyncAction.requestAppReady.match),
    switchMap(() => {
      return of(splashAsyncAction.requestAppReadySuccess());
    }),
  );
