import React from 'react';
import {Text, View, StyleSheet,TouchableOpacity, TextInput, Image} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

//Endpoint Config
import EndpointConfig from '../server/EndpointConfig';

import i18n from 'i18n-js';
import Translation from '../language/Translation';


const fr = Translation.fr;
const en = Translation.en;
const es = Translation.es;

i18n.translations = {fr, en, es};
i18n.locale = "fr" //We would latter store the user preferencces through redux  : ConfigStore.getState().toggleLanguage.language

export default class CreateAccount extends React.Component{

  constructor(props){
    super(props);
    this.state={
      createAccount:1,
      userMail:'',
      userPassword:'',
      forname:'Terence',
      name:'Chateigné',
      picture:'https://picsum.photos/500',
      adress:'18 rue du Bastion',
      city:'Pontoise',
      birthDate:'1997-09-23',
      phone:'0657893425'
    }
  }

  updateParentState(data){
    this.props.updateParentState(data);
  }

  _cancel(){
    this.state.createAccount = 0;
    this.updateParentState(this.state.createAccount);
  }

  _createAccount(){
    console.log("creation du compte");
    fetch(EndpointConfig.fetchCreateAccount,{
      method:'POST',
      body:JSON.stringify({
        table:'customer',
        email:this.state.userMail,
        password:this.state.userPassword,
        forname:this.state.forname,
        name:this.state.name,
        picture:this.state.picture,
        adress:this.state.adress,
        city:this.state.city,
        birthdate: this.state.birthdate,
        phone: this.state.phone,
      }),
      headers:{
             Accept: 'application/json',
             'content-type':'application/json'
           }
    })
    .then(response => response.json())
    .then(responseJson => {
      console.log(responseJson);
    })
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
        <Text style={styles.title}>{i18n.t('create_account')}</Text>
        <View style={styles.inputContainer}>
          <TextInput style={styles.textInput} placeholder={i18n.t('create_account_mail')} onChangeText={(text) => this.setState({userMail:text})} keyBoardType='email-address' underlineColorAndroid="#4A86E8"/>
          <TextInput style={styles.textInput} placeholder={i18n.t('create_account_passwd')}  onChangeText={(text) => this.setState({userPassword:text})} secureTextEntry={true} underlineColorAndroid="#4A86E8"/>
          <TextInput style={styles.textInput} placeholder={i18n.t('confirm_passwd')}  onChangeText={(text) => this.setState({userPassword:text})} secureTextEntry={true} underlineColorAndroid="#4A86E8"/>
        </View>
        <LinearGradient style={styles.linearGradient} colors={['#4A86E8','#4A86E8']} start={[0, 1]} end={[1, 0]}>
          <TouchableOpacity style={styles.touchableOpacity} onPress={() => this._createAccount()}>
            <Text style={styles.validate}>{i18n.t('postForm.confirm')}</Text>
          </TouchableOpacity>
        </LinearGradient>
        <View style={styles.cancelBtnContainer}>
          <TouchableOpacity style={styles.touchableOpacity} onPress={() => this._cancel()}>
            <Text style={{color:'red'}}>{i18n.t('cancel_btn')}</Text>
          </TouchableOpacity>
        </View>
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
  imageContainer:{
    margin:10
  },
  logo:{
    width:150, height: 150
  },
  inputContainer:{
    margin:10,
    justifyContent:'space-around',
    height:100,
    width:250,
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
    height:50
  },
  title:{
    fontWeight:'bold',
    fontSize:20,
    textAlign:'center'
  },
  validate:{
    textAlign:'center',
    color:"#fff",
    fontSize:15
  },
  cancelBtnContainer:{
    margin:10
  }
});
