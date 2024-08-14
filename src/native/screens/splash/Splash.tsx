import React, {FunctionComponent, useEffect, useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {PINK} from '../../../themes/constantColours';
import {useSplash} from '../../../data/redux-api/splash-ready/splash-hooks';
import {useAuth} from '../../../data/redux-api/hook';

const Splash: FunctionComponent = () => {
  const {splashRequest} = useSplash();
  const {checkCurrentUser, loading} = useAuth();
  const isInitialRef = useRef(true);

  useEffect(() => {
    checkCurrentUser();
    isInitialRef.current = false;
  }, [checkCurrentUser]);

  useEffect(() => {
    if (!loading && !isInitialRef.current) {
      splashRequest();
    }
  }, [loading, splashRequest]);

  return (
    <View style={styles.container}>
      <FastImage
        source={require('./../../../core/assets/splash_logo.png')}
        style={styles.logo}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: PINK,
  },
  logo: {width: 136, height: 120},
});

export {Splash};
