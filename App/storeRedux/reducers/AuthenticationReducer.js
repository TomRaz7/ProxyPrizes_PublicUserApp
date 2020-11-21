const initialState = {
  id:null,
  token:null,
  mail:null,
  password:null
}

function toggleAuthentication(state = initialState, action){
  let nextState = state;
  switch (action.type) {
    case 'TOGGLE_CONNECT':
      nextState={
        token:action.value.token,
        mail:action.value.mail,
        password:action.value.password,
        userId:action.value.id
      };
      return nextState;
      break;
    case 'TOGGLE_DECONNECT' :
      nextState={
        token:null,
        mail:state.mail,
        password:state.password,
      };
      return nextState;
      break;
    default:
    return state;
  }
}

export default toggleAuthentication;
