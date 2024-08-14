import {
  ButtonGroup as RNEButtonGrop,
  ButtonGroupProps as RNEButtonGropProps,
} from '@rneui/base';
import React, {memo} from 'react';

interface SegementsProps extends RNEButtonGropProps {}

const Segements = memo<SegementsProps>(props => {
  return <RNEButtonGrop {...props} />;
});

export {Segements};
export type {SegementsProps};
