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

    return response;
  }
);

export const addNewCustomer = createAsyncThunk(
  'customer/addNewCustomer',
  async (data, { dispatch, getState }) => {
    const response: any = await customerService.addNewCustomer({
      data,
    });

    return response;
  }
);

export const deleteCustomer = createAsyncThunk(
  'customer/deleteCustomer',
  async (params: any, { dispatch, getState }) => {
    const response: any = await customerService.deleteCustomer({
      customerId: params,
    });

    return response;
  }
);

export const updateCustomer = createAsyncThunk(
  'customer/updateCustomer',
  async (params: any, { dispatch, getState }) => {
    const response: any = await customerService.updateCustomer({
      customer: params,
      customerId: params.id,
    });

    return response;
  }
);

export const searchCustomerByName = createAsyncThunk(
  'customer/searchCustomerByName',
  async (params: any, { dispatch, getState }) => {
    const response: any = await customerService.searchCustomerByName({
      customerName: params,
    });

    return response;
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
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(getCustomers.rejected, (state) => {
        state.data = null;
        state.loading = false;
      })
      .addCase(addNewCustomer.pending, (state) => {
        state.customer = null;
        state.loading = true;
      })
      .addCase(addNewCustomer.fulfilled, (state, action) => {
        state.customer = action.payload;
        state.loading = false;

        if (state.data) {
          state.data.push(action.payload); 
        } else {
          state.data = [action.payload];
        }
      })
      .addCase(addNewCustomer.rejected, (state) => {
        state.customer = null;
        state.loading = false;
      })
      .addCase(deleteCustomer.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCustomer.fulfilled, (state, action) => {
        state.customer = action.payload;
        state.loading = false;

        if (state.data) {
          state.data = state.data.filter(
            (customer) => customer.id !== action.payload.id
          );
        }
      })
      .addCase(deleteCustomer.rejected, (state) => {
        state.loading = false;
      })
      .addCase(updateCustomer.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCustomer.fulfilled, (state, action) => {
        state.customer = action.payload;
        state.loading = false;

        if (state.data) {
          const index = state.data.findIndex(
            (customer) => customer.id === action.payload.id
          );

          if (index !== -1) {
            state.data[index] = action.payload;
          }
        }
      })
      .addCase(updateCustomer.rejected, (state) => {
        state.loading = false;
      })
      .addCase(searchCustomerByName.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchCustomerByName.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(searchCustomerByName.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const selectCustomer = ({ customer }) => customer?.customers?.data;

export default customerSlice.reducer;
