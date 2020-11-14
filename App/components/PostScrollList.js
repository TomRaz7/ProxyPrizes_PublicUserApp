import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity,Image,FlatList } from 'react-native';
import { Icon } from "react-native-elements";
import faker from '../faker/PostScrollListData';

//Endpoint Config
import EndpointConfig from '../server/EndpointConfig';

import i18n from 'i18n-js';
import Translation from '../language/Translation';


const fr = Translation.fr;
const en = Translation.en;
const es = Translation.es;

i18n.translations = {fr, en, es};
i18n.locale = "fr" //We would latter store the user preferencces through redux  : ConfigStore.getState().toggleLanguage.language

export default class PostScrollList extends React.Component{
  constructor(props){
    super(props);
    this.state={
      posts:[],
      dataRetrieved:false,
      data:faker
    };
  }


//This function aims to retrieve this user's information that need to be displayed
  fetchPostsPublishers(array){
    fetch(EndpointConfig.fetchPostsPublishers,{
      method:'POST',
      body:JSON.stringify(array),
      headers:{
             Accept: 'application/json',
             'content-type':'application/json'
           }
    })
    .then(response => response.json())
    .then(responseJson => {
      console.log("resultats dans la fontion");
      console.log(responseJson);
    });
  }

  componentDidMount(){
    fetch(EndpointConfig.fetchAllPosts)
    .then(response => response.json())
    .then(responseJson => {
      console.log(responseJson);
      for (var i = 0; i < responseJson.length; i++) {
          this.state.posts.push(responseJson[i]);
      }
      this.fetchPostsPublishers(this.state.posts);
    });
  }

  _displayPostForm(){
    this.props.navigation.navigate("CreatePost");
  }

  render(){
    return(
      <View style={styles.container}>
        <FlatList
            style={styles.list}
            data={this.state.data}
            keyExtractor={(item) => {
              return item.id;
            }}
            ItemSeparatorComponent={() => {
              return <View style={styles.separator} />;
            }}
            renderItem={(post) => {
              const item = post.item;
              return (
                <View style={styles.card}>
                  <Image style={styles.cardImage} source={{ uri: item.image }} />
                  <View style={styles.cardHeader}>
                    <View>
                      <View style={styles.timeContainer}>
                        <Image
                          style={styles.userImage}
                          source={{ uri: item.userImage }}
                        />
                        <Text style={styles.userTitle}>{item.username}</Text>
                      </View>
                      <Text style={styles.title}>{item.title}</Text>
                      <Text style={styles.description}>{item.description}</Text>
                      <View style={styles.timeContainer}>
                        <Icon
                          name="clock"
                          type="entypo"
                          size={15}
                          style={styles.iconClock}
                          onPress={() =>
                            this.props.navigation.navigate("CreatePost")
                          }
                        />
                        <Text style={styles.time}>{item.time}</Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.cardFooter}>
                    <View style={styles.socialBarContainer}>
                      <View style={styles.socialBarSection}>
                        <TouchableOpacity style={styles.socialBarButton}>
                          <Icon name="heart" type="entypo" style={styles.icon} />
                          <Text style={styles.socialBarLabel}>{item.likes}</Text>
                        </TouchableOpacity>
                      </View>
                      <View style={styles.socialBarSection}>
                        <TouchableOpacity style={styles.socialBarButton}>
                          <Icon
                            name="message"
                            type="entypo"
                            style={styles.icon}
                          />
                          <Text style={styles.socialBarLabel}>{i18n.t('comment')}</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              );
            }}
          />
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.touchableOpacityStyle}
            onPress={() => this._displayPostForm()}
          >
            <Icon
              name="circle-with-plus"
              type="entypo"
              color="#4A86E8"
              size={50}
            />
          </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    paddingHorizontal: 17,
    backgroundColor: "#E6E6E6",
  },
  separator: {
    marginTop: 10,
  },
  /******** card **************/
  card: {
    shadowColor: "#00000021",
    shadowOffset: {
      width: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    marginVertical: 8,
    backgroundColor: "white",
  },
  cardHeader: {
    paddingVertical: 17,
    paddingHorizontal: 16,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardContent: {
    paddingVertical: 12.5,
    paddingHorizontal: 16,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 12.5,
    paddingBottom: 12.5,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
    backgroundColor: "#EEEEEE",
  },
  cardImage: {
    flex: 1,
    height: 150,
    width: null,
  },
  /******** card components **************/
  title: {
    fontSize: 18,
    flex: 1,
    marginTop: 10,
  },
  description: {
    fontSize: 15,
    color: "#888",
    flex: 1,
    marginTop: 5,
    marginBottom: 5,
  },
  userTitle: {
    fontSize: 18,
    flex: 1,
    marginLeft: 10,
  },
  userImage: {
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
  },
  time: {
    fontSize: 13,
    color: "#808080",
    marginTop: 5,
  },
  iconClock: {
    width: 15,
    height: 15,
    marginRight: 5,
  },
  icon: {
    width: 25,
    height: 25,
    marginRight: 5,
  },
  iconData: {
    width: 15,
    height: 15,
    marginTop: 2,
    marginRight: 5,
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  /******** social bar ******************/
  socialBarContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    flex: 1,
  },
  socialBarSection: {
    justifyContent: "center",
    flexDirection: "row",
    flex: 1,
  },
  socialBarlabel: {
    marginLeft: 8,
    alignSelf: "flex-end",
    justifyContent: "center",
  },
  socialBarButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  touchableOpacityStyle: {
    position: "absolute",
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    right: 30,
    bottom: 30,
  },
});
