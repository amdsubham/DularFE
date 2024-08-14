import {
  BottomSheet as RNEBotttomSheet,
  BottomSheetProps as RNEBotttomSheetProps,
} from '@rneui/base';
import React, {PropsWithChildren, memo} from 'react';

interface BottomSheetProps extends RNEBotttomSheetProps, PropsWithChildren {}

const BottomSheet = memo<BottomSheetProps>(({children, ...props}) => {
  return (
    <RNEBotttomSheet isVisible={true} {...props}>
      {children}
    </RNEBotttomSheet>
  );
});

export {BottomSheet};
export type {BottomSheetProps};
