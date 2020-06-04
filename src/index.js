import store from '@bootstrap/store';
import { NavigationServiceLib } from '@lib/index';
import AppRoute from '@navigation/index';
import Root from '@screen/Root/index';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';

// Wrap App in Redux provider (makes Redux available to all sub-components)
export default function AppContainer() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <Root>
          <AppRoute
            ref={ref => {
              NavigationServiceLib.setTopLevelNavigator(ref);
            }}
          />
        </Root>
      </Provider>
    </SafeAreaProvider>
  );
}
