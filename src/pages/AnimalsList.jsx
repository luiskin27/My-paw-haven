// src/pages/AnimalsList.jsx
// ВСЕ import ДОЛЖНЫ БЫТЬ В САМОМ НАЧАЛЕ ФАЙЛА!
import { useState, useEffect } from 'react';           // ← import в начале!
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAnimals } from '../features/animals/animalsSlice';
import AnimalCard from '../components/AnimalCard';
import { filterAnimals } from '../utils/filterAnimals';
import '../styles/animals.css';

const AnimalsList = () => {
  const dispatch = useDispatch();
  const { animals, loading, error } = useSelector((state) => state.animals);
  const [searchQuery, setSearchQuery] = useState('');

  // Загружаем животных с сервера при монтировании
  useEffect(() => {
    dispatch(fetchAnimals());
  }, [dispatch]);

  // Отфильтрованный список
  const filteredAnimals = filterAnimals(animals, searchQuery);

  // Loading состояние
  if (loading) return (
    <div style={{ textAlign: 'center', padding: '50px', fontSize: '24px' }}>
      🐾 Загружаем животных...
    </div>
  );

  // Error состояние
  if (error) return (
    <div style={{ textAlign: 'center', padding: '50px', color: 'red' }}>
      <h2>😔 Ошибка загрузки</h2>
      <p>{error}</p>
      <p>Убедись, что json-server запущен: <code>npm run server</code></p>
    </div>
  );

  return (
    <div className="animals-page">
      <div className="page-header">
        <h1>🐾 Наши животные</h1>
        <p>Найдите себе верного друга</p>
        
        {/* Поле поиска */}
        <input
          type="text"
          placeholder="🔍 Поиск по имени, породе..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            padding: '10px 16px',
            fontSize: '16px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            width: '100%',
            maxWidth: '400px',
            margin: '16px 0'
          }}
        />
        
        <Link to="/add-animal" className="add-button">
          + Добавить новое животное
        </Link>
      </div>

      <div className="animals-grid">
        {/* Empty состояние */}
        {animals.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '50px' }}>
            <p>Пока нет животных в приюте 😔</p>
            <Link to="/add-animal">Добавить первое животное</Link>
          </div>
        ) : filteredAnimals.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '50px' }}>
            <p>😔 Ничего не найдено по запросу "{searchQuery}"</p>
          </div>
        ) : (
          filteredAnimals.map((animal) => (
            <AnimalCard key={animal.id} animal={animal} />
          ))
        )}
      </div>
    </div>
  );
};

export default AnimalsList;