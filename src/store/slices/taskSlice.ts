import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import taskService from '@/services/task/taskService';

export const getTasks = createAsyncThunk(
  'task/getTask',
  async (params, { dispatch, getState }) => {
    const response : any = await taskService.getTasks({page: 1, size  : 10});
    const data = await response.data;

    return data;
  }
);

const taskSlice = createSlice({
  name: 'tasks/task',
  initialState: {
    data: null,
    loading: false
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTasks.pending, (state) => {
        state.data = null;
        state.loading = true;
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        state.data = action.payload.content;
        state.loading = false;
      })
      .addCase(getTasks.rejected, (state) => {
        state.data = null;
        state.loading = false;
      });
  }
});

export const selectTask = ({ task }) => task?.tasks?.data;

export default taskSlice.reducer;
