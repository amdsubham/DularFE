import {useColorScheme} from '../hooks/use-color-scheme';
import {DARK_THEME} from './dark';
import {LIGHT_THEME} from './light';
import {Theme, ThemeType} from './theme.type';

const useInitialTheme = () => {
  const intialMode = useColorScheme();

  return intialMode === 'dark' ? DARK_THEME : LIGHT_THEME;
};

const getTheme = (themeType: ThemeType) => {
  const themeByType = {
    light: LIGHT_THEME,
    dark: DARK_THEME,
  };
  return themeByType[themeType] as Theme;
};

export {getTheme, useInitialTheme};
