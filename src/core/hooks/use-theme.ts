import {useContext, useMemo} from 'react';
import {ThemeContext} from '../providers/theme/Theme.Context';
import {Theme, ColorType, ThemeType, IThemeContext} from '../theme/theme.type';

type StyleCreator<TCreator extends Record<string, unknown>> = (
  theme: Theme,
) => TCreator;

interface UseThemeReturn<TCreator extends Record<string, unknown>>
  extends IThemeContext {
  styles: TCreator;
}

const useTheme = () => {
  return useContext(ThemeContext);
};

const useThemeAwareStyles = <TCreator extends Record<string, unknown>>(
  _function: StyleCreator<TCreator>,
): UseThemeReturn<TCreator> => {
  const {theme, toggleTheme} = useTheme();

  const styles = useMemo(() => _function(theme), [_function, theme]);

  return {theme, toggleTheme, styles};
};

export {useTheme, useThemeAwareStyles};
export type {Theme, ColorType, ThemeType};
