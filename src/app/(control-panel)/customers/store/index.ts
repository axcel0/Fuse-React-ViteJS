import { combineReducers } from "@reduxjs/toolkit";
import customerSlice from "@/store/slices/customerSlice";

const reducer = combineReducers({
  customer: customerSlice,
});

export default reducer;
