import React from 'react';
import { StyleSheet, Text, View, Image,TouchableOpacity, TextInput } from 'react-native';

export default class LoaderLogin extends React.Component{
  render(){
    return(
      <View style={styles.container}>
        <Text>Connectez-vous</Text>
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
});