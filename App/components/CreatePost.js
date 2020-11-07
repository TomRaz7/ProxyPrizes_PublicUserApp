import React from "react";
import { Icon } from "react-native-elements";
import {StyleSheet,Text,View,TouchableOpacity,Button,SafeAreaView} from "react-native";

import * as ImagePicker from "expo-image-picker";
import { TextInput } from "react-native-gesture-handler";

let openImagePickerAsync = async () => {
  let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

  if (permissionResult.granted === false) {
    alert("Permission to access camera roll is required!");
    return;
  }

  let pickerResult = await ImagePicker.launchImageLibraryAsync();
  console.log(pickerResult);
};

export default class CreatePost extends React.Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.viewtext}>
          <View style={styles.title}>
            <Text>Create post</Text>
          </View>
          <Text>Post title</Text>
          <TextInput placeholder="Enter title..." style={styles.description} />
          <TouchableOpacity style={styles.uploadButton}>
            <Button
              title="Upload a picture!"
              color="#4A86E8"
              onPress={openImagePickerAsync}
            />
          </TouchableOpacity>
          <Text>Post description</Text>
          <TextInput
            placeholder="Enter description..."
            multiline={true}
            textAlignVertical={"top"}
            maxLength={800}
            numberOfLines={15}
            minHeight={Platform.OS === "ios" ? 20 * 15 : null}
            style={styles.description}
          />
          <View style={styles.button}>
            <Button title="Create post" color="#4A86E8" />
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
