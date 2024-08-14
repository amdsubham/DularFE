/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {ThemeProvider, ReduxProvider} from './providers';
import {useInitialTheme} from './theme';
import {AppNavigate} from './navigations/AppNavigate';
import {StripeProvider} from '@stripe/stripe-react-native';
import {STRIPE_PUBLIC_KEY} from '../data/redux-api/firestore/config';

const App = () => {
  return (
    <StripeProvider
      publishableKey={STRIPE_PUBLIC_KEY}
      urlScheme="com.legendbae://stripe">
      <ThemeProvider initial={useInitialTheme()}>
        <ReduxProvider>
          <AppNavigate />
        </ReduxProvider>
      </ThemeProvider>
    </StripeProvider>
  );
};

export default App;
