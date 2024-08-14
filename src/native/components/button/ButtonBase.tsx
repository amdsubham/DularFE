import {Button as RNEButton, ButtonProps as RNEButtonProps} from '@rneui/base';
import React, {PropsWithChildren, memo} from 'react';
import {StyleSheet} from 'react-native';

interface ButtonBaseProps extends RNEButtonProps, PropsWithChildren {}

const ButtonBase = memo<ButtonBaseProps>(({children, ...props}) => {
  return (
    <RNEButton buttonStyle={styles.button} {...props}>
      {children}
    </RNEButton>
  );
});

const styles = StyleSheet.create({
  button: {
    height: 48,
  },
});

export {ButtonBase};
export type {ButtonBaseProps};
