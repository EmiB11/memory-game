const initialState = {
    timer : 60
}

const storeReducer = (state = initialState ,action) =>{
  switch(action.type) {
    case 'timer': return {
        ...state,
        timer : action.payload

    }
    default: return state
  }
}

export {initialState}
export default storeReducer