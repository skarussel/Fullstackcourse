import { createSlice } from '@reduxjs/toolkit'

const initialState = ''
const notificationSlice = createSlice({
  name: 'notifiction',
  initialState,
  reducers: {
    set(state=initialState, action) {
      return action.payload;
    },
    remove(state){
      return ""
    }
  }
})
export const { set, remove } = notificationSlice.actions

export const setNotification = (content, time) => {
  return async dispatch => {
    dispatch(set(content))
    setTimeout(() => dispatch(remove()), time*1000)
  }
}

export default notificationSlice.reducer