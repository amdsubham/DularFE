import {useEffect, useState} from 'react';
import {AppState, AppStateStatus} from 'react-native';

const useAppState = (): AppStateStatus => {
  const [appState, setAppState] = useState(AppState.currentState);

  useEffect(() => {
    const handleOnAppStateChange = (newState: AppStateStatus) => {
      setAppState(newState);
    };

    const listener = AppState.addEventListener(
      'change',
      handleOnAppStateChange,
    );

    return () => {
      listener.remove();
    };
  }, []);

  return appState;
};

export {useAppState};
