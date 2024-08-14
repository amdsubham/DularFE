import {
  BORDER,
  BUBBLELEFT,
  BUBBLERIGHT,
  Black,
  INFOTEXTCOLOR,
  LIGHTWHITE,
  PINK,
  PRIMARYB,
  TEXTCOLOR,
  TIMETEXTCOLOR,
  White,
} from '../../../themes/constantColours';
import {ColorType} from '../theme.type';

const THEME_COLOR: ColorType = {
  container: {
    backgroundColor: White,
    headerTextColor: Black,
  },
  backgroundColor: White,
  primaryBackgroundColor: PRIMARYB,
  primaryColor: Black,
  subPrimaryColor: INFOTEXTCOLOR,
  secondaryColor: TEXTCOLOR,
  subSecondaryColor: TIMETEXTCOLOR,
  pinkColor: PINK,
  borderColor: BORDER,
  textInputBackgroundColor: LIGHTWHITE,
  chatTheme: {
    backgroundColor: Black,
    left: {
      wrapper: {
        backgroundColor: BUBBLELEFT,
      },
      text: {
        color: Black,
      },
    },
    right: {
      wrapper: {
        backgroundColor: BUBBLERIGHT,
      },
      text: {
        color: White,
      },
    },
  },
};

export {THEME_COLOR};
