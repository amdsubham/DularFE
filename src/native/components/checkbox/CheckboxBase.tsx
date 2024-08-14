import {
  CheckBoxProps as RNECheckBoxProps,
  CheckBox as RNECheckBox,
} from '@rneui/base';
import React, {memo} from 'react';

interface CheckBoxBaseProps extends Omit<RNECheckBoxProps, 'children'> {}

const CheckBoxBase = memo<CheckBoxBaseProps>(({...props}) => {
  return <RNECheckBox {...props} />;
});

export {CheckBoxBase};
export type {CheckBoxBaseProps};
