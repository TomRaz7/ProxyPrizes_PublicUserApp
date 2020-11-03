import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

export default class SingleShop extends React.Component{

  constructor(props){
    super(props);
    this.state={
      shop:this.props.navigation.getParam("shop")
    }
  }

  render(){
    return(
      <View style={styles.container}>
        <Text>{this.state.shop.name}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
