import React from "react";
import {
  Alert,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";

import ConfigStore from "../storeRedux/ConfigStore";
import EndpointConfig from "../server/EndpointConfig";

//Our own components
import TutorialModalTemplate from "./TutorialModalTemplate";
import PaymentModal from "./PaymentModal";
import PaymentSucceededModal from "./PaymentSucceededModal";

import i18n from "i18n-js";
import Translation from "../language/Translation";

const fr = Translation.fr;
const en = Translation.en;
const es = Translation.es;
const ca = Translation.ca;
const pt = Translation.pt;

i18n.translations = { fr, en, es, ca, pt };
i18n.locale = `${ConfigStore.getState().toggleLanguageSelection.language}`;

const postDetailDescription =
  "This is the post detail screen. Click on the first button to ask for its availability. Click on the latest button to purchase the product";

//Payment
import { PaymentsStripe as Stripe } from "expo-payments-stripe";

Stripe.setOptionsAsync({
  publishableKey:
    "pk_test_51I6I1WFgrdNJx60HgDra0rpGRChswvnxFfr76NTzOA2lDv3Dm55qOUYGywMBycQI1wgQbtX1mVIB8cUc6WcyvE2U00IfgyNztu", // Your key
});

class PostDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      post: this.props.navigation.getParam("post"),
      currentUser: ConfigStore.getState().toggleAuthentication.userId,
      isModalVisible: false,
      displayAppTutorial: false,
      paymentModalVisible: false,
      paymentInformtation: {
        number: null,
        expMonth: null,
        expYear: null,
        cvc: null,
      },
      stripeToken: null,
      makePament: false,
      paymentStatus: false,
      paymentSucceededModalVisible: false,
      paymentFailedModalVisible: false,
      receiptUrl: null,
    };
  }

  updateStateFromPaymentModal(dataFromChild) {
    //Get the payment information from the modal, generate the stripe token then fectch backend for payment
    console.log("Data depuis le modal de payment");
    console.log(dataFromChild);
    this.setState(
      {
        paymentModalVisible: dataFromChild.modalVisible,
        paymentInformation: Object.assign({}, dataFromChild.paymentInformation),
      },
      async () => {
        console.log("Infos de payment récupérées depuis le fils");
        console.log(this.state.paymentInformation);
        var token = await Stripe.createTokenWithCardAsync(
          this.state.paymentInformation
        );
        console.log("Token récupéré depuis Stripe");
        console.log(token);
        this.setState(
          {
            stripeToken: token,
          },
          async () => {
            console.log("Token dans le state :");
            console.log(this.state.stripeToken);
            try {
              fetch(EndpointConfig.stripePayment, {
                method: "POST",
                body: JSON.stringify({
                  email: "lecreux.tom@gmail.com",
                  authToken: this.state.stripeToken,
                  product: this.state.post,
                }),
                headers: {
                  Accept: "application/json",
                  "content-type": "application/json",
                },
              })
                .then((response) => response.json())
                .then((responseJson) => {
                  //console.log("Réponse issu du paiement");
                  //console.log(responseJson);
                  //console.log(responseJson["paid"]);
                  if (responseJson["paid"] === true) {
                    // console.log("La réponse");
                    // console.log(responseJson["receipt_url"]);
                    this.setState({
                      paymentStatus: "succeeded",
                      receiptUrl: responseJson["receipt_url"],
                      paymentSucceededModalVisible: true,
                    });
                  } else {
                    this.setState({
                      paymentStatus: "failed",
                      paymentFailedModalVisible: true,
                    });
                  }
                });
            } catch (error) {
              console.log(error);
              this.setState({
                paymentStatus: "failed",
              });
            }
          }
        );
      }
    );
  }

  updateStateFromSucceededPaymentModal(dataFromChild) {
    this.setState({
      paymentSucceededModalVisible: dataFromChild,
    });
  }
  updateState(dataFromChild) {
    this.setState({
      displayAppTutorial: dataFromChild,
    });
    const action = { type: "POSTDETAIL_DISCOVERED", value: true };
    this.props.dispatch(action);
  }

  componentWillUnmount() {
    this.didFocusListener.remove();
  }

  didFocusAction = () => {
    this.setState({
      displayAppTutorial: ConfigStore.getState().toggleTutorial
        .displayPostDetailModalTutorial,
    });
  };

  componentDidMount() {
    this.didFocusListener = this.props.navigation.addListener(
      "didFocus",
      this.didFocusAction
    );
    if (this.state.currentUser === this.state.post.customer) {
      this.setState({
        isModalVisible: true,
      });
    }
  }

  _deletePostAlert(id) {
    Alert.alert(
      "Are you sure you want to delete this post?",
      "You cannot undo that",
      [
        {
          text: "No",
          onPress: () => console.log("Cancel Pressed"),
        },
        { text: "Yes", onPress: () => this.deletePost(id) },
      ],
      { cancelable: false }
    );
  }

  deletePost(id) {
    console.log("OK Pressed");

    var postData = { postId: id };

    fetch(EndpointConfig.deletePost, {
      method: "POST",
      body: JSON.stringify(postData),
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("Post deleted.");
        this.props.navigation.navigate("PostScrollList");
      });
  }

  _askAvaliabilityAlert(array) {
    Alert.alert(
      "You want to ask the shop if this product is still avaliable?",
      "You will be notified when the shop responds",
      [
        {
          text: "No",
          onPress: () => console.log("Cancel Pressed"),
        },
        { text: "Yes", onPress: () => this.askAvaliability(array) },
      ],
      { cancelable: false }
    );
  }

  askAvaliability(array) {
    console.log(array);
    data = {
      customer: this.state.currentUser,
      shop: array.shop,
      description: array.title,
      userId: "",
      toWho: "single",
      isShop: "yes",
      expoToken: "",
      notificationTitle: "A user have a request for you!",
      notificationBody: "Answer as soon as possible",
    };

    fetch(EndpointConfig.addAvaliabilityRequest, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson.status);

        fetch(EndpointConfig.getShopOwner, {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            Accept: "application/json",
            "content-type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((responseJson) => {
            data.userId = responseJson[0].owner;

            fetch(EndpointConfig.retrieveExpoToken, {
              method: "POST",
              body: JSON.stringify(data),
              headers: {
                Accept: "application/json",
                "content-type": "application/json",
              },
            })
              .then((response) => response.json())
              .then((responseJson) => {
                if (
                  responseJson[0].expoToken !== "empty" &&
                  responseJson[0].expoToken !== "undefined"
                ) {
                  console.log("Token retrieved from shop!");
                  data.expoToken = responseJson[0].expoToken;

                  fetch(EndpointConfig.sendNotification, {
                    method: "POST",
                    body: JSON.stringify(data),
                    headers: {
                      Accept: "application/json",
                      "content-type": "application/json",
                    },
                  })
                    .then((response) => response.json())
                    .then((responseJson) => {
                      console.log("End of process ask avaliability");
                    });
                } else {
                  console.log(
                    "This shop does not have an token registered so the notification won't be sent."
                  );
                  return;
                }
              });
          });
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.image}>
          <Image
            style={styles.image}
            source={{ uri: this.state.post.picture }}
          />
        </View>
        <View style={styles.content}>
          <View style={styles.postHeader}>
            <Text style={styles.title}>{this.state.post.title}</Text>
            <LinearGradient
              style={styles.linearGradient}
              colors={["#0575E6", "#205E9B"]}
              start={[0, 1]}
              end={[1, 0]}
            >
              <TouchableOpacity
                style={styles.touchableOpacity}
                onPress={() => this._askAvaliabilityAlert(this.state.post)}
              >
                <Text style={{ color: "#fff", fontWeight: "bold" }}>
                  {i18n.t("ask_avaliability")}
                </Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>

          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionText}>
              {this.state.post.description}
            </Text>
          </View>
          {this.state.isModalVisible && (
            <View style={styles.postBottom}>
              <LinearGradient
                style={styles.linearGradient}
                colors={["#e81809", "#ad2218"]}
                start={[0, 1]}
                end={[1, 0]}
              >
                <TouchableOpacity
                  style={styles.touchableOpacity}
                  onPress={() => this._deletePostAlert(this.state.post.id)}
                >
                  <Text style={{ color: "#fff", fontWeight: "bold" }}>
                    {i18n.t("delete_post")}
                  </Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
          )}
          <View style={styles.postBottom}>
            <LinearGradient
              style={styles.linearGradient}
              colors={["#0575E6", "#205E9B"]}
              start={[0, 1]}
              end={[1, 0]}
            >
              <TouchableOpacity
                style={styles.touchableOpacityBis}
                onPress={() => this.setState({ paymentModalVisible: true })}
              >
                <Text style={{ color: "#fff", fontWeight: "bold" }}>
                  {i18n.t("purchase_product")}
                </Text>
              </TouchableOpacity>
            </LinearGradient>
            {this.state.displayAppTutorial && (
              <TutorialModalTemplate
                screen="postDetail"
                description="Post detail tuto description"
                visible={this.state.displayAppTutorial}
                updateParentState={this.updateState.bind(this)}
              />
            )}
            {this.state.paymentModalVisible && (
              <PaymentModal
                visible={this.state.paymentModalVisible}
                productPrice={this.state.post.price}
                productName={this.state.post.title}
                updateParentState={this.updateStateFromPaymentModal.bind(this)}
              />
            )}
            {this.state.paymentSucceededModalVisible && (
              <PaymentSucceededModal
                visible={this.state.paymentSucceededModalVisible}
                receiptUrl={this.state.receiptUrl}
                updateParentState={this.updateStateFromSucceededPaymentModal.bind(
                  this
                )}
              />
            )}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    textAlign: "center",
    alignItems: "center",
  },
  image: {
    flex: 3,
    width: "100%",
  },
  content: {
    flex: 6,
    width: "100%",
  },
  postHeader: {
    alignItems: "center",
    margin: 10,
    flex: 4,
    backgroundColor: "white",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  postBottom: {
    alignItems: "center",
    margin: 10,
    marginTop: 1,
    flex: 3,
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  descriptionContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    flex: 6,
    backgroundColor: "white",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  descriptionText: {
    marginLeft: 10,
  },
  title: {
    margin: 5,
    fontSize: 15,
    fontWeight: "bold",
  },
  touchableOpacity: {
    alignItems: "center",
    borderRadius: 20,
    overflow: "hidden",
    width: 150,
    height: 40,
    justifyContent: "center",
  },
  touchableOpacityBis: {
    alignItems: "center",
    borderRadius: 20,
    overflow: "hidden",
    width: 250,
    height: 40,
    justifyContent: "center",
  },
  linearGradient: {
    padding: 15,
    alignItems: "center",
    borderRadius: 24,
    overflow: "hidden",
    width: 150,
    height: 40,
    justifyContent: "center",
  },
});

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(PostDetail);
