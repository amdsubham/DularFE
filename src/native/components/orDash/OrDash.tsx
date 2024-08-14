import React, {FunctionComponent} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useTheme} from '../../../core/hooks';
import {ASPECT_RATIO} from '../../../utils/regex';

const OrDash: FunctionComponent = () => {
  const {
    theme: {color},
  } = useTheme();

  return (
    <View style={styles.orView}>
      <View
        style={StyleSheet.flatten([
          styles.divider,
          {backgroundColor: color.subSecondaryColor},
        ])}
      />
      <Text
        style={StyleSheet.flatten([
          styles.orText,
          {color: color.secondaryColor},
        ])}>
        Or Login with
      </Text>
      <View
        style={StyleSheet.flatten([
          styles.divider,
          {backgroundColor: color.subSecondaryColor},
        ])}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  orView: {
    flexDirection: 'row',
    marginVertical: ASPECT_RATIO(25),
    justifyContent: 'center',
    alignItems: 'center',
  },
  orText: {marginHorizontal: 5},
  divider: {
    width: 30,
    height: 1,
  },
});

export {OrDash};
