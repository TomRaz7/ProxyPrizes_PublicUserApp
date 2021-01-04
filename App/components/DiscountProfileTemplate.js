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
const pt = Translation.pt;

i18n.translations = { fr, en, es, ca, pt };
i18n.locale = `${ConfigStore.getState().toggleLanguageSelection.language}`;

export default class DiscountProfileTemplate extends React.Component {
  render() {
    const subscriptionProps = this.props.prop;
    return (
      <TouchableOpacity
        style={{
          padding: 10,
          backgroundColor: "#d9d9d9",
          shadowColor: "#000000",
          shadowOpacity: 0.8,
          shadowRadius: 2,
          width: 300,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <Image
            style={{ width: 90, height: 90, borderRadius: 5 }}
            source={{ uri: subscriptionProps.shopPicture }}
          />
          <View>
            <Text style={{ fontWeight: "bold", fontSize: 14 }}>
              {subscriptionProps.shopName}
            </Text>
            <Text style={{ fontWeight: "bold", fontSize: 14 }}>
              {subscriptionProps.shopAdress}
            </Text>
          </View>
        </View>
        <View
          style={{
            margin: 10,
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 10 }}>
            {subscriptionProps.percent} % {i18n.t("discount_amount")}
          </Text>
          <Text style={{ fontWeight: "bold", fontSize: 10 }}>
            {i18n.t("discount_validity")}:{" "}
            {subscriptionProps.validity.toString().slice(0, 10)}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}
