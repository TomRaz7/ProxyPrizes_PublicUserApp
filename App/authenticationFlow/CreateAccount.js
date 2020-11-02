import React from 'react';
import {Text, View, StyleSheet,TouchableOpacity, TextInput} from 'react-native';

export default class CreateAccount extends React.Component{

  constructor(props){
    super(props);
    this.state={
      createAccount:1
    }
  }

  updateParentState(data){
    this.props.updateParentState(data);
  }

  _cancel(){
    this.state.createAccount = 0;
    this.updateParentState(this.state.createAccount);
  }

  render(){
    return(
      <View style={styles.container}>
        <Text>Créez votre compte</Text>
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
