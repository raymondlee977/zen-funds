import { configureStore } from "@reduxjs/toolkit";
import accountGroupsReducer from './slices/accountGroupsSlice.js';

export const store = configureStore({
  reducer: {
    accountGroups: accountGroupsReducer,
  }
})