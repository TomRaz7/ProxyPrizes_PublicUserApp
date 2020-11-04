import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import {Icon, Card} from 'react-native-elements';
import {LinearGradient} from 'expo-linear-gradient'
import faker from '../faker/PostData';

export default class SingleShop extends React.Component{

  constructor(props){
    super(props);
    this.state={
      shop:this.props.navigation.getParam("shop"),
      relatedPosts:[],
      test:['1','2','3']
    }
    this._initPostList(faker);
    console.log(this.state.shop.id);
    this._logArrayLenght(this.state.relatedPosts);
  }

  _initPostList(fakerList){
    for(let i = 0; i < fakerList.length; i++){
      if(fakerList[i].relatedShopId === this.state.shop.id){
        this.state.relatedPosts.push(fakerList[i]);
      }
    }
  }

  _logArrayLenght(array){
      console.log(array.length);
  }

  render(){
    return(
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <LinearGradient style={styles.circularLinearGradient} colors={['#4A86E8','#4A86E8']} start={[0, 1]} end={[1, 0]}>
            <Icon
            name='shop'
            type='entypo'
            size={25} color="#fff"/>
          </LinearGradient>
          <Text style={styles.title}>{this.state.shop.name}</Text>
          <LinearGradient style={styles.linearGradient} colors={['#eb3349','#f45c43']} start={[0, 1]} end={[1, 0]}>
            <TouchableOpacity style={styles.touchableOpacity}>
              <Text style={styles.linearGradientText}>Subscribe</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
        <View style={styles.flatListContainer}>
          <FlatList
            data={this.state.relatedPosts}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({item}) => {for(let i = 0; i < this.state.relatedPosts.length; i++){
              return(
                <Text>{item.title}</Text>
              );
            }}}
          />
        </View>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: '#fff',
  },
  headerContainer:{
    flex:1,
    flexDirection:'row',
    margin:10,
    justifyContent:'space-around',
    alignItems:'center',
  },
  flatListContainer:{
    flex:8,
    backgroundColor:'grey',
    justifyContent:'center',
    alignItems:'center',
    margin:10
  },
  title:{
    fontSize:25,
  },
  linearGradient:{
    padding: 10,
    alignItems: 'center',
    borderRadius: 24,
    overflow: 'hidden',
    width:100,
    height:40
  },
  linearGradientText:{
    fontWeight:'bold',
    color:'#fff'
  },
  touchableOpacity:{
    alignItems: 'center',
    borderRadius: 20,
    overflow: 'hidden',
    width:100,
    height:40
  },
  circularLinearGradient:{
    width:40,
    height:40,
    borderRadius:30,
    justifyContent:'center', alignItems:'center'
  }
});
