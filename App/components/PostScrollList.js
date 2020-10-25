import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

export default class PostScrollList extends React.Component{
  render(){
    return(
      <View style={styles.container}>
        <Text>Bienvenu sur la liste de posts</Text>
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
