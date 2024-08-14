import {of} from 'rxjs';
import {catchError, filter, switchMap, withLatestFrom} from 'rxjs/operators';
import {type ApplicationEpic} from '../../../core/redux/epic';
import {cardsAsyncAction} from './cards-actions';
import {findUsers} from '../firestore/user-firestore';
import {findLocation} from '../../../utils/location';
import {UserModel} from '../../model/userSchema';

export const cardsEpic: ApplicationEpic<['auth']> = (epicActions, state) =>
  epicActions.pipe(
    filter(cardsAsyncAction.cardsRequest.match),
    withLatestFrom(state),
    switchMap(
      ([
        {
          payload: {distance},
        },
      ]) => {
        return findLocation().pipe(
          switchMap(location => {
            return findUsers(location, distance).pipe(
              switchMap(document => {
                return of(
                  cardsAsyncAction.cardsRequestSuccess({
                    cards: document as UserModel[],
                    location,
                  }),
                );
              }),
              catchError(error => {
                return of(cardsAsyncAction.cardsRequestFailure(error.messages));
              }),
            );
          }),
          catchError(error => {
            return of(cardsAsyncAction.cardsRequestFailure(error.messages));
          }),
        );
      },
    ),
  );
