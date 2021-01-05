const initialState = {
  displayMapModalTutorial:true,
  displayPostlistModalTutorial:true,
  displayProfileModalTutorial:true,
  displaySingleShopModalTutorial:true,
  displayPostFormModalTutorial:true,
  displayPostDetailModalTutorial:true
}

function toggleTutorial(state = initialState, action){
  let nextState = state;
  switch (action.type) {
    case 'MAP_DISCOVERED':
      nextState.displayMapModalTutorial = false;
      return nextState;
      break;
    case 'POSTLIST_DISCOVERED':
      nextState.displayPostlistModalTutorial = false;
      return nextState;
      break;
    case 'PROFILE_DISCOVERED':
      nextState.displayProfileModalTutorial = false;
      return nextState;
      break;
    case 'SINGLESHOP_DISCOVERED':
      nextState.displaySingleShopModalTutorial = false;
      return nextState;
      break;
    case 'POSTFORM_DISCOVERED':
      nextState.displayPostFormModalTutorial = false;
      return nextState;
      break;
    case 'POSTDETAIL_DISCOVERED':
      nextState.displayPostDetailModalTutorial = false;
      return nextState;
      break;
    default:
      return state;
  }
}

export default toggleTutorial;
