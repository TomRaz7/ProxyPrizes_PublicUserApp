import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import AppContainer from './TabScreen';
import Router from './Router';
import LoaderLogin from './LoaderLogin';

const SwitchNavigator = createSwitchNavigator({
  LoaderLogin:LoaderLogin,
  Router:Router,
  AppContainer:AppContainer
},
{
    initialRouteName: 'Router'
})

export default createAppContainer(SwitchNavigator);
