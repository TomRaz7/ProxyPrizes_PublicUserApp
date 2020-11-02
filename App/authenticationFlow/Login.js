import React from 'react';
import {Text, View, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import ConfigStore from '../storeRedux/ConfigStore';
import {connect} from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';

class Login extends React.Component{

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
      console.log("mail format valide")
      return true;
    }
    else{
      console.log("mail format invalide");
      return false;
    }
  }

  isEmpty(string){
    if(string === '' || sting === null){
      console.log('chaine vide');
      return true;
    }
    else{
      console.log('chaine non vide');
      return false;
    }
  }

  _connect(mail, password){
    if(1===1 || (this.isMailFormat(mail) === true && this.isEmpty(password) === false)){
      this.updateParentState('HKJYH754@doi8');
      let userCredentials = {mail:this.state.userMail, password:this.state.userPassword, token:'HKJYH754@doi8'};
      const action = {type:'TOGGLE_CONNECT', value:userCredentials};
      this.props.dispatch(action);
    }
  }

  _createAccount(){
    this.state.createAccount = 1;
    this.updateParentState(this.state.createAccount);
  }

  _passwordForgotten(){
    this.state.passwordForgotten = true;
    this.updateParentState(this.state.passwordForgotten);
  }

  render(){
    return(
      <View style={styles.container}>
        <Text>Connection screen</Text>
        <TextInput placeholder='Enter your email' onChangeText={(text) => this.setState({userMail:text})} keyBoardType='email-address'/>
        <TextInput placeholder="Enter your password"  onChangeText={(text) => this.setState({userPassword:text})} secureTextEntry={true}/>
        <LinearGradient style={styles.linearGradient} colors={['#00c9b7','#1DEC2F']} start={[0, 1]} end={[1, 0]}>
          <TouchableOpacity style={styles.touchableOpacity} onPress={() => this._connect(this.state.userMail, this.state.userPassword)}>
            <Text>Connect</Text>
          </TouchableOpacity>
        </LinearGradient>
        <TouchableOpacity onPress={() => this._passwordForgotten()}>
          <Text>Password forgotten ?</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this._createAccount()}>
          <Text>Create a new account</Text>
        </TouchableOpacity>
      </View>
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
  touchableOpacity:{
    alignItems: 'center',
    borderRadius: 20,
    overflow: 'hidden',
    width:200,
  },
  linearGradient:{
    padding: 15,
    alignItems: 'center',
    borderRadius: 24,
    overflow: 'hidden',
    width:200,
  },
});

const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps)(Login);
