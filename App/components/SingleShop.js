import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements';
import {LinearGradient} from 'expo-linear-gradient'

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
        <View style={styles.headerContainer}>
          <LinearGradient style={styles.circularLinearGradient} colors={['#4A86E8','#4A86E8']} start={[0, 1]} end={[1, 0]}>
            <Icon
            name='shop'
            type='entypo'
            size={25} color="#fff"/>
          </LinearGradient>
          <Text style={styles.title}>{this.state.shop.name}</Text>
          <LinearGradient style={styles.linearGradient} colors={['#eb3349','#f45c43']} start={[0, 1]} end={[1, 0]}>
            <TouchableOpacity style={styles.touchableOpacity}>
              <Text style={styles.linearGradientText}>Subscribe</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: '#fff',
  },
  headerContainer:{
    flexDirection:'row',
    margin:10,
    justifyContent:'space-around',
    alignItems:'center',
  },
  title:{
    fontSize:25,
  },
  linearGradient:{
    padding: 10,
    alignItems: 'center',
    borderRadius: 24,
    overflow: 'hidden',
    width:100,
    height:40
  },
  linearGradientText:{
    fontWeight:'bold',
    color:'#fff'
  },
  touchableOpacity:{
    alignItems: 'center',
    borderRadius: 20,
    overflow: 'hidden',
    width:100,
    height:40
  },
  circularLinearGradient:{
    width:40,
    height:40,
    borderRadius:30,
    justifyContent:'center', alignItems:'center'
  }
});
