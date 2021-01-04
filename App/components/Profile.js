import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
} from "react-native";
import ConfigStore from "../storeRedux/ConfigStore";
import MesData from "../faker/ProfileData.js";
import SubscribeProfileTemplate from "./SubscribeProfileTemplate";
import { connect } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import { NavigationEvents } from "react-navigation";
import * as Localization from "expo-localization";
import DiscountProfileTemplate from "./DiscountProfileTemplate";
import AvaliabilityRequestTemplate from "./AvaliabilityRequestTemplate";

//Our own components
import TutorialModalTemplate from './TutorialModalTemplate';

//Endpoint Config
import EndpointConfig from "../server/EndpointConfig";

import i18n from "i18n-js";
import Translation from "../language/Translation";

const fr = Translation.fr;
const en = Translation.en;
const es = Translation.es;
const ca = Translation.ca;

i18n.translations = { fr, en, es, ca };
i18n.locale = `${ConfigStore.getState().toggleLanguageSelection.language}`;

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subscribedShopsList: ConfigStore.getState().toggleSubscription
        .subscribedShops,
      bareDiscounts: [],
      requests: [],
      currentUserId: ConfigStore.getState().toggleAuthentication.userId,
      discountsLoaded: false,
      renderDiscounts: [],
      appLanguage: ConfigStore.getState().toggleLanguageSelection.language,
      displayAppTutorial:ConfigStore.getState().toggleTutorial.displayAppTutorial
    };
  }

  _fusionArray(array1, array2) {
    var array3 = [];
    if (array1.length !== array2.length) {
      console.log("Error: different array length");
      return 0;
    }
    var fusionedObj = {};
    for (let i = 0; i < array1.length; i++) {
      fusionedObj = Object.assign({}, array1[i], array2[i]);
      array3.push(fusionedObj);
    }
    return array3;
  }

  fetchDiscountsRelatedShop(array) {
    fetch(EndpointConfig.fetchDiscountsShops, {
      method: "POST",
      body: JSON.stringify(array),
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        var fusionedArray = this._fusionArray(array, responseJson);
        this.state.renderDiscounts = [...fusionedArray];
        this.setState({
          discountsLoaded: true,
        });
        //console.log(this.state.renderDiscounts);
      });
  }

  componentDidMount() {
    //add focus listener
    this.didFocusListener = this.props.navigation.addListener(
      "didFocus",
      this.didFocusAction
    );
    fetch(EndpointConfig.fetchUserDiscounts, {
      method: "POST",
      body: JSON.stringify({
        userId: this.state.currentUserId,
      }),
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        for (let i = 0; i < responseJson.length; i++) {
          this.state.bareDiscounts.push(responseJson[i]);
        }
        this.fetchDiscountsRelatedShop(this.state.bareDiscounts);
      });

    fetch(EndpointConfig.getAvaliabilityRequest, {
      method: "POST",
      body: JSON.stringify({
        userId: this.state.currentUserId,
      }),
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        for (let i = 0; i < responseJson.length; i++) {
          this.state.requests.push(responseJson[i]);
        }
        //console.log(this.state.requests);
      });
  }

  componentWillUnmount() {
    // remove listener
    this.didFocusListener.remove();
  }

  didFocusAction = () => {
    this.setState({
      subscribedShopsList: ConfigStore.getState().toggleSubscription
        .subscribedShops,
    });
  };

  _logOut() {
    const action = { type: "TOGGLE_DECONNECT", value: null };
    this.props.dispatch(action);
    this.props.navigation.navigate("Router");
  }

  _logArrayLenght(array) {
    console.log(array.length);
  }

  render() {
    if (this.state.subscribedShopsList.length !== 0) {
      return (
        <ScrollView style={styles.container}>
          <View
            style={{ backgroundColor: "#4A86E8", width: "100%", height: "15%" }}
          >
            <View
              style={{
                marginTop: 5,
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <Text style={{ fontSize: 25, fontWeight: "bold", color: "#fff" }}>
                {" "}
                ProxyPrize{" "}
              </Text>
              <LinearGradient
                style={styles.linearGradient}
                colors={["#eb3349", "#f45c43"]}
                start={[0, 1]}
                end={[1, 0]}
              >
                <TouchableOpacity
                  style={{ justifyContent: "center" }}
                  onPress={() => this._logOut()}
                >
                  <Text
                    style={{ fontSize: 15, fontWeight: "bold", color: "#fff" }}
                  >
                    {i18n.t("logout")}
                  </Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
            <View style={{ marginLeft: 10 }}>
              <Image
                style={{ width: 125, height: 125, borderRadius: 400 / 2 }}
                //source = {require('/Users/mfoulouyvesmarcel/Desktop/Testons/AwesomeProject/src/images/Asong.jpg')}
              />
            </View>
          </View>

          <View style={{ marginTop: 10, alignItems: "center" }}>
            <Text style={{ fontWeight: "bold", fontSize: 18 }}>
              {i18n.t("profile")}
            </Text>
          </View>
          <View
            style={{
              borderBottomColor: "#4169e1",
              borderBottomWidth: 1,
              marginTop: 7,
            }}
          />
          <View style={{ marginTop: 20 }}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              {i18n.t("shop_subscription")}
            </Text>
          </View>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled={true}
            style={{ marginTop: 15, height: 110 }}
            data={this.state.subscribedShopsList}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.flatlist}>
                <SubscribeProfileTemplate prop={item} />
              </View>
            )}
          />
          <View>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                marginTop: 20,
                marginLeft: 10,
              }}
            >
              {i18n.t("favorite_post")}
            </Text>
          </View>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled={true}
            style={{ marginTop: 15, height: 105 }}
            data={MesData}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.flatlist}>
                <SubscribeProfileTemplate prop={item} />
              </View>
            )}
          />
          <View>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                marginTop: 2,
                marginLeft: 10,
              }}
            >
              {i18n.t("discount")}
            </Text>
          </View>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled={true}
            style={{ marginTop: 15, height: 105 }}
            data={this.state.renderDiscounts}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.flatlist}>
                <DiscountProfileTemplate prop={item} />
              </View>
            )}
          />
          <View>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                marginTop: 20,
                marginLeft: 10,
              }}
            >
              {i18n.t("avaliability_request")}
            </Text>
          </View>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ marginTop: 15, height: 55 }}
            data={this.state.requests}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <AvaliabilityRequestTemplate prop={item} />
            )}
          />
          <TutorialModalTemplate screen="profile" description="Profile tuto description" visible={this.state.displayAppTutorial}/>
        </ScrollView>
      );
    } else {
      return (
        <ScrollView style={styles.container}>
          <View
            style={{ backgroundColor: "#4169e1", width: "100%", height: "15%" }}
          >
            <View
              style={{
                marginTop: 5,
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <Text style={{ fontSize: 30, fontWeight: "bold", color: "#fff" }}>
                {" "}
                ProxyPrize{" "}
              </Text>
              <LinearGradient
                style={styles.linearGradient}
                colors={["#eb3349", "#f45c43"]}
                start={[0, 1]}
                end={[1, 0]}
              >
                <TouchableOpacity onPress={() => this._logOut()}>
                  <Text
                    style={{ fontSize: 20, fontWeight: "bold", color: "#fff" }}
                  >
                    {i18n.t("logout")}
                  </Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
            <View style={{ marginLeft: 10 }}>
              <Image
                style={{ width: 125, height: 125, borderRadius: 400 / 2 }}
                //source = {require('/Users/mfoulouyvesmarcel/Desktop/Testons/AwesomeProject/src/images/Asong.jpg')}
              />
            </View>
          </View>

          <View
            style={{
              borderBottomColor: "#4169e1",
              borderBottomWidth: 1,
              marginTop: 7,
            }}
          />
          <View style={{ marginTop: 10, alignItems: "center" }}>
            <Text style={{ fontWeight: "bold", fontSize: 18 }}>
              {i18n.t("profile")}
            </Text>
          </View>
          <View
            style={{
              borderBottomColor: "#4169e1",
              borderBottomWidth: 1,
              marginTop: 7,
            }}
          />
          <View>
            <Text style={{ fontSize: 20, fontWeight: "bold", marginLeft: 10 }}>
              {i18n.t("shop_subscription")}
            </Text>
          </View>
          <Text style={{ marginLeft: 10 }}>{i18n.t("noShopSubscribed")}</Text>
          <View>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                marginTop: 20,
                marginLeft: 10,
              }}
            >
              {i18n.t("favorite_post")}
            </Text>
          </View>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled={true}
            style={{ marginTop: 15, height: 105 }}
            data={MesData}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <SubscribeProfileTemplate prop={item} />}
          />
          <View>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                marginTop: 20,
                marginLeft: 10,
              }}
            >
              {i18n.t("discount")}
            </Text>
          </View>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled={true}
            style={{ marginTop: 15, height: 105 }}
            data={this.state.renderDiscounts}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <DiscountProfileTemplate prop={item} />}
          />
          <View>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                marginTop: 20,
                marginLeft: 10,
              }}
            >
              {i18n.t("avaliability_request")}
            </Text>
          </View>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ marginTop: 15, height: 55 }}
            data={this.state.requests}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <AvaliabilityRequestTemplate prop={item} />
            )}
          />
          <TutorialModalTemplate screen="profile" description="Profile tuto description" visible={this.state.displayAppTutorial}/>
        </ScrollView>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    //alignItems: 'center',
    //justifyContent: 'center',
  },
  linearGradient: {
    margin: 5,
    padding: 5,
    alignItems: "center",
    borderRadius: 24,
    overflow: "hidden",
    width: 160,
    height: 40,
    justifyContent: "center",
  },
  flatlist: {
    marginRight: 5,
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
});

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(Profile);
