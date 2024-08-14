import React, {
  FunctionComponent,
  memo,
  useCallback,
  useMemo,
  useState,
} from 'react';
import {ThemeContext} from './Theme.Context';
import {IThemeContext, Theme} from '../../theme/theme.type';
import {getTheme} from '../../theme';

interface ThemeProviderProps {
  initial: Theme;
}

const ThemeProvider: FunctionComponent<
  React.PropsWithChildren<ThemeProviderProps>
> = memo(({initial, children}) => {
  const [theme, setTheme] = useState<Theme>(initial);

  const toggleTheme = useCallback(() => {
    const newTheme = getTheme('dark');
    setTheme(newTheme);
  }, []);

  const themeValue = useMemo<IThemeContext>(() => {
    return {
      theme,
      toggleTheme,
    };
  }, [theme, toggleTheme]);

  return (
    <ThemeContext.Provider value={themeValue}>
      <>{children}</>
    </ThemeContext.Provider>
  );
});

export {ThemeProvider};
