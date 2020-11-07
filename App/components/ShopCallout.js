import React from 'react';
import {View,Text, StyleSheet} from 'react-native';
import {Icon, Image} from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';


export default class ShopCallout extends React.Component{


  render(){
    return(
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{this.props.name}</Text>
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.informationContainer}>
            <View style={styles.informationLigneContainer}>
              <Text style={styles.content}>{this.props.phone}</Text>
              <LinearGradient style={styles.circularLinearGradient} colors={['#4A86E8','#4A86E8']} start={[0, 1]} end={[1, 0]}>
                <Icon
                  name='phone'
                  type='entypo'
                  size={20}
                  color="#fff"/>
              </LinearGradient>
            </View>
            <View style={styles.informationLigneContainer}>
              <Text style={styles.content}>{this.props.address}</Text>
              <LinearGradient style={styles.circularLinearGradient} colors={['#4A86E8','#4A86E8']} start={[0, 1]} end={[1, 0]}>
                <Icon
                  name='home'
                  type='entypo'
                  size={20}
                  color="#fff"/>
              </LinearGradient>
            </View>
            <View style={styles.informationLigneContainer}>
              <Text style={styles.content}>{this.props.opening_hours}</Text>
              <LinearGradient style={styles.circularLinearGradient} colors={['#4A86E8','#4A86E8']} start={[0, 1]} end={[1, 0]}>
                <Icon
                  name='clock'
                  type='entypo'
                  size={20}
                  color="#fff"/>
              </LinearGradient>
            </View>
          </View>
          <View style={styles.imageContainer}>
            <View style={styles.image}>
              <Image
                source={{uri: this.props.image }}
                style={{height:120, width:120}}
              />
            </View>
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
  },
  contentContainer:{
    flex:6,
    flexDirection:'row',
  },
  titleContainer:{
    flex:2,
    alignItems:'center',
    justifyContent:'center',
    flexDirection:'row'
  },
  title:{
    textAlign:'center',
    fontWeight:'bold'
  },
  content:{
    fontSize:10,
  },
  informationContainer:{
    flex:3,
    alignItems:'center',
    justifyContent:'center',
    width:'100%',
  },
  informationLigneContainer:{
    height:30,
    width:'100%',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-around',
    margin:10

  },
  imageContainer:{
    flex:2,
    alignItems:'center',
    justifyContent:'center',

  },
  circularLinearGradient:{
    width:30,
    height:30,
    borderRadius:30,
    justifyContent:'center', alignItems:'center'
  },
  image:{
    alignItems:'center',
    justifyContent:'center',
    width:'90%',
    height:'90%',
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
});
