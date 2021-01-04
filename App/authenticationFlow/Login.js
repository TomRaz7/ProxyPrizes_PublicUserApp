import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import ConfigStore from "../storeRedux/ConfigStore";
import { connect } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import * as Localization from "expo-localization";

//Endpoint Config
import EndpointConfig from "../server/EndpointConfig";

import i18n from "i18n-js";
import Translation from "../language/Translation";

const fr = Translation.fr;
const en = Translation.en;
const es = Translation.es;
const ca = Translation.ca;
const pt = Translation.pt;

i18n.translations = { fr, en, es, ca, pt };
i18n.locale = `${ConfigStore.getState().toggleLanguageSelection.language}`;

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: null, //token is set to null for the first connection, then it will be stored within the redux persistor
      userMail: "",
      userPassword: "",
      passwordForgotten: false,
      createAccount: 0,
    };
  }

  updateParentState(data) {
    this.props.updateParentState(data);
  }

  isMailFormat(data) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data)) {
      console.log("mail format valide");
      return true;
    } else {
      console.log("mail format invalide");
      return false;
    }
  }

  isEmpty(string) {
    if (string === "" || sting === null) {
      console.log("chaine vide");
      return true;
    } else {
      console.log("chaine non vide");
      return false;
    }
  }

  _connect(mail, password) {
    if (
      1 === 1 ||
      (this.isMailFormat(mail) === true && this.isEmpty(password) === false)
    ) {
      fetch(EndpointConfig.fetchLogin, {
        method: "POST",
        body: JSON.stringify({
          table: "customer",
          email: this.state.userMail,
          password: this.state.userPassword,
        }),
        headers: {
          Accept: "application/json",
          "content-type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson.code === 200 && responseJson.token !== undefined) {
            this.updateParentState(responseJson.token);
            let userCredentials = {
              id: responseJson.user.id,
              mail: this.state.userMail,
              password: this.state.userPassword,
              token: responseJson.token,
            };
            const action = { type: "TOGGLE_CONNECT", value: userCredentials };
            this.props.dispatch(action);
          } else if (responseJson.code === 404) {
            Alert.alert(
              `${i18n.t("login_error_title")}`,
              `${i18n.t("login_error_description")}`,
              [
                {
                  text: "Cancel",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel",
                },
                { text: "OK", onPress: () => console.log("OK Pressed") },
              ],
              { cancelable: false }
            );
          }
        });
    }
  }

  _createAccount() {
    this.state.createAccount = 1;
    this.updateParentState(this.state.createAccount);
  }

  _passwordForgotten() {
    this.state.passwordForgotten = true;
    this.updateParentState(this.state.passwordForgotten);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            resizeMode="contain"
            style={styles.logo}
            source={require("../assets/images/logo_proxyprizes.jpeg")}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder={i18n.t("log_mail")}
            onChangeText={(text) => this.setState({ userMail: text })}
            keyBoardType="email-address"
            underlineColorAndroid="#4A86E8"
          />
          <TextInput
            style={styles.textInput}
            placeholder={i18n.t("log_passwd")}
            onChangeText={(text) => this.setState({ userPassword: text })}
            secureTextEntry={true}
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
            onPress={() =>
              this._connect(this.state.userMail, this.state.userPassword)
            }
          >
            <Text style={styles.connect}>{i18n.t("login")}</Text>
          </TouchableOpacity>
        </LinearGradient>
        <View style={styles.optionsContainer}>
          <TouchableOpacity onPress={() => this._passwordForgotten()}>
            <Text style={styles.option}>{i18n.t("password_forgotten")}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this._createAccount()}>
            <Text style={styles.option}>{i18n.t("register")}</Text>
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
    width: 220,
    height: 220,
  },
  connect: {
    textAlign: "center",
    color: "#fff",
    fontSize: 15,
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
  },
  optionsContainer: {
    height: 45,
    justifyContent: "space-around",
    alignItems: "center",
    margin: 20,
  },
  option: {
    fontWeight: "bold",
    color: "lightgrey",
  },
});

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(Login);
