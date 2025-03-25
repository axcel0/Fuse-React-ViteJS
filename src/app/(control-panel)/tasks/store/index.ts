import tasks from '@/store/slices/taskSlice'
import { combineReducers } from '@reduxjs/toolkit';

const reducer = combineReducers({
    tasks 
});

export default reducer;
