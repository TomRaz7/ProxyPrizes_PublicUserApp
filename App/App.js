import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SwitchNavigator from './navigation/SwitchNavigator';
import {Provider} from 'react-redux';
import ConfigStore from './storeRedux/ConfigStore';
import {PersistGate} from 'redux-persist/integration/react';

export default class App extends React.Component {
  render(){
    const store = ConfigStore.getStore();
    const persistor = ConfigStore.getPersistor();
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <SwitchNavigator/>
        </PersistGate>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
