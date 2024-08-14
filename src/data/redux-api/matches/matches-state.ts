export interface MatchesState {
  loading: boolean;
  error?: string;
  matches?: any;
}

export const initialState: MatchesState = {
  loading: false,
};
