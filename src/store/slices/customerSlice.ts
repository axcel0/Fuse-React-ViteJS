/* eslint-disable prettier/prettier */
import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import customerService from '@/services/customer/customerService';

export const getCustomers = createAsyncThunk(
  'customer/getCustomer',
  async (params, { dispatch, getState }) => {
    const response: any = await customerService.getCustomer({
      page: 1,
      size: 10,
    });
    const data = await response.data;

    return data;
  }
);

export const getCustomerById = createAsyncThunk(
    'customer/getCustomerById',
    async (params, { dispatch, getState }) => {
      const response: any = await customerService.getCustomerById({
        customerId: params,
        page: 1,
        size: 10,
      });

      const data = await response.data;
  
      return data;
    }
  );

const customerSlice = createSlice({
  name: 'customers/customer',
  initialState: {
    customer: null,
    data: null,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCustomers.pending, (state) => {
        state.data = null;
        state.loading = true;
      })
      .addCase(getCustomers.fulfilled, (state, action) => {
        state.data = action.payload.content;
        state.loading = false;
      })
      .addCase(getCustomers.rejected, (state) => {
        state.data = null;
        state.loading = false;
      })
      .addCase(getCustomerById.pending, (state) => {
        state.customer = null;
        state.loading = true;
      })
      .addCase(getCustomerById.fulfilled, (state, action) => {
        state.customer = action.payload;
        state.loading = false;
      })
      .addCase(getCustomerById.rejected, (state) => {
        state.customer = null;
        state.loading = false;
      });
  },
});

export const selectCustomer = ({ customer }) => customer?.customers?.data;

export default customerSlice.reducer;
