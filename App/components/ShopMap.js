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
        latitude:0,
        longitude:0,
        latitudeDelta: 0.03,
        longitudeDelta: 0.03
      }
    }
  }

  componentDidMount(){
    getLocation().then(data =>{
      this.updateRegion({
        latitude:data.latitude,
        longitude:data.longitude
      });
      this.updateUserPosition({
        latitude:data.latitude,
        longitude:data.longitude
      });
    })
    navigator.geolocation.watchPosition(
      position => {
        this.updateUserPosition({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0, distanceFilter: 1}
    )
  }

  updateUserPosition(location){
    if(location.latitude != undefined && location.longitude != undefined){
      this.setState({
        userPosition:{
          latitude:location.latitude,
          longitude:location.longitude
        }
      })
    }
  }

  updateRegion(location){
    if(location.latitude != undefined && location.longitude != undefined){
      this.setState({
        region:{
          latitude:location.latitude,
          longitude:location.longitude,
          latitudeDelta: 0.3,
          longitudeDelta: 0.3,
        }
      });
    }
  }

  renderUserPosition(){
    return(
      <MapView.Marker
      coordinate={this.state.userPosition}>
      </MapView.Marker>
    )
  }

  render(){
    return(
      <View style={styles.container}>
        <MapView
            style={styles.mapView}
            region={this.state.region}
            initialRegion={this.state.region}>
            {this.renderUserPosition()}
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
