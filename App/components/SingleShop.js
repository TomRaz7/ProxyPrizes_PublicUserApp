import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import {Icon, Card, Button} from 'react-native-elements';
import {LinearGradient} from 'expo-linear-gradient';
import faker from '../faker/PostData';

export default class SingleShop extends React.Component{

  constructor(props){
    super(props);
    this.state={
      shop:this.props.navigation.getParam("shop"),
      relatedPosts:[],
    }
    this._initPostList(faker);
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
          <LinearGradient style={styles.circularLinearGradient} colors={['#fff','#fff']} start={[0, 1]} end={[1, 0]}>
            <Icon
            name='shop'
            type='entypo'
            size={25} color="#4A86E8"/>
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
                <View style={styles.post}>
                  <Card>
                    <Card.Title>{item.title}</Card.Title>
                    <Card.Divider/>
                    <Card.Image source={{ uri: "http://via.placeholder.com/160x160" }}/>
                    <Text style={{marginBottom: 10}}>
                        {item.description}
                    </Text>
                  </Card>
                </View>
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
    backgroundColor: '#4A86E8',
  },
  headerContainer:{
    flex:1,
    flexDirection:'row',
    margin:10,
    justifyContent:'space-around',
    alignItems:'center',
    backgroundColor: '#4A86E8',
  },
  flatListContainer:{
    flex:8,
    justifyContent:'center',
    alignItems:'center',
    margin:2,
    backgroundColor:'#F3F3F3'
  },
  post:{
    margin:10
  },
  title:{
    fontSize:25,
    color:'#fff'
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
