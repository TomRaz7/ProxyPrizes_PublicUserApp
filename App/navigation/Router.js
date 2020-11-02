import React from 'react';
import {StyleSheet, View, Text,ActivityIndicator} from 'react-native';


export default class Router extends React.Component{

  constructor(props){
    super(props);
    this.state={
      token: ''
    }
    this._chooseRoute();
  }


  _chooseRoute = () => {
    if(this.state.token === null || this.state.token ===''){
      this.props.navigation.navigate("LoaderLogin");
    }
    else{
      this.props.navigation.navigate("AppContainer");
    }
  }

  render(){
    return(
      <View style={{flex:1}}>
        <ActivityIndicator
          color='#7b68ee'
          size="large"
          style={{justifyContent:'center', alignItems:'center',flex: 1,}}/>
      </View>
    )
  }
}
