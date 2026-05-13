// src/services/animalsApi.js
// НОВЫЙ ФАЙЛ — сервис для работы с json-server API

const BASE_URL = 'http://localhost:5000'; // Убедись, что json-server запущен на этом порту

// GET — получить всех животных
export const fetchAnimalsApi = async () => {
  const response = await fetch(`${BASE_URL}/animals`);
  if (!response.ok) throw new Error('Ошибка загрузки животных');
  return response.json();
};

// GET — получить одно животное по id
export const fetchAnimalByIdApi = async (id) => {
  const response = await fetch(`${BASE_URL}/animals/${id}`);
  if (!response.ok) throw new Error('Животное не найдено');
  return response.json();
};

// POST — добавить животное
export const createAnimalApi = async (animal) => {
  const response = await fetch(`${BASE_URL}/animals`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(animal),
  });
  if (!response.ok) throw new Error('Ошибка добавления');
  return response.json();
};

// PUT — обновить животное
export const updateAnimalApi = async (animal) => {
  const response = await fetch(`${BASE_URL}/animals/${animal.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(animal),
  });
  if (!response.ok) throw new Error('Ошибка обновления');
  return response.json();
};

// DELETE — удалить животное
export const deleteAnimalApi = async (id) => {
  const response = await fetch(`${BASE_URL}/animals/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Ошибка удаления');
  return id;
};