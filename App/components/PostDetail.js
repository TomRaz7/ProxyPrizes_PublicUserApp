import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default class PostDetail extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      post:this.props.navigation.getParam("post"),
    }
  }


  render(){
    return(
      <View style={styles.container}>
        <Text>Hello {this.state.post.title}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    textAlign:'center',
    alignItems:'center'
  }
});
