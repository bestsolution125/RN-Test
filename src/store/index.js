import {configureStore} from '@reduxjs/toolkit';
import postsReducer from './slices/post';

export const store = configureStore({
  reducer: {
    posts: postsReducer,
  },
});
