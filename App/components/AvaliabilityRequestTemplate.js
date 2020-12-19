import React from "react";
import {
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import ConfigStore from "../storeRedux/ConfigStore";
//import CardView from 'react-native-cardview';

import i18n from "i18n-js";
import Translation from "../language/Translation";

const fr = Translation.fr;
const en = Translation.en;
const es = Translation.es;
const ca = Translation.ca;

i18n.translations = { fr, en, es, ca };
i18n.locale = `${ConfigStore.getState().toggleLanguageSelection.language}`;

export default class AvailiabilityRequestTemplate extends React.Component {
  render() {
    const requestProps = this.props.prop;
    return (
      <TouchableOpacity
        style={{
          padding: 10,
          //backgroundColor: "#2976d1",
          width: 300,
          height: 100,
        }}
      >
        <View
          style={{
            margin: 10,
            flexDirection: "column",
            backgroundColor: "#2196F3",
            justifyContent: "space-around",
            shadowColor: "#000000",
            shadowOpacity: 1,
            shadowRadius: 4,
            shadowRadius: 2,
            borderRadius: 5,
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 12,
              margin: 5,
              marginTop: 10,
              color: "white",
            }}
          >
            Product: {requestProps.description}
          </Text>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 12,
              margin: 5,
              color: "white",
            }}
          >
            Status: {requestProps.status}
          </Text>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 12,
              margin: 5,
              marginBottom: 10,
              color: "white",
            }}
          >
            Answer: {requestProps.answer}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}
