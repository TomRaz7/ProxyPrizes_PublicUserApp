import React from 'react';
import {StyleSheet,View} from 'react-native';
import {Icon} from 'react-native-elements';

//import navigation lib
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator,createMaterialTopTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';

//import our own components
import PostScrollList from '../components/PostScrollList';
import Profile from '../components/Profile';
import ShopMap from '../components/ShopMap';


//Settle Stack Navigator
const postStackNavigator = createStackNavigator({
  PostScrollList:{
    screen:PostScrollList,
  }
});

const profileStackNavigator = createStackNavigator({
  Profile:{
    screen:Profile
  }
});

const shopMapStackNavigator = createStackNavigator({
  ShopMap:{
    screen:ShopMap
  }
});

//Settle Tab Navigator
const appNavigator = createMaterialTopTabNavigator({
  ShopMap:{
    screen:shopMapStackNavigator,
    navigationOptions:{
      tabBarIcon:() =>{
        return(
          <View style={{justifyContent:'center', alignItems:'center'}}>
            <Icon name='location' type='entypo' color="#fff" size={20}/>
          </View>
        )
      }
    }
  },
  ScrollList:{
    screen:postStackNavigator,
    navigationOptions:{
      tabBarIcon:()=>{
        return(
          <View style={{justifyContent:'center', alignItems:'center'}}>
            <Icon name='home' type='entypo' color="#fff" size={20}/>
          </View>
        )
      }
    }
  },
  Profile:{
    screen:profileStackNavigator,
    navigationOptions:{
      tabBarIcon:()=>{
        return(
          <View style={{justifyContent:'center', alignItems:'center'}}>
            <Icon name='user' type='entypo' color='#fff' size={20}/>
          </View>
        )
      }
    }
  }
},
{
  initialRouteName:'ScrollList',
  tabBarPosition:'bottom',
  swipeEnabled:true,
  tabBarOptions:{
    activeBackgroundColor: '#DDDDDD',
    inactiveBackgroundColor: '#FFFFFF',
    showLabel: false,
    showIcon: true,
    style:{
      backgroundColor: '#4A86E8',
      borderBottomColor: '#4A86E8',
      height:55
    },
    indicatorStyle:{
      top:0,
      height:3,
      backgroundColor:'#FFFFFF'
    },
    pressColor:'#FFFFFF'
  }
});


//Settle app container

export default createAppContainer(appNavigator);
