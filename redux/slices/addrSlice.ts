import { createSlice } from '@reduxjs/toolkit';

const addrSlice = createSlice({
	name: 'myAddress',

	initialState: {
		myAddress: '',
	},

	reducers: {
		changeAddr: (state, action) => {
			state.myAddress = action.payload;
		},
	},
});

// Action creators are generated for each case reducer function
export const { changeAddr } = addrSlice.actions;
// this reducer will be passed in store's 'reducer' key
export default addrSlice.reducer;
