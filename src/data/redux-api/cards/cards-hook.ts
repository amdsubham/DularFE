import {useCallback} from 'react';
import {useAppDispatch, useAppSelector} from '../../../core/redux/hooks';
import {UserModel} from '../../model/userSchema';
import {cardsAsyncAction} from './cards-actions';
import {getCards, getError, getLoading, getLocation} from './cards-selector';

export interface UseCardsReturn {
  loading: boolean;
  cards?: UserModel[];
  error?: string;
  location?: any;
  fetchRequest: (distance: number) => void;
}

export const useCards = (): UseCardsReturn => {
  const loading = useAppSelector(getLoading);
  const cards = useAppSelector(getCards);
  const error = useAppSelector(getError);
  const location = useAppSelector(getLocation);
  const dispatch = useAppDispatch();

  const fetchRequest = useCallback(
    (distance: number) => {
      return dispatch(cardsAsyncAction.cardsRequest({distance}));
    },
    [dispatch],
  );

  return {
    loading,
    cards,
    error,
    location,
    fetchRequest,
  };
};
