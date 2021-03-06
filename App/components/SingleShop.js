import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { Icon, Card, Button } from "react-native-elements";
import { LinearGradient } from "expo-linear-gradient";
import faker from "../faker/PostData";
import ConfigStore from "../storeRedux/ConfigStore";
import { connect } from "react-redux";
import * as Localization from "expo-localization";

//Subscription notification
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";

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
const pt = Translation.pt;

i18n.translations = { fr, en, es, ca, pt };
i18n.locale = `${ConfigStore.getState().toggleLanguageSelection.language}`;

const singleShopDescription = "This is the single shop screen. Here you will find all the posts related to this shop. You can subscribe to the shop to access it easily directly from your profile !";

class SingleShop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayAppTutorial:false,
      shop: this.props.navigation.getParam("shop"),
      relatedPosts: [],
      subscribedShops: ConfigStore.getState().toggleSubscription
        .subscribedShops,
      isSubscribed: null,
      dataLoaded: false,
      posts: [],
      fetchedDatas: [],
      expoToken: null,
    };
    this._initPostList(faker);
    this._checkSubscription(this.state.shop.id, this.state.subscribedShops);
    console.log(this.state.isSubscribed);
  }

  _fusionArray(array1, array2) {
    // function to fusion the posts array and the users information array to have a single array to display the flatlist
    if (array1.length !== array2.length) {
      console.log("Error: different array length");
      return 0;
    }
    var fusionedObj = {};
    for (let i = 0; i < array1.length; i++) {
      fusionedObj = Object.assign({}, array1[i], array2[i]);
      this.state.fetchedDatas.push(fusionedObj);
    }
    // console.log("Post du shop a afficher");
    // console.log(this.state.fetchedDatas);
    this.setState({
      dataLoaded: true,
    });
  }

  //This function aims to retrieve this user's information that need to be displayed in the scrool list
  fetchPostsPublishers(array) {
    fetch(EndpointConfig.fetchPostsPublishers, {
      method: "POST",
      body: JSON.stringify(array),
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this._fusionArray(array, responseJson);
      });
  }

  updateState(dataFromChild){
    this.setState({
      displayAppTutorial:dataFromChild
    });
    const action = {type:'SINGLESHOP_DISCOVERED',value:true};
    this.props.dispatch(action);
  }

  componentWillUnmount(){
    this.didFocusListener.remove();
  }

  didFocusAction = () => {
    this.setState({
      displayAppTutorial:ConfigStore.getState().toggleTutorial.displaySingleShopModalTutorial
    });
  }


  componentDidMount() {
    this.didFocusListener = this.props.navigation.addListener('didFocus', this.didFocusAction)
    fetch(EndpointConfig.fetchSingleShopPosts, {
      method: "POST",
      body: JSON.stringify({
        shop: this.state.shop.id,
      }),
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        for (let i = 0; i < responseJson.length; i++) {
          this.state.posts.push(responseJson[i]);
        }
        this.fetchPostsPublishers(this.state.posts);
      });
    this.retrieveExpoPushTokenFromDB();
  }

  _initPostList(fakerList) {
    for (let i = 0; i < fakerList.length; i++) {
      if (fakerList[i].relatedShopId === this.state.shop.id) {
        this.state.relatedPosts.push(fakerList[i]);
      }
    }
  }

  _checkSubscription(shopId, list) {
    if (list.lenght === 0) {
      this.state.isSubscribed = false;
    } else {
      const index = list.findIndex((item) => item.id === shopId);
      if (index !== -1) {
        this.state.isSubscribed = true;
      } else {
        this.state.isSubscribed = false;
      }
    }
  }

  _logArrayLenght(array) {
    console.log(array.length);
  }

  retrieveExpoPushTokenFromDB() {
    const userId = ConfigStore.getState().toggleAuthentication.userId;
    fetch(EndpointConfig.retrieveExpoToken, {
      method: "POST",
      body: JSON.stringify({
        userId: userId,
        toWho: "single",
      }),
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson[0].expoToken);
        this.setState({
          expoToken: responseJson[0].expoToken,
        });
      });
  }

  _subscribe(shop) {
    const action = { type: "TOOGLE_SUBSCRIBE", value: shop };
    this.props.dispatch(action);
    this.forceUpdate();
    this._checkSubscription(this.state.shop.id, this.state.subscribedShops);
    console.log("Dans la fonction subscribe");
    console.log(this.state.expoToken);
    fetch(EndpointConfig.sendNotification, {
      method: "POST",
      body: JSON.stringify({
        expoToken: this.state.expoToken,
        notificationTitle: "You've just had a new subscriber",
        notificationBody: "... is following your shop",
      }),
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("La répinse json");
        console.log(responseJson);
      });
  }

  render() {
    if (
      this.state.dataLoaded === false ||
      this.state.fetchedDatas.length === 0
    ) {
      return (
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator color="#0000ff" size="large" />
        </View>
      );
    } else {
      if (
        this.state.isSubscribed === null ||
        this.state.isSubscribed === false
      ) {
        return (
          <View style={styles.container}>
            <View style={styles.headerContainer}>
              <LinearGradient
                style={styles.circularLinearGradient}
                colors={["#fff", "#fff"]}
                start={[0, 1]}
                end={[1, 0]}
              >
                <Icon name="shop" type="entypo" size={25} color="#4A86E8" />
              </LinearGradient>
              <Text style={styles.title}>{this.state.shop.name}</Text>
              <LinearGradient
                style={styles.linearGradient}
                colors={["#eb3349", "#f45c43"]}
                start={[0, 1]}
                end={[1, 0]}
              >
                <TouchableOpacity
                  style={styles.touchableOpacity}
                  onPress={() => this._subscribe(this.state.shop)}
                >
                  <Text style={styles.subscribeText}>
                    {i18n.t("subscribe")}
                  </Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
            <View style={styles.flatListContainer}>
              <FlatList
                data={this.state.fetchedDatas}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => {
                  for (let i = 0; i < this.state.fetchedDatas.length; i++) {
                    return (
                      <View style={styles.post}>
                        <Card>
                          <Card.Title>{item.title}</Card.Title>
                          <Card.Divider />
                          <Card.Image source={{ uri: item.picture }} />
                          <Text style={{ marginBottom: 10 }}>
                            {item.description}
                          </Text>
                        </Card>
                      </View>
                    );
                  }
                }}
              />
              <TutorialModalTemplate screen="singleShop" description={singleShopDescription} visible={this.state.displayAppTutorial} updateParentState={this.updateState.bind(this)}/>
            </View>
          </View>
        );
      } else {
        return (
          <View style={styles.container}>
            <View style={styles.headerContainer}>
              <LinearGradient
                style={styles.circularLinearGradient}
                colors={["#fff", "#fff"]}
                start={[0, 1]}
                end={[1, 0]}
              >
                <Icon name="shop" type="entypo" size={25} color="#4A86E8" />
              </LinearGradient>
              <Text style={styles.title}>{this.state.shop.name}</Text>
              <LinearGradient
                style={styles.linearGradient}
                colors={["#F5F7FA", "#B8C6DB"]}
                start={[0, 1]}
                end={[1, 0]}
              >
                <TouchableOpacity
                  style={styles.touchableOpacity}
                  onPress={() => this._subscribe(this.state.shop)}
                >
                  <Text style={styles.unsubscribeText}>
                    {i18n.t("unsubscribe")}
                  </Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
            <View style={styles.flatListContainer}>
              <FlatList
                data={this.state.fetchedDatas}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => {
                  for (let i = 0; i < this.state.fetchedDatas.length; i++) {
                    return (
                      <View style={styles.post}>
                        <Card>
                          <Card.Title>{item.title}</Card.Title>
                          <Card.Divider />
                          <Card.Image source={{ uri: item.picture }} />
                          <Text style={{ marginBottom: 10 }}>
                            {item.description}
                          </Text>
                        </Card>
                      </View>
                    );
                  }
                }}
              />
              <TutorialModalTemplate screen="singleShop" description={singleShopDescription} visible={this.state.displayAppTutorial} updateParentState={this.updateState.bind(this)}/>
            </View>
          </View>
        );
      }
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4A86E8",
  },
  activityIndicatorContainer: {
    flex: 1,
    justifyContent: "center",
  },
  headerContainer: {
    flex: 0.75,
    flexDirection: "row",
    margin: 10,
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#4A86E8",
  },
  flatListContainer: {
    flex: 8,
    justifyContent: "center",
    alignItems: "center",
    margin: 2,
    backgroundColor: "#F3F3F3",
  },
  post: {
    margin: 10,
  },
  title: {
    fontSize: 25,
    color: "#fff",
  },
  linearGradient: {
    padding: 10,
    alignItems: "center",
    borderRadius: 24,
    overflow: "hidden",
    width: 100,
    height: 40,
  },
  subscribeText: {
    fontWeight: "bold",
    color: "#fff",
  },
  touchableOpacity: {
    alignItems: "center",
    borderRadius: 20,
    overflow: "hidden",
    width: 100,
    height: 40,
  },
  circularLinearGradient: {
    width: 40,
    height: 40,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  unsubscribeText: {
    fontWeight: "bold",
    color: "grey",
  },
});

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(SingleShop);
