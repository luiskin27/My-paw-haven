// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';

// Импортируем редьюсеры
import authReducer from '../features/auth/authSlice';
import animalsReducer from '../features/animals/animalsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,      
    animals: animalsReducer, 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;