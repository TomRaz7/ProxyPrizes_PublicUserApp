import React from 'react';
import {View,Text,Modal,TouchableHighlight,StyleSheet, TextInput,Image} from 'react-native';
import {Icon} from 'react-native-elements';

export default class PaymentModal extends React.Component{

constructor(props){
  super(props);
  this.state={
    paymentInformation:{
      number:null,
      expMonth:null,
      expYear:null,
      cvc:null,
      currency:'EUR'
    }
  }
}

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
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={{width:280, height:50, flexDirection:'row', alignItems:'center'}}>
                <Text style={styles.title}>{this.props.productName}</Text>
                <Text style={styles.title}>{this.props.productPrice}€</Text>
                <Image
                  resizeMode="contain"
                  style={styles.logo}
                  source={require("../assets/images/Stripe-Logo.png")}
                />
              </View>
              <View style={{height:220, width:280, }}>
                <View style={{margin:22}}>
                  <View style={{ flexDirection:'row'}}>
                    <Text>Card Number</Text>
                    <Icon name='credit-card' type='entypo' color="#000" size={20} style={{marginLeft:5}}/>
                  </View>
                  <TextInput
                    placeholder="Exp. Month"
                    onChangeText={(text) => this.setState({ paymentInformation: {...this.state.paymentInformation, number: '4242424242424242'}})}
                    secureTextEntry={false}
                    underlineColorAndroid="#4A86E8"
                    maxLength={16}
                  />
                </View>
                <View>
                  <View style={{flexDirection:'row', margin:5, justifyContent:'space-around'}}>
                    <Text>Exp. Month</Text>
                    <Text>Exp. Year</Text>
                    <Text>CVC</Text>
                  </View>
                  <View style={{flexDirection:'row',margin:15, justifyContent:'space-around'}}>
                    <TextInput
                      placeholder="Exp. Month"
                      onChangeText={(text) => this.setState({ paymentInformation: {...this.state.paymentInformation, expMonth: 11} })}
                      secureTextEntry={false}
                      underlineColorAndroid="#4A86E8"
                    />
                    <TextInput
                      placeholder="Exp. Year"
                      onChangeText={(text) => this.setState({ paymentInformation: {...this.state.paymentInformation, expYear: 23} })}
                      secureTextEntry={false}
                      underlineColorAndroid="#4A86E8"
                    />
                    <TextInput
                      placeholder="CVC"
                      onChangeText={(text) => this.setState({ paymentInformation: {...this.state.paymentInformation, cvc: '223'} })}
                      secureTextEntry={true}
                      underlineColorAndroid="#4A86E8"
                      maxLength={3}
                    />
                  </View>
                  <TouchableHighlight
                    style={{ ...styles.openButton, backgroundColor: "#2196F3"}}
                    onPress={() => {
                      this.updateParentState({modalVisible:false, paymentInformation:this.state.paymentInformation});
                    }}
                  >
                    <Text style={styles.textStyle}>Confirm Payment</Text>
                  </TouchableHighlight>
                </View>
              </View>


            </View>
          </View>
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
  },
  title:{
    textAlign: "center",
    fontSize:20,
    margin:5,
    fontWeight:'bold'
  },
  logo: {
    width: 80,
    height: 80,
  },
});
