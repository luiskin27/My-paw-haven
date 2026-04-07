// src/features/animals/animalsSlice.js
import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  animals: [
    {
      id: '1',
      name: "Барсик",
      breed: "Мейн-кун",
      age: 3,
      gender: "М",
      bio: "Очень ласковый и игривый кот. Любит сидеть на руках и мурлыкать.",
      image: "https://source.unsplash.com/random/300x300/?mainecoon",
      status: "Ищет дом"
    },
    {
      id: '2',
      name: "Рекс",
      breed: "Лабрадор",
      age: 2,
      gender: "М",
      bio: "Умный и дружелюбный пёс. Хорошо ладит с детьми и другими животными.",
      image: "https://source.unsplash.com/random/300x300/?labrador",
      status: "Ищет дом"
    },
    {
      id: '3',
      name: "Мурка",
      breed: "Британская короткошёрстная",
      age: 4,
      gender: "Ж",
      bio: "Спокойная и нежная кошечка. Ищет тихий дом с мягким диваном.",
      image: "https://source.unsplash.com/random/300x300/?britishcat",
      status: "Ищет дом"
    }
  ]
};

const animalsSlice = createSlice({
  name: 'animals',
  initialState,
  reducers: {
    // CREATE
    addAnimal: (state, action) => {
      state.animals.push({
        id: nanoid(),
        ...action.payload
      });
    },
    
    // UPDATE
    updateAnimal: (state, action) => {
      const index = state.animals.findIndex(animal => animal.id === action.payload.id);
      if (index !== -1) {
        state.animals[index] = { ...state.animals[index], ...action.payload };
      }
    },

    // DELETE
    deleteAnimal: (state, action) => {
      state.animals = state.animals.filter(animal => animal.id !== action.payload);
    }
  }
});

export const { addAnimal, updateAnimal, deleteAnimal } = animalsSlice.actions;
export default animalsSlice.reducer;