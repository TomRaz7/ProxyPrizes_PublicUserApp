import {combineReducers} from 'redux';
import toggleAuthentication from './AuthenticationReducer';
import toggleSubscription from './ShopSubscriptionReducer';
import toggleLanguageSelection from './LanguageReducer';
import toggleTutorial from './DisplayAppTutorialReducer';

const rootReducer =  combineReducers({
  toggleAuthentication,
  toggleSubscription,
  toggleLanguageSelection,
  toggleTutorial
})

export default rootReducer;
