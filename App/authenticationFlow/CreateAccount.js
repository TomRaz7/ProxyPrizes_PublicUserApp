import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

export default class CreateAccount extends React.Component{

  constructor(props){
    super(props);
  }

  updateParentState(data){
    this.props.updateParentState(data);
  }

  render(){
    return(
      <View style={styles.container}>
        <Text>Créez votre compte</Text>
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
