import React from 'react';
import {View,Text, StyleSheet, Image} from 'react-native';
import {Icon} from 'react-native-elements';


export default class ShopCallout extends React.Component{


  render(){
    return(
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Nom du magasin</Text>
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.informationContainer}>
            <Text>Info 1</Text>
            <Text>Info 2</Text>
            <Text>Info 3</Text>
            <Text>Info 4</Text>
          </View>
          <View style={styles.imageContainer}>
          </View>
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex:1,
    height:200,
    width:300,
    backgroundColor:'yellow'
  },
  contentContainer:{
    flex:6,
    flexDirection:'row',
    backgroundColor:'green'
  },
  titleContainer:{
    flex:2,
    backgroundColor:'red',
    alignItems:'center',
    justifyContent:'center',
    flexDirection:'row'
  },
  title:{
    textAlign:'center'
  },
  informationContainer:{
    flex:2,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'blue'
  },
  imageContainer:{
    flex:2,
    backgroundColor:'grey',
    alignItems:'center',
    justifyContent:'center',
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
});
