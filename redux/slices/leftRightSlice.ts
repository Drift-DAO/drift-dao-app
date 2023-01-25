import { createSlice } from '@reduxjs/toolkit';

const leftRightSlice = createSlice({
	name: 'leftRightSlice',

	initialState: {
		leftSide: 'home',
		dao_id:'',
        rightSide:'announcement'
	},

	reducers: {
		changeLeftSide: (state, action) => {
			state.leftSide = action.payload;
		},
		changeDAOId: (state, action) => {
			state.dao_id = action.payload;
		},

		changeRightSide: (state, action) => {
			state.rightSide = action.payload;
		},
	},
});

// Action creators are generated for each case reducer function
export const { changeLeftSide, changeRightSide, changeDAOId } = leftRightSlice.actions;
// this reducer will be passed in store's 'reducer' key
export default leftRightSlice.reducer;
