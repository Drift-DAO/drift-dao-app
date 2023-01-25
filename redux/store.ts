import { configureStore } from '@reduxjs/toolkit';
import addrReducer from './slices/addrSlice';
import leftRightReducer from './slices/leftRightSlice';
import chatRoomReducer from './slices/chatRoomSlice';
import refreshPageReducer from './slices/refreshPageSlice';

export default configureStore({
	reducer: {
		addr: addrReducer,
		leftRight: leftRightReducer,
		inputValue: chatRoomReducer,
		refreshPage: refreshPageReducer,
	},
});
