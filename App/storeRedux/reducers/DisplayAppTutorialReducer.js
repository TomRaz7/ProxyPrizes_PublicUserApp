const initialState = {
  screenDiscovered:{
    map:false,
    postlist:false,
    profile:false,
    singleShop:false,
    postForm:false,
    postDetail:false
  },
  displayAppTutorial:true
}




function toggleTutorial(state = initialState, action){
  let nextState = state;
  let res = Object.values(nextState.screenDiscovered);
  console.log("Valeur des attributes screendiscovered redux :");
  for(let i = 0; i<res.lenght; i++){
    console.log(res[i]);
  }
  if(!res.includes(false)){
    nextState.displayAppTutorial = false;
  }
  else{
    switch (action.type) {
      case 'MAP_DISCOVERED':
        nextState.screenDiscovered.map = true;
        return nextState;
        break;
      case 'POSTLIST_DISCOVERED':
        nextState.screenDiscovered.postlist = true;
        return nextState;
        break;
      case 'PROFILE_DISCOVERED':
        nextState.screenDiscovered.profile = true;
        return nextState;
        break;
      case 'SINGLESHOP_DISCOVERED':
        nextState.screenDiscovered.singleShop = true;
        return nextState;
        break;
      case 'POSTFORM_DISCOVERED':
        nextState.screenDiscovered.postForm = true;
        return nextState;
        break;
      case 'POSTDETAIL_DISCOVERED':
        nextState.screenDiscovered.postDetail = true;
        return nextState;
        break;
      default:
        return state;
    }
  }

}

export default toggleTutorial;
