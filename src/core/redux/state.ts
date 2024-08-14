import {PersistPartial} from 'redux-persist/lib/persistReducer';
import {AuthState} from '../../data/redux-api/auth/auth-state';
import {SplashState} from '../../data/redux-api/splash-ready/splash-state';
import {CardsState} from '../../data/redux-api/cards/cards-state';
import {MatchesState} from '../../data/redux-api/matches/matches-state';

export interface ApplicationState {
  splash: SplashState;
  auth: AuthState & PersistPartial;
  cards: CardsState;
  matches: MatchesState;
}
