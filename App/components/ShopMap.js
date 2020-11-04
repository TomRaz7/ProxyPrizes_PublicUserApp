import React from 'react';
import {View, StyleSheet,Text} from 'react-native';
import MapView from 'react-native-maps';
import {Icon} from 'react-native-elements'
import { LinearGradient } from 'expo-linear-gradient';

//Faker to display fake stores
import faker from '../faker/ShopData';

//Service to geolocate
import {getLocation} from '../service/CurrentLocationService';

//Own components import
import ShopCallout from './ShopCallout';

export default class ShopMap extends React.Component{

  constructor(props){
    super(props)
    this.state ={
      fakeShopList:faker,
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

  _displayShop(shop){
    this.props.navigation.navigate("SingleShop",{shop:shop});
  }

  renderShops(shopList){
    const markers = []
    for(let i = 0; i < shopList.length; i++){
      let location={latitude: parseFloat(shopList[i].coords.latitude), longitude:parseFloat(shopList[i].coords.longitude)};
      markers.push(
        <MapView.Marker
          key={i}
          coordinate={location}
          onCalloutPress={() => this._displayShop(shopList[i])}>
          <View>
            <LinearGradient style={styles.circularLinearGradient} colors={['#4A86E8','#4A86E8']} start={[0, 1]} end={[1, 0]}>
              <Icon
              name='shop'
              type='entypo'
              size={20} color="#fff"/>
            </LinearGradient>
          </View>
          <MapView.Callout>
            <ShopCallout name={shopList[i].name} phone={shopList[i].phone} address={shopList[i].address} opening_hours={shopList[i].opening_hours}/>
          </MapView.Callout>
        </MapView.Marker>
      );
    }
    return(markers);
  }

  render(){
    return(
      <View style={styles.container}>
        <MapView
            style={styles.mapView}
            region={this.state.region}
            initialRegion={this.state.region}>
            {this.renderUserPosition()}
            {this.renderShops(this.state.fakeShopList)}
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
  circularLinearGradient:{
    width:30,
    height:30,
    borderRadius:30,
    justifyContent:'center', alignItems:'center'
  }
})
