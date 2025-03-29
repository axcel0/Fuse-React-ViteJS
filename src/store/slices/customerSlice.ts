import { createSlice } from "@reduxjs/toolkit";

export interface customerStateProps {
  data: [];
  leftSidebarOpen: boolean;
  rightSidebarOpen: boolean;
}

const initialState: customerStateProps = {
  data: [],
  leftSidebarOpen: true,
  rightSidebarOpen: true,
};

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    openLeftSideBar: (state) => {
      state.leftSidebarOpen = true;
    },
    closeLeftSidebar: (state) => {
      state.leftSidebarOpen = false;
    },
    openRightSideBar: (state) => {
      state.rightSidebarOpen = true;
    },
    closeRightSidebar: (state) => {
      state.rightSidebarOpen = false;
    },
    isSidebarOpen: (state, action) => {
      state.leftSidebarOpen = action.payload;
      state.rightSidebarOpen = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export const { openLeftSideBar, closeLeftSidebar, openRightSideBar, closeRightSidebar, isSidebarOpen } =
  customerSlice.actions;

export const selectOpenLeftSidebar = ({ customer }) =>
  customer?.customer.leftSidebarOpen;
export const selectOpenRightSidebar = ({ customer }) =>
  customer?.customer.rightSidebarOpen;

export default customerSlice.reducer;
