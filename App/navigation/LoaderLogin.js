import React from 'react';
import { StyleSheet, Text, View, Image,TouchableOpacity, TextInput } from 'react-native';
import Login from '../authenticationFlow/Login';
import CreateAccount from '../authenticationFlow/CreateAccount';
import ForgetPassword from '../authenticationFlow/ForgetPassword';


export default class LoaderLogin extends React.Component{

  constructor(props){
    super(props);
    this.state={
      token:'',
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
    if((this.state.token===null || this.state.token==='') && this.state.passwordForgotten === false && this.state.createAccount ===0){
      return(
        <Login updateParentState={this.updateState.bind(this)}/>
      );
    }
    else if((this.state.token===null || this.state.token==='') && this.state.passwordForgotten === true && this.state.createAccount ===0){
      return(
        <ForgetPassword updateParentState={this.updateState.bind(this)}/>
      );
    }
    else if((this.state.token===null || this.state.token==='') && this.state.passwordForgotten === false && this.state.createAccount ===1){
      return(
        <CreateAccount updateParentState={this.updateState.bind(this)}/>
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
