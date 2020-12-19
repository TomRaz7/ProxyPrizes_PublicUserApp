import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

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
        <View style={styles.image}><Image style={styles.image} source={{ uri: this.state.post.picture }}/></View>
        <View style={styles.content}>
          <View style={styles.postHeader}>
            <Text style={styles.title}>{this.state.post.title}</Text>
            <LinearGradient style={styles.linearGradient} colors={['#0575E6','#205E9B']} start={[0, 1]} end={[1, 0]}>
              <TouchableOpacity style={styles.touchableOpacity} onPress={() => {console.log('hello');}}>
                <Text style={{color:'#fff', fontWeight:'bold'}}>Ask for availability</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
          <View style={styles.descriptionContainer}>
            <Text>{this.state.post.description}</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    textAlign:'center',
    alignItems:'center'
  },
  image:{
    flex:3,
    width:'100%'
  },
  content:{
    flex:6,
    width:'100%'
  },
  postHeader:{
    alignItems:'center',
    margin:10,
    flex:3,
    backgroundColor:'white',
    borderRadius:20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  descriptionContainer:{
    justifyContent:'center',
    alignItems:'center',
    marginBottom:10,
    marginLeft:10,
    marginRight:10,
    flex:6,
    backgroundColor:'white',
    borderRadius:20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  title:{
    margin:5,
    fontSize:15,
    fontWeight:'bold'
  },
  touchableOpacity:{
    alignItems: 'center',
    borderRadius: 20,
    overflow: 'hidden',
    width:150,
    height:40,
    justifyContent:'center'
  },
  linearGradient:{
    padding: 15,
    alignItems: 'center',
    borderRadius: 24,
    overflow: 'hidden',
    width:150,
    height:40,
    justifyContent:'center'
  },
});
