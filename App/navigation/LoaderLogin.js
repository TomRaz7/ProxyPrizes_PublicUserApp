import React from 'react';
import { StyleSheet, Text, View, Image,TouchableOpacity, TextInput } from 'react-native';
import Login from '../authenticationFlow/Login';
import CreateAccount from '../authenticationFlow/CreateAccount';
import ForgetPassword from '../authenticationFlow/ForgetPassword';
import {connect} from 'react-redux';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import ConfigStore from '../storeRedux/ConfigStore';



export default class LoaderLogin extends React.Component{

  constructor(props){
    super(props);
    this.state={
      token:ConfigStore.getState().toggleAuthentication.token,
      passwordForgotten:false,
      createAccount:0
    }
  }

  updateState(dataFromChild){
    if(dataFromChild === true){
      this.setState({
        passwordForgotten:true
      })
    }
    else if(dataFromChild === false){
      this.setState({
        passwordForgotten:false
      })
    }
    else if(dataFromChild === 1){
      this.setState({
        createAccount:1
      })
    }
    else if(dataFromChild === 0){
      this.setState({
        createAccount:0
      })
    }
    else{
      this.state.token = dataFromChild;
    }
    this.forceUpdate();
  }

  render(){

    const store = ConfigStore.getStore();
    const persistor = ConfigStore.getPersistor();

    if((this.state.token===null || this.state.token==='') && this.state.passwordForgotten === false && this.state.createAccount ===0){
      return(
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <Login updateParentState={this.updateState.bind(this)}/>
          </PersistGate>
        </Provider>
      );
    }
    else if((this.state.token===null || this.state.token==='') && this.state.passwordForgotten === true && this.state.createAccount ===0){
      return(
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <ForgetPassword updateParentState={this.updateState.bind(this)}/>
          </PersistGate>
        </Provider>
      );
    }
    else if((this.state.token===null || this.state.token==='') && this.state.passwordForgotten === false && this.state.createAccount ===1){
      return(
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <CreateAccount updateParentState={this.updateState.bind(this)}/>
          </PersistGate>
        </Provider>
      );
    }
    else if((this.state.token!==null && this.state.token!=='') && this.state.passwordForgotten === false && this.state.createAccount ===0){
      this.props.navigation.navigate('AppContainer');
      return(
        null
      );
    }
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
