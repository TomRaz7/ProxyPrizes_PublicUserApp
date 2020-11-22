import React from 'react';
import {StyleSheet,View,Text,Image,TouchableOpacity,Alert, Modal, TouchableHighlight} from 'react-native';
import {Icon} from 'react-native-elements';
import ConfigStore from '../storeRedux/ConfigStore';
import i18n from 'i18n-js';
import Translation from '../language/Translation';
import {connect} from 'react-redux';

const fr = Translation.fr;
const en = Translation.en;
const es = Translation.es;

i18n.translations = {fr, en, es};
i18n.locale = `${ConfigStore.getState().toggleLanguageSelection.language}` //We would latter store the user preferencces through redux  : ConfigStore.getState().toggleLanguage.language

class AppHeader extends React.Component{

  constructor(props){
    super(props);
    this.state={
      isModalVisible:false,
      appLanguage:''
    }
  }

  setAppLanguage(language){
    console.log(language);
    const action = {type:'TOGGLE_LANGUAGE_SELECTION', value:language};
    this.props.dispatch(action);
    console.log(ConfigStore.getState().toggleLanguageSelection.language);
  }

  setModalVisible = (visible) => {
    this.setState({ isModalVisible: visible });
  }

  render(){
    const { modalVisible } = this.state;
    return(
      <View style={styles.headerContainer}>
        <Image resizeMode="contain"
          style={styles.logo}
          source={require('../assets/logo.png')}
        />
        <View style={styles.titleContainer}>
          <Text style={styles.title}>ProxyPrizes</Text>
        </View>
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={() => this.setModalVisible(true)}>
            <Icon name='world-o' type='fontisto' color="#4A86E8" size={30}/>
          </TouchableOpacity>
        </View>
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
                  <Text style={styles.modalText}>{i18n.t('language')}</Text>
                  <View style={styles.languageSelectorContainer}>
                    <Text>{i18n.t('fr')}</Text>
                    <TouchableOpacity onPress={() => this.state.appLanguage = 'fr'}>
                      <Image resizeMode="contain"
                        style={styles.flag}
                        source={require('../assets/france.png')}
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.languageSelectorContainer}>
                    <Text>{i18n.t('es')}</Text>
                    <TouchableOpacity onPress={() => this.state.appLanguage = 'es'}>
                      <Image resizeMode="contain"
                        style={styles.flag}
                        source={require('../assets/spain.png')}
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.languageSelectorContainer}>
                    <Text>{i18n.t('en')}</Text>
                    <TouchableOpacity onPress={() => this.state.appLanguage = 'en'}>
                      <Image resizeMode="contain"
                        style={styles.flag}
                        source={require('../assets/en.png')}
                      />
                    </TouchableOpacity>
                  </View>
                  <TouchableHighlight
                    style={{ ...styles.openButton, backgroundColor: "#2196F3", margin:20 }}
                    onPress={() => {
                      this.setModalVisible(false);
                      this.setAppLanguage(this.state.appLanguage)
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

const styles = StyleSheet.create({
  headerContainer:{
    flex:1, flexDirection:'row', alignItems:'center',margin:5
  },
  logo:{
    width:40, height: 40
  },
  titleContainer:{
    marginLeft:10
  },
  title:{
    textAlign:'center', fontWeight: 'bold', fontSize:20
  },
  iconContainer:{
    marginLeft:125,justifyContent:'flex-end'
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
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
  flag:{
    height:30,
    width:30
  },
  languageSelectorContainer:{
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center',
    width:100,
  }
})

const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps)(AppHeader);
