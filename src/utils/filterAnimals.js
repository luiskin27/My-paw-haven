// src/utils/filterAnimals.js
// НОВЫЙ ФАЙЛ — утилита для фильтрации животных

export const filterAnimals = (animals, searchQuery) => {
  if (!searchQuery.trim()) return animals;
  const query = searchQuery.toLowerCase();
  return animals.filter(animal =>
    animal.name.toLowerCase().includes(query) ||
    animal.breed.toLowerCase().includes(query) ||
    animal.status.toLowerCase().includes(query)
  );
};