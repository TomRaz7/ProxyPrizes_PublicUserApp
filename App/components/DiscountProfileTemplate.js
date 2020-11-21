import React from 'react';
import {Text,View,Image,TextInput,ScrollView,TouchableOpacity} from 'react-native';
//import CardView from 'react-native-cardview';


export default class DiscountProfileTemplate extends React.Component{

  render(){
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
         source={{ uri: subscriptionProps.image }}
         //source = {require('/Users/mfoulouyvesmarcel/Desktop/Official ProxyPrize/ProxyPrizes_PublicUserApp/App/assets/Asong.jpg')}
         />
         <Text
         style={{fontWeight:'bold',fontSize:14}}>{subscriptionProps.name}</Text>
      </TouchableOpacity>
    )
  }
}
