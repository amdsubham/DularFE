import React, {FunctionComponent} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useTheme} from '../../../core/hooks';

const RegisterInfo: FunctionComponent = () => {
  const {
    theme: {color},
  } = useTheme();

  return (
    <View style={styles.infoContainer}>
      <Text style={[styles.infoText, {color: color.subPrimaryColor}]}>
        By creating an account, you agree to our
      </Text>
      <View style={styles.info}>
        <Text style={[styles.infoText, {color: color.primaryColor}]}>
          Terms & Conditions
        </Text>
        <Text style={[styles.infoText, {color: color.subPrimaryColor}]}>
          {' '}
          and{' '}
        </Text>
        <Text style={[styles.infoText, {color: color.primaryColor}]}>
          Privacy policy
        </Text>
        <Text style={[styles.infoText, {color: color.subPrimaryColor}]}>
          {' '}
          of Legendbae
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  infoContainer: {
    flex: 1,
    marginHorizontal: 20,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 25,
  },
  info: {flexDirection: 'row'},
  infoText: {
    fontSize: 14,
    fontWeight: '500',
  },
});

export {RegisterInfo};
