import {createAction} from '@reduxjs/toolkit';
import {AuthActions} from '../../data/redux-api/auth/auth-actions';
import {CardsActions} from '../../data/redux-api/cards/cards-actions';

export const reset = createAction<void, 'core/redux/RESET'>('core/redux/RESET');

export type ActionsFromObject<
  ActionsObject extends {
    [propName: string]: (...arguments_: any[]) => any;
  },
> = {
  [Key in keyof ActionsObject]: ReturnType<ActionsObject[Key]>;
}[keyof ActionsObject];

export type ApplicationActions =
  | AuthActions
  | CardsActions
  | ReturnType<typeof reset>;
