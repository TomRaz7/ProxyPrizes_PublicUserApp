import React from 'react';
import {View, StyleSheet, Text,TouchableOpacity,Image, FlatList} from 'react-native';
import ConfigStore from '../storeRedux/ConfigStore';
import {connect} from 'react-redux';

class Profile extends React.Component{

  _logOut(){
    const action = {type:'TOGGLE_DECONNECT', value:null};
    this.props.dispatch(action);
    this.props.navigation.navigate("Router");
  }

  render(){
    return(
      <View style={styles.container}>
        <Text>Bienvenu sur le profil</Text>
        <TouchableOpacity onPress = {() => this._logOut()}>
          //<Text>Log out</Text> + je garde tout ton code je ne touche a rin du tout+
        </TouchableOpacity>

        //code Yves Marcel
        <View
            style={{
              backgroundColor:'#4169e1',
              whidth:'100%',
              height:'25%'
            }}>

            <View
                  style={{marginTop:5, marginLeft:'20%'}}>
                  <Text
                    style={{fontSize:30,fontWeight:'bold'}}> ProxyPrize </Text>
                  <Text
                    style={{fontSize:20,fontWeight:'bold'}}> The Shop of the Future </Text>
              </View>

              <View
                  style={{marginLeft:10}}>
                <Image
                  style={{width:125, height:125,borderRadius:400/2}}
                  //source = {require('/Users/mfoulouyvesmarcel/Desktop/Testons/AwesomeProject/src/images/Asong.jpg')}/>
                    source={require('/Users/mfoulouyvesmarcel/Desktop/Official ProxyPrize/ProxyPrizes_PublicUserApp/App/assets/Asong.jpg')}/>
              </View>
            </View>
            //bouton de Listing
            <View
           style={{
             alignItems:'center',
             marginHorizontal:70,
             paddingVertical:10,
             marginTop:20,
             backgroundColor:'#4169e1',
             borderRadius:10,
             marginLeft:'40%'
           }}>
              <Text
              onPress={()=>navigate('Post')}
              style={{color:'white'}}>List Your Product</Text>
           </View>

         //le trait horizontal
           <View
            style={{
              borderBottomColor: '#4169e1',
              borderBottomWidth: 1,
              marginTop:7
            }}  />

            //mes Text
            <View
              style={{
                  marginTop:10,
                  alignItems:'center'}}>
                <Text
                  style={{fontWeight:'bold',fontSize:18}}>Your Profile ProxyPrize</Text>
                <Text
                  style={{fontSize:16}}>You can have your list Subscription</Text>
                <Text
                  style={{fontSize:14}}>You can have all your list five best likes you make</Text>
          </View>

          //second trait Horizonatl
          <View
           style={{
             borderBottomColor: '#4169e1',
             borderBottomWidth: 1,
             marginTop:7
           }}  />

           //indicateur de Subscription
           <View>
              <Text
              style={{fontSize:20,fontWeight:'bold',marginLeft:10}}>My Subscription</Text>
          </View>

          //scroll de suscription horizontal
          <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled={true}
          style={{marginTop:15, height:90}}
          data={MesData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item}) => <ScrollTemplate prop={item}/>}
          />

          // Indicateur des favorits
          <View>
              <Text
              style={{fontSize:20,fontWeight:'bold',marginLeft:20,marginTop:20}}>My Favodrites</Text>
          </View>

          // scroll des favorits

          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled={true}
            data={MesData}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({item}) => <ScrollTemplate prop={item}/>}
            />
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps)(Profile);
