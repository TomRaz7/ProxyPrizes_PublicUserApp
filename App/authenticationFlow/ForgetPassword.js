import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

export default class ForgetPassword extends React.Component{

  constructor(props){
    super(props);
  }

  updateParentState(data){
    this.props.updateParentState(data);
  }

  render(){
    return(
      <View style={styles.container}>
        <Text>Récupérez votre mot de passe</Text>
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
