/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  useColorScheme,
} from 'react-native';

import { store } from './src/store';
import { Provider } from 'react-redux';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import AppNavigator from './src/screens/navigators/AppNavigator';




function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <Provider store={store}>
      < AppNavigator />
    </Provider>
  );
}

export default App;
