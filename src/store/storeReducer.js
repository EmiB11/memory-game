const initialState = {
    timer : 120
}

const storeReducer = (state = initialState ,action) =>{
  switch(action.type) {
    case 'timer': return {
        ...state,
        timer : action.payload

    }
    case 'resetTime': return initialState
    
    default: return state
  }
}

export {initialState}
export default storeReducer