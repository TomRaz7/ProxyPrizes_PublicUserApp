import React from 'react';
import {View,Text,Modal,TouchableHighlight,StyleSheet,Dimensions} from 'react-native';
import { WebView } from 'react-native-webview';

const windowWidth = Dimensions.get('window').width;

export default class PaymentSucceededModal extends React.Component{

 updateParentState(data){
   this.props.updateParentState(data);
 }

  render(){
    return(
      <View style={styles.centeredView}>

        <Modal
          animationType="slide"
          transparent={true}
          visible={this.props.visible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
        <WebView source={{ uri: this.props.receiptUrl }} />


              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                onPress={() => {
                  this.updateParentState(false);
                }}
              >
                <Text style={styles.textStyle}>Finish</Text>
              </TouchableHighlight>

        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
    elevation: 2,
    position:'absolute',
    left:windowWidth/3,
    bottom:10,
    width:100
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
});
