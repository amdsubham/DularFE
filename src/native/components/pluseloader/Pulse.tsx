import React, {FunctionComponent, useEffect, useRef} from 'react';
import {Animated, Dimensions, Easing, StyleSheet, View} from 'react-native';
import {HEIGHT_RATIO} from '../../../utils/regex';

const {width} = Dimensions.get('window');

interface PulseProps {
  size: any;
  pulseMaxSize: any;
  borderColor: any;
  backgroundColor: any;
  getStyle: any;
  pulseStyle: any;
  interval: any;
}

const Pulse: FunctionComponent<PulseProps> = ({
  size,
  pulseMaxSize,
  borderColor,
  backgroundColor,
  getStyle,
  pulseStyle,
  interval,
}: PulseProps) => {
  const anim = useRef(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(anim.current, {
      toValue: 1,
      duration: interval,
      easing: Easing.in,
    }).start();
  }, [interval]);

  return (
    <View
      style={[
        styles.circleWrapper,
        pulseStyle,
        {
          width: pulseMaxSize,
          height: pulseMaxSize,
          marginLeft: -pulseMaxSize / 2,
          marginTop: -pulseMaxSize / 2,
        },
      ]}>
      <Animated.View
        style={[
          styles.circle,
          {
            borderColor,
            backgroundColor,
            width: anim.current.interpolate({
              inputRange: [0, 1],
              outputRange: [size, pulseMaxSize],
            }),
            height: anim.current.interpolate({
              inputRange: [0, 1],
              outputRange: [size, pulseMaxSize],
            }),
            borderRadius: pulseMaxSize / 2,
            opacity: anim.current.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 0],
            }),
          },
          getStyle && getStyle(anim.current),
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  circleWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: width / 2,
    top: HEIGHT_RATIO(0.88) / 2,
  },
  circle: {
    borderWidth: 4 * StyleSheet.hairlineWidth,
  },
});

export {Pulse};
