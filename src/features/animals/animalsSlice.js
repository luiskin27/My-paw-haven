// src/features/animals/animalsSlice.js
// ИЗМЕНЕНО: убран localStorage, добавлены createAsyncThunk для работы с API
import { createSlice, createAsyncThunk, nanoid } from '@reduxjs/toolkit';
import {
  fetchAnimalsApi,
  createAnimalApi,
  updateAnimalApi,
  deleteAnimalApi,
} from '../../services/animalsApi'; // НОВЫЙ ИМПОРТ из services

// =====================
// ASYNC THUNKS (НОВЫЕ)
// =====================

// GET — загрузить всех животных с сервера
export const fetchAnimals = createAsyncThunk(
  'animals/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      return await fetchAnimalsApi();
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

// POST — добавить животное на сервер
export const addAnimalAsync = createAsyncThunk(
  'animals/addOne',
  async (animalData, { rejectWithValue }) => {
    try {
      const newAnimal = {
        ...animalData,
        id: nanoid(),
        likes: 0,
        rating: [],
        isFavorite: false,
      };
      return await createAnimalApi(newAnimal);
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

// PUT — обновить животное на сервере
export const updateAnimalAsync = createAsyncThunk(
  'animals/updateOne',
  async (animalData, { rejectWithValue }) => {
    try {
      return await updateAnimalApi(animalData);
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

// DELETE — удалить животное с сервера
export const deleteAnimalAsync = createAsyncThunk(
  'animals/deleteOne',
  async (id, { rejectWithValue }) => {
    try {
      return await deleteAnimalApi(id);
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

// =====================
// SLICE
// =====================

const animalsSlice = createSlice({
  name: 'animals',
  // ИЗМЕНЕНО: убран loadFromLocalStorage, теперь данные приходят с сервера
  initialState: {
    animals: [],
    loading: false,  // НОВОЕ: для loading state
    error: null,     // НОВОЕ: для error state
  },
  reducers: {
    // Эти действия работают локально (без запроса к серверу)
    // НОВОЕ: toggleLike теперь только локально меняет UI
    toggleLike: (state, action) => {
      const animal = state.animals.find(a => a.id === action.payload);
      if (animal) animal.likes += 1;
    },
    toggleFavorite: (state, action) => {
      const animal = state.animals.find(a => a.id === action.payload);
      if (animal) animal.isFavorite = !animal.isFavorite;
    },
    addRating: (state, action) => {
      const { id, ratingValue } = action.payload;
      const animal = state.animals.find(a => a.id === id);
      if (animal) animal.rating.push(ratingValue);
    },
    // НОВОЕ: сбросить ошибку
    clearError: (state) => { state.error = null; },
  },
  // НОВОЕ: обработка async thunk состояний
  extraReducers: (builder) => {
    builder
      // --- fetchAnimals ---
      .addCase(fetchAnimals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAnimals.fulfilled, (state, action) => {
        state.loading = false;
        state.animals = action.payload;
      })
      .addCase(fetchAnimals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // --- addAnimalAsync ---
      .addCase(addAnimalAsync.pending, (state) => { state.loading = true; })
      .addCase(addAnimalAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.animals.push(action.payload); // НОВОЕ: добавляем в массив
      })
      .addCase(addAnimalAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // --- updateAnimalAsync ---
      .addCase(updateAnimalAsync.fulfilled, (state, action) => {
        const index = state.animals.findIndex(a => a.id === action.payload.id);
        if (index !== -1) state.animals[index] = action.payload;
      })

      // --- deleteAnimalAsync ---
      .addCase(deleteAnimalAsync.fulfilled, (state, action) => {
        // НОВОЕ: фильтруем удалённое животное из массива
        state.animals = state.animals.filter(a => a.id !== action.payload);
      });
  },
});

export const { toggleLike, toggleFavorite, addRating, clearError } = animalsSlice.actions;
export default animalsSlice.reducer;