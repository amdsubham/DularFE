import {NavigationContainer} from '@react-navigation/native';
import React, {memo, useCallback, useEffect} from 'react';
import {AuthenicationNavigate} from './AuthenicationNavigate';
import {Splash} from '../../native/screens/splash/Splash';
import {useAuth} from '../../data/redux-api/auth/auth-hooks';
import {DashboardNavigate} from './DashboardNavigate';
import {useSplash} from '../../data/redux-api/splash-ready/splash-hooks';
import {googleConfiguration} from '../../data/redux-api/firestore/socialLogin';
import {useStripe} from '@stripe/stripe-react-native';
import {Linking} from 'react-native';

const AppNavigate = memo(() => {
  const {isAppReady} = useSplash();
  const {isAuthenicated} = useAuth();

  useEffect(() => {
    googleConfiguration();
  }, []);

  const {handleURLCallback} = useStripe();

  const handleDeepLink = useCallback(
    async (url: string | null) => {
      if (url) {
        const stripeHandled = await handleURLCallback(url);
        if (stripeHandled) {
          // This was a Stripe URL - you can return or add extra handling here as you see fit
        } else {
          // This was NOT a Stripe URL – handle as you normally would
        }
      }
    },
    [handleURLCallback],
  );

  useEffect(() => {
    const getUrlAsync = async () => {
      const initialUrl = await Linking.getInitialURL();
      handleDeepLink(initialUrl);
    };

    getUrlAsync();

    const deepLinkListener = Linking.addEventListener(
      'url',
      (event: {url: string}) => {
        handleDeepLink(event.url);
      },
    );

    return () => deepLinkListener.remove();
  }, [handleDeepLink]);

  if (!isAppReady) {
    return <Splash />;
  }

  return (
    <NavigationContainer>
      {isAuthenicated ? <DashboardNavigate /> : <AuthenicationNavigate />}
    </NavigationContainer>
  );
});

export {AppNavigate};
