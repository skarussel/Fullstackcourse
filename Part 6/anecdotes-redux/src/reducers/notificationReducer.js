import { createSlice } from '@reduxjs/toolkit'

const initialState = ''
const notificationSlice = createSlice({
  name: 'notifiction',
  initialState,
  reducers: {
    setNotification(state=initialState, action) {
      return action.payload;
    },
    removeNotification(state){
      return ""
    }
  }
})
export const { setNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer