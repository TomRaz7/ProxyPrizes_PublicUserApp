import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity,Image,FlatList, ActivityIndicator, Modal, TouchableHighlight} from 'react-native';
import { Icon } from "react-native-elements";
import faker from '../faker/PostScrollListData';
import DropDownPicker from 'react-native-dropdown-picker';

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
      fetchedDatas:[],
      dataLoaded:false,
      data:faker,
      isModalVisible:false,
      postCategory:'clothing'
    };
  }


  setModalVisible = (visible) => { //The modal will be used to confirm the account creation
    this.setState({ isModalVisible: visible });
  }

_fusionArray(array1,array2){ // function to fusion the posts array and the users information array to have a single array to display the flatlist
  if(array1.length !== array2.length){
    console.log("Error: different array length");
    return 0;
  }
  var fusionedObj = {};
  for(let i = 0; i <array1.length; i++){
    fusionedObj = Object.assign({}, array1[i], array2[i]);
    this.state.fetchedDatas.push(fusionedObj);
  }
  this.setState({
    dataLoaded:true
  })
}

//This function aims to retrieve this user's information that need to be displayed in the scrool list
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
      this._fusionArray(array, responseJson);
    });
  }

  componentDidMount(){
    fetch(EndpointConfig.fetchAllPosts)
    .then(response => response.json())
    .then(responseJson => {
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
    if(this.state.dataLoaded === false || this.state.fetchedDatas.length === 0){
      return(
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator color="#0000ff" size="large"/>
        </View>
      );
    }
    else{
      return(
        <View style={styles.container}>
          <FlatList
              style={styles.list}
              data={this.state.fetchedDatas}
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
                    <Image style={styles.cardImage} source={{ uri: item.picture }} />
                    <View style={styles.cardHeader}>
                      <View>
                        <View style={styles.timeContainer}>
                          <Image
                            style={styles.userImage}
                            source={{ uri: item.publisherPicture }}
                          />
                          <Text style={styles.userTitle}>{item.publisherForname}</Text>
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
                          <Text style={styles.time}>{item.publishedAt}</Text>
                        </View>
                      </View>
                    </View>
                    <View style={styles.cardFooter}>
                      <View style={styles.socialBarContainer}>
                        <View style={styles.socialBarSection}>
                          <TouchableOpacity style={styles.socialBarButton}>
                            <Icon name="heart" type="entypo" style={styles.icon} />
                            <Text style={styles.socialBarLabel}>{item.likecounter}</Text>
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
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.touchableOpacityFilter}
              onPress={() => this.setModalVisible(true)}
            >
              <Icon
                name="magnifying-glass"
                type="entypo"
                color="#4A86E8"
                size={50}
              />
            </TouchableOpacity>

            <View style={styles.centeredView}>
              <Modal
                  animationType="slide"
                  transparent={true}
                  visible={this.state.isModalVisible}
                  onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                  }}
                >
                  <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                      <Text style={styles.modalText}>Select a category of posts</Text>
                      <DropDownPicker
                        items={[
                            {label: 'Clothing', value: 'clothing'},
                            {label: 'Jewelry', value: 'jewelry'},
                            {label: 'Toy', value: 'toy'},
                            {label: 'Kitchen', value: 'kitchen'},
                            {label: 'Sport', value: 'sport'},
                        ]}
                        defaultValue={this.state.city}
                        containerStyle={{height: 40, width:150}}
                        style={{backgroundColor: '#2196F3'}}
                        itemStyle={{
                            justifyContent: 'flex-start',
                        }}
                        dropDownStyle={{backgroundColor: '#fafafa'}}
                        onChangeItem={item => this.setState({
                            postCategory: item.value
                        })}
                     />
                      <TouchableHighlight
                        style={{ ...styles.openButton, backgroundColor: "#2196F3", margin:20, marginTop:200 }}
                        onPress={() => {
                          this.setModalVisible(false);
                          console.log(this.state.postCategory);
                        }}
                      >
                        <Text style={styles.textStyle}>{i18n.t('postForm.confirm')}</Text>
                      </TouchableHighlight>
                    </View>
                  </View>
                </Modal>
              </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  activityIndicatorContainer:{
    flex:1,
    justifyContent:'center'
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
  touchableOpacityFilter:{
    position: "absolute",
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    right: 30,
    bottom: 80,
  },
  /********Modal********/
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    height:400,
  },
  modalView: {
    height:400,
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
});
