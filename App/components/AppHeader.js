import React from 'react';
import {StyleSheet,View,Text,Image,TouchableOpacity,Alert} from 'react-native';
import {Icon} from 'react-native-elements';

export default class AppHeader extends React.Component{

  render(){
    return(
      <View style={styles.headerContainer}>
        <Image resizeMode="contain"
          style={{width:40, height: 40}}
          source={require('../assets/logo.png')}
        />
        <View style={styles.titleContainer}>
          <Text style={styles.title}>ProxyPrizes</Text>
        </View>
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={() =>Alert.alert(
            'Language selection',
            'My Alert Msg',
            [
              {
                text: 'Ask me later',
                onPress: () => console.log('Ask me later pressed')
              },
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel'
              },
              { text: 'OK', onPress: () => console.log('OK Pressed') }
            ],
            { cancelable: false }
          )}>
            <Icon name='world-o' type='fontisto' color="#4A86E8" size={30}/>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerContainer:{
    flex:1, flexDirection:'row', alignItems:'center',margin:5
  },
  logo:{
    width:40, height: 40
  },
  titleContainer:{
    marginLeft:10
  },
  title:{
    textAlign:'center', fontWeight: 'bold', fontSize:20
  },
  iconContainer:{
    marginLeft:125,justifyContent:'flex-end'
  }
})
