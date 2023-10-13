import React from 'react';
import { AppRegistry, LogBox } from 'react-native';

import App from './App';
import { name as appName } from './app.json';
import { ManagedCheckoutContext } from 'context/checkout/checkout.context';
import { ManagedUIContext } from 'context/ui.context';



export default function Main() {
  return (
    <App />
  );
}

LogBox.ignoreAllLogs();
AppRegistry.registerComponent(appName, () => Main);
