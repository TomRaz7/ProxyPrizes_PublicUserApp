import {combineReducers} from 'redux';
import toggleAuthentication from './AuthenticationReducer';
import toggleSubscription from './ShopSubscriptionReducer';

const rootReducer =  combineReducers({
  toggleAuthentication,
  toggleSubscription
})

export default rootReducer;
