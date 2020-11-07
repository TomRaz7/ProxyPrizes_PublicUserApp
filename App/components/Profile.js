import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image, FlatList,ScrollView} from 'react-native';
import ConfigStore from '../storeRedux/ConfigStore';
import MesData from '../faker/ProfileData.js';
import SubscribeProfileTemplate from './SubscribeProfileTemplate';
import {connect} from 'react-redux';
import {LinearGradient} from 'expo-linear-gradient';
import { NavigationEvents } from 'react-navigation';
import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import Translation from '../language/Translation';


const fr = Translation.fr;
const en = Translation.en;
const es = Translation.es;

i18n.translations = {fr, en, es};
i18n.locale = "fr" //We would latter store the user preferencces through redux  : ConfigStore.getState().toggleLanguage.language

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
          <View style={{backgroundColor:'#4A86E8', width:'100%', height:'15%'}}>
            <View style={{marginTop:5,  alignItems:'center', justifyContent:'space-around'}}>
              <Text style={{fontSize:25,fontWeight:'bold',color:'#fff'}}> ProxyPrize </Text>
              <LinearGradient style={styles.linearGradient} colors={['#eb3349','#f45c43']} start={[0, 1]} end={[1, 0]}>
                <TouchableOpacity style={{justifyContent:'center'}} onPress = {() => this._logOut()}>
                  <Text style={{fontSize:15,fontWeight:'bold',color:'#fff'}}>{i18n.t('logout')}</Text>
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



          <View style={{marginTop:10,alignItems:'center'}}>
                <Text style={{fontWeight:'bold',fontSize:18}}>{i18n.t('profile')}</Text>
          </View>
          <View style={{borderBottomColor: '#4169e1', borderBottomWidth: 1, marginTop:7}}/>
            <View style={{marginTop:20}}>
              <Text style={{fontSize:20,fontWeight:'bold'}}>{i18n.t('shop_subscription')}</Text>
            </View>
            <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled={true}
            style={{marginTop:15, height:110}}
            data={this.state.subscribedShopsList}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({item}) => <View style={styles.flatlist}><SubscribeProfileTemplate prop={item}/></View>}
            />
            <View>
              <Text style={{fontSize:20,fontWeight:'bold',marginTop:20}}>{i18n.t('favorite_post')}</Text>
            </View>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              pagingEnabled={true}
              style={{marginTop:15, height:105}}
              data={MesData}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({item}) => <View style={styles.flatlist}><SubscribeProfileTemplate prop={item}/></View>}
              />
              <View>
                <Text style={{fontSize:20,fontWeight:'bold',marginTop:20}}>{i18n.t('discount')}</Text>
              </View>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled={true}
                style={{marginTop:15, height:105}}
                data={MesData}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => <View style={styles.flatlist}><SubscribeProfileTemplate prop={item}/></View>}
                />
        </ScrollView>
      );
    }
    else{
      return(
        <ScrollView style={styles.container}>
          <View style={{backgroundColor:'#4169e1', width:'100%', height:'15%'}}>
            <View style={{marginTop:5,  alignItems:'center', justifyContent:'space-around'}}>
              <Text style={{fontSize:30,fontWeight:'bold',color:'#fff'}}> ProxyPrize </Text>
              <LinearGradient style={styles.linearGradient} colors={['#eb3349','#f45c43']} start={[0, 1]} end={[1, 0]}>
                <TouchableOpacity onPress = {() => this._logOut()}>
                  <Text style={{fontSize:20,fontWeight:'bold',color:'#fff'}}>{i18n.t('logout')}</Text>
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

         <View style={{borderBottomColor: '#4169e1', borderBottomWidth: 1, marginTop:7}}/>
          <View style={{marginTop:10,alignItems:'center'}}>
                <Text style={{fontWeight:'bold',fontSize:18}}>{i18n.t('profile')}</Text>
          </View>
          <View style={{borderBottomColor: '#4169e1', borderBottomWidth: 1, marginTop:7}}/>
            <View>
              <Text style={{fontSize:20,fontWeight:'bold'}}>{i18n.t('shop_subscription')}</Text>
            </View>
            <Text>{i18n.t('noShopSubscribed')}</Text>
            <View>
              <Text style={{fontSize:20,fontWeight:'bold',marginTop:20}}>{i18n.t('favorite_post')}</Text>
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
            <View>
              <Text style={{fontSize:20,fontWeight:'bold',marginTop:20}}>{i18n.t('discount')}</Text>
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
    margin:5,
    padding: 5,
    alignItems: 'center',
    borderRadius: 24,
    overflow: 'hidden',
    width:120,
    height:40,
    justifyContent:'center'
  },
  flatlist:{
    marginRight:5
  }
});


const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps)(Profile);
