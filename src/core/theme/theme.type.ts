export type ThemeType = 'light' | 'dark';

export interface ColorType {
  container: {
    backgroundColor: string;
    headerTextColor: string;
  };
  backgroundColor: string;
  primaryBackgroundColor: string;
  primaryColor: string;
  subPrimaryColor: string;
  secondaryColor: string;
  subSecondaryColor: string;
  pinkColor: string;
  borderColor: string;
  textInputBackgroundColor: string;
  chatTheme: {
    backgroundColor: string;
    left: {
      wrapper: {
        backgroundColor: string;
      };
      text: {
        color: string;
      };
    };
    right: {
      wrapper: {
        backgroundColor: string;
      };
      text: {
        color: string;
      };
    };
  };
}

export interface Theme {
  id: ThemeType;
  color: ColorType;
}

export interface IThemeContext {
  theme: Theme;
  toggleTheme(): void;
}
