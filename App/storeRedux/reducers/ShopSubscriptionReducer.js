const initialState = {subscribedShops : []}

function toggleSubscription(state = initialState,action){
  switch(action.type){
    case 'TOOGLE_SUBSCRIBE':
      const subscribedShopsIndex = state.subscribedShops.findIndex(item => item.id === action.value.id)
      if(subscribedShopsIndex !== -1){
        //deletion
        nextState = {
          ...state,
          subscribedShops: state.subscribedShops.filter((item, index) => index !== subscribedShopsIndex)
        }
      }
      else{
        //add
        nextState = {
          ...state,
          subscribedShops: [...state.subscribedShops, action.value]
        }
      }
      return nextState || state
    default:
      return state
  }
}

export default toggleSubscription
