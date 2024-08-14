import React, {memo} from 'react';
import {CheckBoxBase, CheckBoxBaseProps} from './CheckboxBase';

interface CheckBoxRadioProps extends CheckBoxBaseProps {}

const CheckBoxRadio = memo<CheckBoxRadioProps>(props => {
  return (
    <CheckBoxBase
      {...props}
      checkedIcon="dot-circle-o"
      uncheckedIcon="circle-o"
    />
  );
});

export {CheckBoxRadio};
export type {CheckBoxBaseProps};
