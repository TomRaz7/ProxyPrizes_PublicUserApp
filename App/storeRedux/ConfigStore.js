import {createStore, combineReducers} from 'redux';
import FSStorage from 'redux-persist-expo-fs-storage';
import {persistStore, persistReducer} from 'redux-persist';
import rootReducer from './reducers/RootReducer';


const persistingReducer = persistReducer({key:'root',storage: FSStorage()}, rootReducer);
const configStore = createStore(persistingReducer);
const persistor = persistStore(configStore);

const getPersistor = () => persistor;
const getStore = () => configStore;
const getState = () => {
  return configStore.getState();
};

export{
  getStore,
  getState,
  getPersistor,
  configStore
};

export default{
  getStore,
  getState,
  getPersistor,
  configStore
}
