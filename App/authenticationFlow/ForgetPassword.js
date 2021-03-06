import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Alert ,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import i18n from "i18n-js";
import Translation from "../language/Translation";
import ConfigStore from "../storeRedux/ConfigStore";

import EndpointConfig from "../server/EndpointConfig";

const fr = Translation.fr;
const en = Translation.en;
const es = Translation.es;
const ca = Translation.ca;
const pt = Translation.pt;

i18n.translations = { fr, en, es, ca, pt };
i18n.locale = `${ConfigStore.getState().toggleLanguageSelection.language}`;

export default class ForgetPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userMail: null,
      passwordForgotten: true,
    };
  }

  updateParentState(data) {
    this.props.updateParentState(data);
  }

  isMailFormat(data) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data)) {
      return true;
    }
    return false;
  }

  _cancel() {
    this.state.passwordForgotten = false;
    this.updateParentState(this.state.passwordForgotten);
  }

_retrievePasswd(data){
  if(data !== null){
    fetch(EndpointConfig.retrievePasswd,{
      method:'POST',
      body:JSON.stringify({
        mail:this.state.userMail
      }),
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
      },
    })
    .then((response) => response.json())
    .then((responseJson) => {
      Alert.alert(
      "Password updated",
      "A new password has been link to your account. Please check your email",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ],
      { cancelable: false }
    );
      this.state.passwordForgotten = false;
      this.updateParentState(this.state.passwordForgotten);
    })
  }
  else {
    return null;
  }
}

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            resizeMode="contain"
            style={styles.logo}
            source={require("../assets/logo.png")}
          />
        </View>
        <Text style={styles.title}>{i18n.t("retrieve_passwd")}</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder={i18n.t("log_mail")}
            onChangeText={(text) => this.setState({ userMail: text })}
            keyBoardType="email-address"
            underlineColorAndroid="#4A86E8"
          />
        </View>
        <LinearGradient
          style={styles.linearGradient}
          colors={["#4A86E8", "#4A86E8"]}
          start={[0, 1]}
          end={[1, 0]}
        >
          <TouchableOpacity
            style={styles.touchableOpacity}
            onPress={() => this._retrievePasswd(this.state.userMail)}
          >
            <Text style={styles.validate}>{i18n.t("retrieve_passwd")}</Text>
          </TouchableOpacity>
        </LinearGradient>
        <View style={styles.cancelBtnContainer}>
          <TouchableOpacity
            style={styles.touchableOpacity}
            onPress={() => this._cancel()}
          >
            <Text style={{ color: "red" }}>{i18n.t("cancel_btn")}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    margin: 10,
  },
  logo: {
    width: 150,
    height: 150,
  },
  inputContainer: {
    margin: 10,
    justifyContent: "space-around",
    height: 80,
    width: 200,
  },
  textInput: {
    height: 40,
    paddingLeft: 6,
  },
  touchableOpacity: {
    alignItems: "center",
    borderRadius: 20,
    overflow: "hidden",
    width: 200,
  },
  linearGradient: {
    padding: 15,
    alignItems: "center",
    borderRadius: 24,
    overflow: "hidden",
    width: 200,
    height: 50,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
  },
  validate: {
    textAlign: "center",
    color: "#fff",
    fontSize: 15,
  },
  cancelBtnContainer: {
    margin: 10,
  },
});
