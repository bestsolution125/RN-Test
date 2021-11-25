import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import Api from '../../Api';

export const fetchAllPosts = createAsyncThunk(
  'posts/fetchAllPosts',
  async (params, {getState, requestId, dispatch}) => {
    const {currentRequestId, loading} = getState().posts;
    if (loading !== 'pending' || requestId !== currentRequestId) {
      return;
    }
    if (params._start === 0) {
      dispatch(clearPosts());
    }
    const response = await Api().posts.fetchAll(params);
    return response.data;
  },
);

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    entities: [],
    loading: 'idle',
    currentRequestId: undefined,
    error: null,
  },
  reducers: {
    clearPosts(state) {
      state.entities = [];
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchAllPosts.pending, (state, action) => {
        if (state.loading === 'idle') {
          state.loading = 'pending';
          state.currentRequestId = action.meta.requestId;
        }
      })
      .addCase(fetchAllPosts.fulfilled, (state, action) => {
        const {requestId} = action.meta;
        if (
          state.loading === 'pending' &&
          state.currentRequestId === requestId
        ) {
          state.loading = 'idle';
          state.entities = [...state.entities, ...action.payload];
          state.currentRequestId = undefined;
        }
      })
      .addCase(fetchAllPosts.rejected, (state, action) => {
        const {requestId} = action.meta;
        if (
          state.loading === 'pending' &&
          state.currentRequestId === requestId
        ) {
          state.loading = 'idle';
          state.error = action.error;
          state.currentRequestId = undefined;
        }
      });
  },
});

const {clearPosts} = postsSlice.actions;

export default postsSlice.reducer;
