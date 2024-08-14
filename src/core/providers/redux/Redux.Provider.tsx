import React, {PropsWithChildren, memo} from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

// Store
import {persistor, store} from '../../redux/store';
import {injectStrore} from '../../../data/web-services/api';

injectStrore(store);

export const ReduxProvider = memo<PropsWithChildren>(({children}) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
});
