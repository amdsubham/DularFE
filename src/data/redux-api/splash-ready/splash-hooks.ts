import {useAppDispatch, useAppSelector} from '../../../core/redux/hooks';
import {splashAsyncAction} from './splash-actions';
import {getAppReady} from './splash-selector';

export interface UseSplashReturn {
  isAppReady: boolean;
  splashRequest: () => void;
}

export const useSplash = (): UseSplashReturn => {
  const isAppReady = useAppSelector(getAppReady);
  const dispatch = useAppDispatch();

  const splashRequest = () => {
    return dispatch(splashAsyncAction.requestAppReady());
  };

  return {
    isAppReady,
    splashRequest,
  };
};
