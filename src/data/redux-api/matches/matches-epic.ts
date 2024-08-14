import {of} from 'rxjs';
import {filter, switchMap} from 'rxjs/operators';
import {type ApplicationEpic} from '../../../core/redux/epic';
import {matchesAsyncAction} from './matches-actions';

export const matchesEpic: ApplicationEpic = (epicActions, _) =>
  epicActions.pipe(
    filter(matchesAsyncAction.matchesRequest.match),
    switchMap(({payload}) => {
      return of(matchesAsyncAction.matchesRequestSuccess(payload));
    }),
  );
