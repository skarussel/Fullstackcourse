const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  const state_copy  = {...state}
  switch (action.type) {
    case 'GOOD':
      state_copy["good"] +=1
      return state_copy 
    case 'OK':
      state_copy["ok"] +=1
      return state_copy
    case 'BAD':
      state_copy["bad"] +=1
      return state_copy
    case 'ZERO':
      return initialState
    default: return state_copy
  }
  
}

export default counterReducer