import { createSlice } from "@reduxjs/toolkit";

const chatRoomSlice = createSlice({
  name: "chatRoomSlice",

  initialState: {
    inputVal: "",
  },

  reducers: {
    changeinputVal: (state, action) => {
      state.inputVal = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeinputVal } = chatRoomSlice.actions;
// this reducer will be passed in store's 'reducer' key
export default chatRoomSlice.reducer;
