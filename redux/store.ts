import { configureStore } from '@reduxjs/toolkit';
import addrReducer from './slices/addrSlice';
import leftRightReducer from './slices/leftRightSlice';
import chatRoomReducer from './slices/chatRoomSlice';
import refreshPageReducer from './slices/refreshPageSlice';

const store = configureStore({
	reducer: {
		addr: addrReducer,
		leftRight: leftRightReducer,
		inputValue: chatRoomReducer,
		refreshPage: refreshPageReducer,
	},
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch