/* eslint-disable prettier/prettier */
import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import customerDetailService from '@/services/customer-detail/customer-detail';

export const getCompanies = createAsyncThunk(
  'customer-detail/getCompany',
  async (params, { dispatch, getState }) => {
    const response: any = await customerDetailService.getCompany({
      page: 1,
      size: 10,
    });
    const data = await response.data;

    return data;
  }
);

export const getCustomerById = createAsyncThunk(
    'customer-detail/getCustomerById',
    async (params, { dispatch, getState }) => {
      const response: any = await customerDetailService.getCustomerById({
        customerId: params,
        page: 1,
        size: 10,
      });

      const data = await response.data;
  
      return data;
    }
  );

const customerDetailSlice = createSlice({
  name: 'customers/customer-detail',
  initialState: {
    company: null,
    data: null,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCompanies.pending, (state) => {
        state.company = null;
        state.loading = true;
      })
      .addCase(getCompanies.fulfilled, (state, action) => {
        state.company = action.payload.companies;
        state.loading = false;
      })
      .addCase(getCompanies.rejected, (state) => {
        state.company = null;
        state.loading = false;
      })
      .addCase(getCustomerById.pending, (state) => {
        state.data = null;
        state.loading = true;
      })
      .addCase(getCustomerById.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(getCustomerById.rejected, (state) => {
        state.data = null;
        state.loading = false;
      });
  },
});

export const selectCustomer = ({ customerDetail }) => customerDetail?.customerDetail?.data;

export default customerDetailSlice.reducer;
