import {memo} from 'react';
import {Badge as RNEBadge, BadgeProps as RNEBadgeProps} from '@rneui/themed';

interface BadgeProps extends Omit<RNEBadgeProps, 'value'> {
  count: string;
}

const Badge = memo<BadgeProps>(({count, ...props}) => {
  return <RNEBadge value={count} status={'primary'} {...props} />;
});

export {Badge};
export type {BadgeProps};
