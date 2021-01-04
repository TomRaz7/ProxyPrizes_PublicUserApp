import React from 'react';
import {View,Text,Modal,TouchableHighlight,StyleSheet} from 'react-native';

export default class TutorialModalTemplate extends React.Component{
  constructor(props){
    super(props);
    this.state={
      screenName:this.props.screen,
      description:this.props.description,
      modalVisible:this.props.visible, //we get the visible value from the parent which get it from the redux store.
    }
  }

  setModalVisible = (visible) => {
   this.setState({ modalVisible: visible });
 }

 componentDidMount(){
   console.log('Tutorial Template');
   console.log(this.state.modalVisible);
 }

   // generateActionType(name){//a function to generate dynamically the type of the action to dispatch to the display app tutorial reducer based on the screenName
   //   switch (name) {
   //     case expression:
   //
   //       break;
   //     default:
   //
   //   }
   // }

  render(){
    return(
      <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{this.state.description}</Text>

            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
              onPress={() => {
                this.setModalVisible(!this.state.modalVisible);
              }}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>

      <TouchableHighlight
        style={styles.openButton}
        onPress={() => {
          this.setModalVisible(false);
        }}
      >
        <Text style={styles.textStyle}>Show Modal</Text>
      </TouchableHighlight>
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
});
