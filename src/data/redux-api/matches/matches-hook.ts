import {useAppDispatch, useAppSelector} from '../../../core/redux/hooks';
import {getAllMatchesLists} from '../firestore/user-matches';
import {matchesAsyncAction} from './matches-actions';
import {getMatches, getError, getLoading} from './matches-selector';

export interface UseMatchesReturn {
  loading: boolean;
  matches?: any;
  error?: string;
  location?: any;
  fetchRequest: (uid: string) => void;
}

export const useMatches = (): UseMatchesReturn => {
  const loading = useAppSelector(getLoading);
  const matches = useAppSelector(getMatches);
  const error = useAppSelector(getError);
  const dispatch = useAppDispatch();

  const fetchRequest = (uid: string) => {
    getAllMatchesLists(uid).then(response => {
      return dispatch(matchesAsyncAction.matchesRequest(response));
    });
  };

  return {
    loading,
    matches,
    error,
    fetchRequest,
  };
};
