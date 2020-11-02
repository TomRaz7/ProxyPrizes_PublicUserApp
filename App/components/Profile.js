import React from 'react';
import {View, StyleSheet, Text,TouchableOpacity} from 'react-native';
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
          <Text>Log out</Text>
        </TouchableOpacity>
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
