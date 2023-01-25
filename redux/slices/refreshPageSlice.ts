import { createSlice } from '@reduxjs/toolkit';

const refreshPageSlice = createSlice({
	name: 'refreshPageSlice',

	initialState: {
		value: 0,
	},

	reducers: {
		changeValue: (state) => {
			state.value = 1 - state.value;
		},
	},
});

// Action creators are generated for each case reducer function
export const { changeValue } = refreshPageSlice.actions;
// this reducer will be passed in store's 'reducer' key
export default refreshPageSlice.reducer;
