/**
 * @format
 */

import 'react-native-gesture-handler';

import {AppRegistry, LogBox} from 'react-native';
import App from './src/core/App';
import {name as appName} from './app.json';

LogBox.ignoreAllLogs();

AppRegistry.registerComponent(appName, () => App);
