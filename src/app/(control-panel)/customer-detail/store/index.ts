import customerDetail from '@/store/slices/customer-detailSlice';
import { combineReducers } from '@reduxjs/toolkit';

const reducer = combineReducers({
	customerDetail
});

export default reducer;
