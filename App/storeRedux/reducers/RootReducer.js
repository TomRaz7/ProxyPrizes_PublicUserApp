import {combineReducers} from 'redux';
import toggleAuthentication from './AuthenticationReducer';
import toggleSubscription from './ShopSubscriptionReducer';
import toggleLanguageSelection from './LanguageReducer';

const rootReducer =  combineReducers({
  toggleAuthentication,
  toggleSubscription,
  toggleLanguageSelection
})

export default rootReducer;
