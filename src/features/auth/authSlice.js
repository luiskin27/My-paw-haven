// src/features/auth/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// ФЕЙКОВАЯ регистрация и логин (для тестирования)
export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    // Имитируем задержку сервера
    await new Promise(resolve => setTimeout(resolve, 800));

    // Простая проверка
    if (!userData.email || !userData.password || userData.password.length < 6) {
      return rejectWithValue('Проверьте email и пароль (минимум 6 символов)');
    }

    // Возвращаем "успех"
    return {
      message: 'Регистрация успешна',
      user: { name: userData.name, email: userData.email }
    };
  }
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    await new Promise(resolve => setTimeout(resolve, 700));

    // Простая проверка логина и пароля
    if (!email || !password) {
      return rejectWithValue('Введите email и пароль');
    }

    // Для теста: любой email + пароль длиной >= 6 считается верным
    const fakeUser = { 
      id: 1, 
      name: email.split('@')[0], 
      email 
    };
    const fakeToken = 'fake-jwt-token-' + Date.now();

    localStorage.setItem('token', fakeToken);

    return { user: fakeUser, token: fakeToken };
  }
);

export const checkAuth = createAsyncThunk(
  'auth/checkAuth',
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem('token');
    if (!token) return rejectWithValue('No token');

    // Имитируем проверку
    await new Promise(resolve => setTimeout(resolve, 400));
    return { id: 1, name: 'Тестовый пользователь', email: 'test@example.com' };
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: localStorage.getItem('token') || null,
    isAuthenticated: false,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
    },
    clearError: (state) => { state.error = null; },
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(registerUser.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Login
      .addCase(loginUser.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Check Auth
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;