import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import AppContainer from './TabScreen';
import Router from './Router';
import LoginScreen from './LoginScreen';

const SwitchNavigator = createSwitchNavigator({
  LoginScreen:LoginScreen,
  Router:Router,
  AppContainer:AppContainer
},
{
    initialRouteName: 'Router'
})

export default createAppContainer(SwitchNavigator);
