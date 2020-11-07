import React from 'react';
import {Text, View, StyleSheet, TextInput, TouchableOpacity, Image} from 'react-native';
import ConfigStore from '../storeRedux/ConfigStore';
import {connect} from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import Translation from '../language/Translation';


const fr = Translation.fr;
const en = Translation.en;
const es = Translation.es;

i18n.translations = {fr, en, es};
i18n.locale = "fr" //We would latter store the user preferencces through redux  : ConfigStore.getState().toggleLanguage.language

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
        <View style={styles.imageContainer}>
          <Image resizeMode="contain"
            style={styles.logo}
            source={require('../assets/logo.png')}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput style={styles.textInput} placeholder={i18n.t('log_mail')} onChangeText={(text) => this.setState({userMail:text})} keyBoardType='email-address' underlineColorAndroid="#4A86E8"/>
          <TextInput style={styles.textInput} placeholder={i18n.t('log_passwd')}  onChangeText={(text) => this.setState({userPassword:text})} secureTextEntry={true} underlineColorAndroid="#4A86E8"/>
        </View>
        <LinearGradient style={styles.linearGradient} colors={['#4A86E8','#4A86E8']} start={[0, 1]} end={[1, 0]}>
          <TouchableOpacity style={styles.touchableOpacity} onPress={() => this._connect(this.state.userMail, this.state.userPassword)}>
            <Text style={styles.connect}>{i18n.t('login')}</Text>
          </TouchableOpacity>
        </LinearGradient>
        <View style={styles.optionsContainer}>
          <TouchableOpacity onPress={() => this._passwordForgotten()}>
            <Text style={styles.option}>{i18n.t('password_forgotten')}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this._createAccount()}>
            <Text style={styles.option}>{i18n.t('register')}</Text>
          </TouchableOpacity>
        </View>
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
  imageContainer:{
    margin:10
  },
  logo:{
    width:150, height: 150
  },
  connect:{
    textAlign:'center',
    color:"#fff",
    fontSize:15
  },
  inputContainer:{
    margin:10,
    justifyContent:'space-around',
    height:80,
    width:200,
  },
  textInput:{
    height:40,
    paddingLeft:6
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
  optionsContainer:{
    height:45,
    justifyContent:'space-around',
    alignItems:'center',
    margin:20
  },
  option:{
    fontWeight:'bold',
    color:'lightgrey'
  }
});

const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps)(Login);
