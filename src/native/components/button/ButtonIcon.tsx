import {Icon, IconProps} from '@rneui/base';
import React, {memo} from 'react';
import {ButtonBase, ButtonBaseProps} from './ButtonBase';

interface ButtonIconProps extends ButtonBaseProps {
  iconRightProps?: IconProps;
  iconLeftProps?: IconProps;
}

const ButtonIcon = memo<ButtonIconProps>(
  ({iconRightProps, iconLeftProps, title, ...props}) => {
    return (
      <ButtonBase {...props}>
        {iconLeftProps && <Icon {...iconLeftProps} />}
        {title}
        {iconRightProps && <Icon {...iconRightProps} />}
      </ButtonBase>
    );
  },
);

export {ButtonIcon};
export type {ButtonBaseProps};
