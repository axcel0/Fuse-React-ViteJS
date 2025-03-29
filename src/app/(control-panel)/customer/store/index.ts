import customers from '@/store/slices/customerSlice';
import { combineReducers } from '@reduxjs/toolkit';

const reducer = combineReducers({
	customers
});

export default reducer;
