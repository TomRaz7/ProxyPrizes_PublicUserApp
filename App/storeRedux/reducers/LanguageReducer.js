const initialState = {
  language:'fr'
}

function toggleLanguageSelection(state =  initialState, action){
  let nextState =  state;
  switch (action.type) {
    case 'TOGGLE_LANGUAGE_SELECTION':
      nextState = {
        language:action.value
      }
      return nextState;
      break;
    default:
      return state;
  }
}

export default toggleLanguageSelection;
