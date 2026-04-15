// src/features/animals/animalsSlice.js
import { createSlice, nanoid } from '@reduxjs/toolkit';

const loadFromLocalStorage = () => {
  try {
    const saved = localStorage.getItem('animals');
    if (saved) {
      const parsed = JSON.parse(saved);
      // Проверка, что данные — массив
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error("Ошибка загрузки из localStorage:", e);
  }

  // Дефолтные животные, если ничего не сохранено или ошибка
  return [
    {
      id: '1',
      name: "Барсик",
      breed: "Мейн-кун",
      age: 3,
      gender: "М",
      bio: "Очень ласковый и игривый кот. Любит сидеть на руках и мурлыкать.",
      image: "https://source.unsplash.com/random/300x300/?mainecoon",
      status: "Ищет дом",
      likes: 12,
      rating: [5, 4, 5],
      isFavorite: false
    },
    {
      id: '2',
      name: "Рекс",
      breed: "Лабрадор",
      age: 2,
      gender: "М",
      bio: "Умный и дружелюбный пёс. Хорошо ладит с детьми.",
      image: "https://source.unsplash.com/random/300x300/?labrador",
      status: "Ищет дом",
      likes: 8,
      rating: [4, 5, 3],
      isFavorite: false
    }
  ];
};

const initialState = {
  animals: loadFromLocalStorage()
};

const saveToLocalStorage = (animals) => {
  try {
    localStorage.setItem('animals', JSON.stringify(animals));
  } catch (e) {
    console.error("Ошибка сохранения в localStorage:", e);
  }
};

const animalsSlice = createSlice({
  name: 'animals',
  initialState,
  reducers: {
    addAnimal: (state, action) => {
      state.animals.push({
        id: nanoid(),
        likes: 0,
        rating: [],
        isFavorite: false,
        ...action.payload
      });
      saveToLocalStorage(state.animals);
    },

    updateAnimal: (state, action) => {
      const index = state.animals.findIndex(a => a.id === action.payload.id);
      if (index !== -1) {
        state.animals[index] = { 
          ...state.animals[index], 
          ...action.payload 
        };
        saveToLocalStorage(state.animals);
      }
    },

    deleteAnimal: (state, action) => {
      state.animals = state.animals.filter(a => a.id !== action.payload);
      saveToLocalStorage(state.animals);
    },

    toggleLike: (state, action) => {
      const animal = state.animals.find(a => a.id === action.payload);
      if (animal) {
        animal.likes += 1;
        saveToLocalStorage(state.animals);
      }
    },

    toggleFavorite: (state, action) => {
      const animal = state.animals.find(a => a.id === action.payload);
      if (animal) {
        animal.isFavorite = !animal.isFavorite;
        saveToLocalStorage(state.animals);
      }
    },

    addRating: (state, action) => {
      const { id, ratingValue } = action.payload;
      const animal = state.animals.find(a => a.id === id);
      if (animal) {
        animal.rating.push(ratingValue);
        saveToLocalStorage(state.animals);
      }
    }
  }
});

export const { 
  addAnimal, 
  updateAnimal, 
  deleteAnimal, 
  toggleLike, 
  toggleFavorite, 
  addRating 
} = animalsSlice.actions;

export default animalsSlice.reducer;