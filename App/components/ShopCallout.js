import React from 'react';
import {View,Text, StyleSheet} from 'react-native';

export default class ShopCallout extends React.Component{
  render(){
    return(
      <View>
        <Text>Callour shop</Text>
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
