import {createAction} from '@reduxjs/toolkit';
import {type ActionsFromObject} from '../../../core/redux/actions';
import {UserModel} from '../../model/userSchema';

export const cardsAsyncAction = {
  cardsRequest: createAction<{distance: number}>('cards/REQUEST'),
  cardsRequestSuccess: createAction<{cards: UserModel[]; location: any}>(
    'cards/REQUEST/SUCCESS',
  ),
  cardsRequestFailure: createAction<string>('cards/REQUEST/FAILURE'),
  reset: createAction('cards/reset'),
};

export type CardsActions = ActionsFromObject<typeof cardsAsyncAction>;
