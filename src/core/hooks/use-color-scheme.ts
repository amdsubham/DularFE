import {useEffect, useState} from 'react';
import {Appearance, ColorSchemeName} from 'react-native';
import {useAppState} from './use-app-state';

const useColorScheme = (): ColorSchemeName => {
  const [colorScheme, setColorScheme] = useState(
    Appearance.getColorScheme() ?? 'light',
  );
  const appState = useAppState();

  useEffect(() => {
    if (appState === 'active') {
      setColorScheme(Appearance.getColorScheme() ?? 'light');
    }
  }, [appState]);

  return colorScheme;
};

export {useColorScheme};
