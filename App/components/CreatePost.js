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

import ConfigStore from "../storeRedux/ConfigStore";
import EndpointConfig from "../server/EndpointConfig";
import * as ImagePicker from "expo-image-picker";
import DropDownPicker from "react-native-dropdown-picker";
import { TextInput } from "react-native-gesture-handler";
import { RNS3 } from "react-native-aws3";

import i18n from "i18n-js";
import Translation from "../language/Translation";

const fr = Translation.fr;
const en = Translation.en;
const es = Translation.es;
const ca = Translation.ca;

i18n.translations = { fr, en, es, ca };
i18n.locale = `${ConfigStore.getState().toggleLanguageSelection.language}`;

let openImagePickerAsync = async () => {
  let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

  if (permissionResult.granted === false) {
    alert("Permission to access camera roll is required!");
    return;
  }

  let pickerResult = await ImagePicker.launchImageLibraryAsync();

  if (pickerResult.cancelled == false) {
    console.log(pickerResult);
    return pickerResult;
  } else {
    return false;
  }
};

const categoryData = [
  {
    label: "Toy",
    value: "toy",
  },
  {
    label: "Jewelry",
    value: "jewelry",
  },
  {
    label: "Clothing",
    value: "clothing",
  },
  {
    label: "Kitchen",
    value: "kitchen",
  },
  {
    label: "Sport",
    value: "sport",
  },
  {
    label: "Food",
    value: "food",
  },
];

function getRandomString(length) {
  var randomChars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var result = "";
  for (var i = 0; i < length; i++) {
    result += randomChars.charAt(
      Math.floor(Math.random() * randomChars.length)
    );
  }
  return result;
}

let todayDate = new Date().toISOString().slice(0, 19).replace("T", " ");

export default class CreatePost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      picture: "",
      price: 114,
      categorytag: "undefined",
      publishedAt: todayDate,
      shop: 1,
      owner: null,
      customer: ConfigStore.getState().toggleAuthentication.userId,
      imageuri: "",
      imagename: "",
      imagetype: "",
      imagestate: false,
      dropItemShops: [],
      dataShopsRetrieved: false,
    };
  }

  // function to upload to the S3
  uploadImage() {
    fetch(EndpointConfig.getS3)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("Results uploading image:");
        console.log(responseJson);

        const file = {
          // `uri` can also be a file system path (i.e. file://)
          uri: this.state.imageuri,
          name: this.state.imagename + ".jpg",
          type: this.state.imagetype + "/jpg",
        };

        const options = {
          keyPrefix: "posts/",
          bucket: "proxyprizes",
          region: "eu-west-3",
          accessKey: responseJson.accessKey,
          secretKey: responseJson.secretKey,
          successActionStatus: 201,
        };

        RNS3.put(file, options).then((response) => {
          if (response.status !== 201)
            throw new Error("Failed to upload image to S3");
          console.log(response.body);
          console.log("File uploaded to the S3.");

          this.setState({ picture: response.body.postResponse.location });

          this.addPost(this.state);
          /**
           * {
           *   postResponse: {
           *     bucket: "your-bucket",
           *     etag : "9f620878e06d28774406017480a59fd4",
           *     key: "uploads/image.png",
           *     location: "https://your-bucket.s3.amazonaws.com/uploads%2Fimage.png"
           *   }
           * }
           */
        });
      });
  }

  // function to post in database
  addPost(array) {
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
        console.log("Results do addpost: ");
        console.log(responseJson);
        this.props.navigation.navigate("PostScrollList");
      });
  }

  createPost() {
    if (this.state.imagestate == true) this.uploadImage();
    else this.addPost(this.state);
  }

  handleImage = () => {
    (async () => {
      let _result = await openImagePickerAsync();

      if (_result.cancelled == false) {
        this.setState({ imagename: getRandomString(6) });
        this.setState({ imageuri: _result.uri });
        this.setState({ imagetype: _result.type });
        this.setState({ imagestate: true });
      }
    })();
  };

  componentDidMount() {
    fetch(EndpointConfig.fetchShops)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        for (let i = 0; i < responseJson.length; i++) {
          this.state.dropItemShops.push({
            label: responseJson[i].name,
            value: responseJson[i].id,
          });
        }
        if (this.state.dropItemShops.length !== 0) {
          this.setState({
            dataShopsRetrieved: true,
          });
        }
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
          <TextInput
            placeholder="Price"
            style={styles.description}
            onChangeText={(text) => this.setState({ price: text })}
            keyboardType="numeric"
          />
          <DropDownPicker
            items={categoryData}
            containerStyle={{ height: 40 }}
            placeholder={i18n.t("postForm.select_category")}
            style={{ backgroundColor: "#fafafa" }}
            itemStyle={{
              justifyContent: "flex-start",
            }}
            dropDownStyle={{ backgroundColor: "#fafafa" }}
            onChangeItem={(item) =>
              this.setState({
                categorytag: item.value,
              })
            }
          />
          <DropDownPicker
            items={this.state.dropItemShops}
            containerStyle={{ height: 40 }}
            placeholder={i18n.t("postForm.select_shop")}
            style={{ backgroundColor: "#fafafa" }}
            itemStyle={{
              justifyContent: "flex-start",
            }}
            dropDownStyle={{ backgroundColor: "#fafafa" }}
            onChangeItem={(item) =>
              this.setState({
                shop: item.value,
              })
            }
          />
          <TouchableOpacity style={styles.uploadButton}>
            <Button
              title={i18n.t("postForm.upload_button")}
              color="#4A86E8"
              onPress={() => this.handleImage()}
            />
          </TouchableOpacity>

          <Text>{i18n.t("postForm.product_description")}</Text>
          <TextInput
            placeholder={i18n.t("postForm.product_description_input")}
            multiline={true}
            textAlignVertical={"top"}
            maxLength={800}
            numberOfLines={7}
            minHeight={Platform.OS === "ios" ? 20 * 15 : null}
            style={styles.description}
            onChangeText={(text) => this.setState({ description: text })}
          />
          <View style={styles.button}>
            <Button
              title={i18n.t("postForm.confirm")}
              color="#4A86E8"
              onPress={() => this.createPost()}
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
    marginTop: "5%",
  },
  uploadButton: {
    marginTop: 20,
    marginBottom: 10,
    padding: 15,
    borderRadius: 2,
  },
});
