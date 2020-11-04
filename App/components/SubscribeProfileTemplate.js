import React from 'react';
import {Text,View,Image,TextInput,ScrollView,TouchableOpacity} from 'react-native';
import CardView from 'react-native-cardview';


export default class SubscribeProfileTemplate extends React.Component{

  render(){
    console.log(this.props)
    const subscriptionProps = this.props.prop
    return(
      <TouchableOpacity
      style={{
        padding:10,
        backgroundColor:'#d9d9d9',
        shadowColor: "#000000",
        shadowOpacity: 0.8,
        shadowRadius: 2,
      }}>
        <Image
         style={{width:90, height:90,borderRadius:5}}
         source = {require('/Users/mfoulouyvesmarcel/Desktop/Testons/AwesomeProject/src/images/Asong.jpg')}/>
         <Text
         style={{fontWeight:'bold',fontSize:14}}>{subscriptionProps.id}</Text>
      </TouchableOpacity>
    )
  }
}
