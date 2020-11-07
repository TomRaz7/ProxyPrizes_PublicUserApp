import React from 'react';
import {StyleSheet,View,Text,Image,TouchableOpacity,Alert} from 'react-native';
import {Icon} from 'react-native-elements';

//import navigation lib
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator,createMaterialTopTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';

//import our own components
import PostScrollList from '../components/PostScrollList';
import Profile from '../components/Profile';
import ShopMap from '../components/ShopMap';
import SingleShop from '../components/SingleShop';
import CreatePost from '../components/CreatePost';
import AppHeader from '../components/AppHeader';


//Settle Stack Navigator
const postStackNavigator = createStackNavigator({
  PostScrollList:{
    screen:PostScrollList,
    navigationOptions:{
      headerTitle:<AppHeader/>
    }
  },
  CreatePost:{
    screen:CreatePost,
    navigationOptions:{
      headerTitle:<AppHeader/>
    }
  }
});

const profileStackNavigator = createStackNavigator({
  Profile:{
    screen:Profile,
    navigationOptions:{
      headerTitle:<AppHeader/>
    }
  }
});

const shopMapStackNavigator = createStackNavigator({
  ShopMap:{
    screen:ShopMap,
    navigationOptions:{
      headerTitle:<AppHeader/>
    }
  },
  SingleShop:{
    screen:SingleShop,
    navigationOptions:{
      headerTitle:<AppHeader/>
    }
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
