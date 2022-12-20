import { createSlice } from '@reduxjs/toolkit'

const initialState = ''
const notificationSlice = createSlice({
  name: 'notifiction',
  initialState,
  reducers: {
    setFilter(state=initialState, action) {
      return action.payload;
    }
  }
})
export const { setFilter } = notificationSlice.actions
export default notificationSlice.reducer