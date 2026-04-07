// src/pages/AnimalsList.jsx
import { useSelector } from 'react-redux';
import AnimalCard from '../components/AnimalCard';
import { Link } from 'react-router-dom';
import '../styles/animals.css';   // создадим этот файл

const AnimalsList = () => {
  const { animals } = useSelector((state) => state.animals);

  return (
    <div className="animals-page">
      <div className="page-header">
        <h1>🐾 Наши животные</h1>
        <p>Найдите себе верного друга</p>
        
        <Link to="/add-animal" className="add-button">
          + Добавить новое животное
        </Link>
      </div>

      <div className="animals-grid">
        {animals.length > 0 ? (
          animals.map((animal) => (
            <AnimalCard key={animal.id} animal={animal} />
          ))
        ) : (
          <p>Пока нет животных в приюте 😔</p>
        )}
      </div>
    </div>
  );
};

export default AnimalsList;