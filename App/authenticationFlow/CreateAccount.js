import React from 'react';
import {Text, View, StyleSheet,TouchableOpacity, TextInput, Image, Modal, TouchableHighlight, Button} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import DatePicker from 'react-native-datepicker';
import DropDownPicker from 'react-native-dropdown-picker';

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
      confirmPassword:'',
      forname:'Terence',
      name:'Chateigné',
      picture:'https://picsum.photos/500',
      adress:'18 rue du Bastion',
      city:'Lleida',
      birthDate:'1997-09-23',
      phone:'0657893425',
      isModalVisible:false,
      datePickerVisible:false,
      date: new Date()
    }
  }

  setModalVisible = (visible) => { //The modal will be used to confirm the account creation
    this.setState({ isModalVisible: visible });
  }


  setDatePickerVisible = (visible) => {
    this.setState({ datePickerVisible: visible });
  }

  updateParentState(data){
    this.props.updateParentState(data);
  }

  _cancel(){
    this.state.createAccount = 0;
    this.updateParentState(this.state.createAccount);
  }

  _createAccount(){
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
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson);
      if(responseJson.code === 200){
        this.setModalVisible(true);
      }

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
          <TextInput style={styles.textInput} placeholder={i18n.t('confirm_passwd')}  onChangeText={(text) => this.setState({confirmPassword:text})} secureTextEntry={true} underlineColorAndroid="#4A86E8"/>
        </View>
        <View style={styles.personalInformartionContainer}>
          <View style = {styles.nameFornamePhoneContainer}>
            <TextInput style={styles.textInput} placeholder={i18n.t('create_account_name')} onChangeText={(text) => this.setState({name:text})} keyBoardType='email-address' underlineColorAndroid="#4A86E8"/>
            <TextInput style={styles.textInput} placeholder={i18n.t('create_account_forname')} onChangeText={(text) => this.setState({forname:text})} keyBoardType='email-address' underlineColorAndroid="#4A86E8"/>
            <TextInput style={styles.textInput} placeholder={i18n.t('create_account_phone')} onChangeText={(text) => this.setState({phone:text})} keyBoardType='email-address' underlineColorAndroid="#4A86E8"/>
          </View>
          <View style={styles.datePickerContainer}>
            <DatePicker
             style={{width: 200}}
             date={this.state.date}
             mode="date"
             placeholder="select date"
             format="YYYY-MM-DD"
             confirmBtnText="Confirm"
             cancelBtnText="Cancel"
             customStyles={{
               dateIcon: {
                 position: 'absolute',
                 left: 0,
                 top: 4,
                 marginLeft: 0
               },
               dateInput: {
                 marginLeft: 36
               }
             }}
             onDateChange={(date) => {this.setState({date: date})}}
           />
         </View>
         <View style={styles.adressContainer}>
           <TextInput style={styles.textInput} placeholder={i18n.t('create_account_adress')} onChangeText={(text) => this.setState({adress:text})} keyBoardType='email-address' underlineColorAndroid="#4A86E8"/>
           <DropDownPicker
             items={[
                 {label: 'Lleida', value: 'Lleida'},
                 {label: 'Sabadell', value: 'Sabadell'},
             ]}
             defaultValue={this.state.city}
             containerStyle={{height: 40, width:150}}
             style={{backgroundColor: '#4A86E8'}}
             itemStyle={{
                 justifyContent: 'flex-start',
             }}
             dropDownStyle={{backgroundColor: '#fafafa'}}
             onChangeItem={item => this.setState({
                 city: item.value
             })}
          />
         </View>
        </View>
        <View style={styles.btnContainer}>
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
        <View style={styles.centeredView}>
          <Modal
              animationType="slide"
              transparent={true}
              visible={this.state.isModalVisible}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
              }}
            >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>{i18n.t('account_created_confirmation')} {this.state.userMail}</Text>
                <TouchableHighlight
                  style={{ ...styles.openButton, backgroundColor: "#2196F3", margin:20 }}
                  onPress={() => {
                    this.setModalVisible(false);
                    this._cancel();
                  }}
                >
                  <Text style={styles.textStyle}>{i18n.t('postForm.confirm')}</Text>
                </TouchableHighlight>
              </View>
            </View>
          </Modal>
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
  btnContainer:{
    top:30,
    justifyContent:'center',
    alignItems:'center'
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
  personalInformartionContainer:{
    margin:5,
    height:200,
    width:250,
    marginBottom:10
  },
  datePickerContainer:{
    marginLeft:15,
    marginTop:15
  },
  adressContainer:{
    marginTop:25,
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center'
  },
  nameFornamePhoneContainer:{
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center'
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
  },
  centeredView: {

    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "bold",
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
});
