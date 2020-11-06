import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image, FlatList,ScrollView} from 'react-native';
import ConfigStore from '../storeRedux/ConfigStore';
import MesData from '../faker/ProfileData.js';
import SubscribeProfileTemplate from './SubscribeProfileTemplate';
import {connect} from 'react-redux';
import {LinearGradient} from 'expo-linear-gradient';
import { NavigationEvents } from 'react-navigation';

class Profile extends React.Component{

  constructor(props){
    super(props);
    this.state={
      subscribedShopsList:ConfigStore.getState().toggleSubscription.subscribedShops
    }
  }

  componentDidMount(){
    //add focus listener
  this.didFocusListener = this.props.navigation.addListener('didFocus', this.didFocusAction);
  }

  componentWillUnmount(){
    // remove listener
    this.didFocusListener.remove();
  }

  didFocusAction = () => {
    this.setState({
      subscribedShopsList:ConfigStore.getState().toggleSubscription.subscribedShops
    });
    console.log(this.state.subscribedShopsList[0]);
  }

  _logOut(){
    const action = {type:'TOGGLE_DECONNECT', value:null};
    this.props.dispatch(action);
    this.props.navigation.navigate("Router");
  }


  _logArrayLenght(array){
      console.log(array.length);
  }

  render(){
    console.log(this.state.subscribedShopsList.length);
    if(this.state.subscribedShopsList.length !== 0){
      return(
        <ScrollView style={styles.container}>
          <View style={{backgroundColor:'#4169e1', width:'100%', height:'25%'}}>
            <View style={{marginTop:5,  alignItems:'center', justifyContent:'space-around'}}>
              <Text style={{fontSize:30,fontWeight:'bold',color:'#fff'}}> ProxyPrize </Text>
              <Text style={{fontSize:20,fontWeight:'bold',color:'#fff'}}> The Shop of the Future </Text>
              <LinearGradient style={styles.linearGradient} colors={['#eb3349','#f45c43']} start={[0, 1]} end={[1, 0]}>
                <TouchableOpacity onPress = {() => this._logOut()}>
                  <Text style={{fontSize:20,fontWeight:'bold',color:'#fff'}}>Log out</Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
            <View style={{marginLeft:10}}>
              <Image
                style={{width:125, height:125,borderRadius:400/2}}
                //source = {require('/Users/mfoulouyvesmarcel/Desktop/Testons/AwesomeProject/src/images/Asong.jpg')}
                />
            </View>
          </View>
         <View style={{alignItems:'center', marginHorizontal:70, paddingVertical:10, marginTop:20, backgroundColor:'#4169e1', borderRadius:10, alignItems:'center'}}>
            <Text onPress={()=>navigate('Post')} style={{color:'white'}}>List Your Product</Text>
         </View>

         <View style={{borderBottomColor: '#4169e1', borderBottomWidth: 1, marginTop:7}}/>
          <View style={{marginTop:10,alignItems:'center'}}>
                <Text style={{fontWeight:'bold',fontSize:18}}>Your Profile ProxyPrize</Text>
                <Text style={{fontSize:16}}>You can have your list Subscription</Text>
                <Text style={{fontSize:14}}>You can have all your list five best likes you make</Text>
          </View>
          <View style={{borderBottomColor: '#4169e1', borderBottomWidth: 1, marginTop:7}}/>
            <View>
              <Text style={{fontSize:20,fontWeight:'bold'}}>Shop Subscriptions</Text>
            </View>
            <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled={true}
            style={{marginTop:15, height:110}}
            data={this.state.subscribedShopsList}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({item}) => <SubscribeProfileTemplate prop={item}/>}
            />
            <View>
              <Text style={{fontSize:20,fontWeight:'bold',marginTop:20}}>Favorites Posts</Text>
            </View>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              pagingEnabled={true}
              style={{marginTop:15, height:105}}
              data={MesData}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({item}) => <SubscribeProfileTemplate prop={item}/>}
              />
        </ScrollView>
      );
    }
    else{
      return(
        <ScrollView style={styles.container}>
          <View style={{backgroundColor:'#4169e1', width:'100%', height:'25%'}}>
            <View style={{marginTop:5,  alignItems:'center', justifyContent:'space-around'}}>
              <Text style={{fontSize:30,fontWeight:'bold',color:'#fff'}}> ProxyPrize </Text>
              <Text style={{fontSize:20,fontWeight:'bold',color:'#fff'}}> The Shop of the Future </Text>
              <LinearGradient style={styles.linearGradient} colors={['#eb3349','#f45c43']} start={[0, 1]} end={[1, 0]}>
                <TouchableOpacity onPress = {() => this._logOut()}>
                  <Text style={{fontSize:20,fontWeight:'bold',color:'#fff'}}>Log out</Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
            <View style={{marginLeft:10}}>
              <Image
                style={{width:125, height:125,borderRadius:400/2}}
                //source = {require('/Users/mfoulouyvesmarcel/Desktop/Testons/AwesomeProject/src/images/Asong.jpg')}
                />
            </View>
          </View>
         <View style={{alignItems:'center', marginHorizontal:70, paddingVertical:10, marginTop:20, backgroundColor:'#4169e1', borderRadius:10, alignItems:'center'}}>
            <Text onPress={()=>navigate('Post')} style={{color:'white'}}>List Your Product</Text>
         </View>

         <View style={{borderBottomColor: '#4169e1', borderBottomWidth: 1, marginTop:7}}/>
          <View style={{marginTop:10,alignItems:'center'}}>
                <Text style={{fontWeight:'bold',fontSize:18}}>Your Profile ProxyPrize</Text>
                <Text style={{fontSize:16}}>You can have your list Subscription</Text>
                <Text style={{fontSize:14}}>You can have all your list five best likes you make</Text>
          </View>
          <View style={{borderBottomColor: '#4169e1', borderBottomWidth: 1, marginTop:7}}/>
            <View>
              <Text style={{fontSize:20,fontWeight:'bold'}}>Shop Subscriptions</Text>
            </View>
            <Text>You have not subscribed to any shop yet</Text>
            <View>
              <Text style={{fontSize:20,fontWeight:'bold',marginTop:20}}>Favorites Posts</Text>
            </View>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              pagingEnabled={true}
              style={{marginTop:15, height:105}}
              data={MesData}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({item}) => <SubscribeProfileTemplate prop={item}/>}
              />
        </ScrollView>
      );
    }

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //alignItems: 'center',
    //justifyContent: 'center',
  },
  linearGradient:{
    padding: 5,
    alignItems: 'center',
    borderRadius: 24,
    overflow: 'hidden',
    width:100,
    height:40
  },
});


const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps)(Profile);
