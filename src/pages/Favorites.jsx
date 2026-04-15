// src/pages/Favorites.jsx
import { useSelector } from 'react-redux';
import AnimalCard from '../components/AnimalCard';
import { Link } from 'react-router-dom';

const Favorites = () => {
  const favorites = useSelector(state => 
    state.animals.animals.filter(animal => animal.isFavorite)
  );

  return (
    <div className="favorites-page">
      <div className="page-header">
        <h1>⭐ Мои избранные животные</h1>
        <p>Животные, которые понравились вам больше всего</p>
      </div>

      {favorites.length > 0 ? (
        <div className="animals-grid">
          {favorites.map(animal => (
            <AnimalCard key={animal.id} animal={animal} />
          ))}
        </div>
      ) : (
        <div className="empty-favorites">
          <h2>Пока нет избранных животных 😔</h2>
          <p>Добавляйте понравившихся питомцев в избранное на главной странице</p>
          <Link to="/animals" className="btn-primary">Посмотреть всех животных</Link>
        </div>
      )}
    </div>
  );
};

export default Favorites;