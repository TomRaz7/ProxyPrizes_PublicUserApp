import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import MapView from 'react-native-maps';

//Faker to display fake stores
import faker from '../faker/ShopData';

//Service to geolocate
import {getLocation} from '../service/CurrentLocationService';

export default class ShopMap extends React.Component{

  constructor(props){
    super(props)
    this.state ={
      fakShopList:faker,
      region:{
        latitude:42.35,
        longitude:1.431,
        latitudeDelta: 0.03,
        longitudeDelta: 0.03
      },
      userPosition:{
        latitude:null,
        longitude:null,
        latitudeDelta: 0.03,
        longitudeDelta: 0.03
      }
    }
  }

  render(){
    return(
      <View style={styles.container}>
        <MapView
            style={styles.mapView}
            region={this.state.region}
            initialRegion={this.state.region}>
        </MapView>
      </View>
    );
  }
}

const styles =  StyleSheet.create({
  container:{
    flex:1
  },
  mapView: {
    flex: 1
  },
})
