import React from "react";
import { Icon } from "react-native-elements";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  SafeAreaView,
} from "react-native";

import EndpointConfig from "../server/EndpointConfig";
import * as ImagePicker from "expo-image-picker";
import { TextInput } from "react-native-gesture-handler";

import i18n from "i18n-js";
import Translation from "../language/Translation";

const fr = Translation.fr;
const en = Translation.en;
const es = Translation.es;

i18n.translations = { fr, en, es };
i18n.locale = "fr"; //We would latter store the user preferencces through redux  : ConfigStore.getState().toggleLanguage.language within a config file

let openImagePickerAsync = async () => {
  let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

  if (permissionResult.granted === false) {
    alert("Permission to access camera roll is required!");
    return;
  }

  let pickerResult = await ImagePicker.launchImageLibraryAsync();
  console.log(pickerResult);
};

let todayDate = new Date().toISOString().slice(0, 19).replace("T", " ");

export default class CreatePost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      picture: "https://picsum.photos/800/500",
      price: 114,
      publishedAt: todayDate,
      shop: 1,
      owner: null,
      customer: 1,
    };
  }

  // function to post in database
  _addPost(array) {
    fetch(EndpointConfig.addPost, {
      method: "POST",
      body: JSON.stringify(array),
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("Results: ");
        console.log(responseJson);
        this.props.navigation.navigate("PostScrollList");
      });
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.viewtext}>
          <View style={styles.title}>
            <Text>{i18n.t("postForm.create_post")}</Text>
          </View>
          <Text>{i18n.t("postForm.product_title")}</Text>
          <TextInput
            placeholder={i18n.t("postForm.product_title_input")}
            style={styles.description}
            onChangeText={(text) => this.setState({ title: text })}
          />
          <TouchableOpacity style={styles.uploadButton}>
            <Button
              title={i18n.t("postForm.upload_button")}
              color="#4A86E8"
              onPress={openImagePickerAsync}
            />
          </TouchableOpacity>
          <Text>{i18n.t("postForm.product_description")}</Text>
          <TextInput
            placeholder={i18n.t("postForm.product_description_input")}
            multiline={true}
            textAlignVertical={"top"}
            maxLength={800}
            numberOfLines={15}
            minHeight={Platform.OS === "ios" ? 20 * 15 : null}
            style={styles.description}
            onChangeText={(text) => this.setState({ description: text })}
          />
          <View style={styles.button}>
            <Button
              title={i18n.t("postForm.confirm")}
              color="#4A86E8"
              onPress={() => this._addPost(this.state)}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  button: {
    marginTop: 10,
    marginBottom: 10,
  },
  title: {
    alignItems: "center",
    marginTop: "5%",
    marginBottom: "5%",
  },
  description: {
    textAlign: "left",
    marginTop: "2%",
    backgroundColor: "white",
    marginLeft: "2%",
    marginRight: "2%",
    marginBottom: "2%",
  },
  viewtext: {
    width: "80%",
    marginLeft: 10,
    justifyContent: "center",
    marginRight: 10,
    marginBottom: "5%",
  },
  uploadButton: {
    marginTop: 20,
    marginBottom: 20,
    padding: 15,
    borderRadius: 2,
  },
});
