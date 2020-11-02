import React from 'react';
import {Text, View, StyleSheet, TextInput,TouchableOpacity} from 'react-native';

export default class ForgetPassword extends React.Component{

  constructor(props){
    super(props);
    this.state={
      userMail:'',
      passwordForgotten:true
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

  _cancel(){
    this.state.passwordForgotten =  false;
    this.updateParentState(this.state.passwordForgotten);
  }

  render(){
    return(
      <View style={styles.container}>
        <Text>Récupérez votre mot de passe</Text>
        <TextInput placeholder='Enter your email' onChangeText={(text) => this.setState({userMail:text})} keyBoardType='email-address'/>
        <TouchableOpacity onPress={() => this._cancel()}>
          <Text>Cancel</Text>
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
