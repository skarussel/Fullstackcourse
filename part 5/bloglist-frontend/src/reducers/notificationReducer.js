import { createSlice } from "@reduxjs/toolkit";

const initialState = null;
const notificationSlice = createSlice({
  name: "notifiction",
  initialState,
  reducers: {
    set(state = initialState, action) {
      console.log(action.payload);
      return action.payload;
    },
    remove(state) {
      return "";
    },
  },
});
export const { set, remove } = notificationSlice.actions;

export const setNotification = (
  message,
  notificationType = "info",
  time = 2
) => {
  return async (dispatch) => {
    dispatch(set({message, notificationType}));
    setTimeout(() => dispatch(remove()), time * 1000);
  };
};

export default notificationSlice.reducer;
