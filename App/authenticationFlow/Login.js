import React from 'react';
import {Text, View, StyleSheet, TextInput, TouchableOpacity} from 'react-native';

export default class Login extends React.Component{

  constructor(props){
    super(props);
    this.state={
      token:null, //token is set to null for the first connection, then it will be stored within the redux persistor
      userMail:'',
      userPassword:'',
      passwordForgotten:false,
      createAccount:0
    }
  }

  updateParentState(data){
    this.props.updateParentState(data);
  }

  isMailFormat(data){
    if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data)){
      return(true);
    }
    return(false);
  }

  _createAccount(){
    this.state.createAccount = 1;
    console.log(this.state.createAccount);
    this.updateParentState(this.state.createAccount);
  }

  _passwordForgotten(){
    this.state.passwordForgotten = true;
    //console.log('Forgeted password dans le LoginPage:');
    //console.log(this.state.passwordForgotten);
    this.updateParentState(this.state.passwordForgotten);
  }

  render(){
    return(
      <View style={styles.container}>
        <Text>Connection</Text>
        <TextInput placeholder='Enter your email' onChangeText={(text) => this.setState({userMail:text})} keyBoardType='email-address'/>
        <TextInput placeholder="Enter your password"  onChangeText={(text) => this.setState({userPassword:text})} secureTextEntry={true}/>
        <TouchableOpacity onPress={() => this._passwordForgotten()}>
          <Text>Password forgotten ?</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this._createAccount()}>
          <Text>Create a new account</Text>
        </TouchableOpacity>
      </View>
    )
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
