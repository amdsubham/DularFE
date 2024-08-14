import {createContext} from 'react';
import {LIGHT_THEME} from '../../theme/light';
import {IThemeContext} from '../../theme/theme.type';

const intialState: IThemeContext = {
  theme: LIGHT_THEME,
  toggleTheme: () => {
    console.error('theme toggle pressed');
  },
};

const ThemeContext = createContext(intialState);

export {ThemeContext};
