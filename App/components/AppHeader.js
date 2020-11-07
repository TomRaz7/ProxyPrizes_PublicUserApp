import React from 'react';
import {StyleSheet,View,Text,Image,TouchableOpacity,Alert, Modal, TouchableHighlight} from 'react-native';
import {Icon} from 'react-native-elements';

export default class AppHeader extends React.Component{

  constructor(props){
    super(props);
    this.state={
      isModalVisible:false
    }
  }

  setModalVisible = (visible) => {
    this.setState({ isModalVisible: visible });
  }

  render(){
    const { modalVisible } = this.state;
    return(
      <View style={styles.headerContainer}>
        <Image resizeMode="contain"
          style={styles.logo}
          source={require('../assets/logo.png')}
        />
        <View style={styles.titleContainer}>
          <Text style={styles.title}>ProxyPrizes</Text>
        </View>
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={() => this.setModalVisible(true)}>
            <Icon name='world-o' type='fontisto' color="#4A86E8" size={30}/>
          </TouchableOpacity>
        </View>
        <View style={styles.centeredView}>
          <Modal
              animationType="slide"
              transparent={true}
              visible={this.state.isModalVisible}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
              }}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={styles.modalText}>Hello World!</Text>

                  <TouchableHighlight
                    style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                    onPress={() => {
                      this.setModalVisible(false);
                    }}
                  >
                    <Text style={styles.textStyle}>Hide Modal</Text>
                  </TouchableHighlight>
                </View>
              </View>
            </Modal>
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
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
})
