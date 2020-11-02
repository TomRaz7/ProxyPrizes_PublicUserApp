import {combineReducers} from 'redux';
import toggleAuthentication from './AuthenticationReducer';

const rootReducer =  combineReducers({
  toggleAuthentication
})

export default rootReducer;
