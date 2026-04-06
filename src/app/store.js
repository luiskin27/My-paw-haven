// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
// import instrumentsReducer from '../features/instruments/instrumentsSlice'; // пока закомментируем

export const store = configureStore({
  reducer: {
    auth: authReducer,
    // instruments: instrumentsReducer,   // потом добавим
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // чтобы не ругался на токен и т.д.
    }),
});

export default store;