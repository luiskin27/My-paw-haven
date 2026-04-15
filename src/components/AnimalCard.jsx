// src/components/AnimalCard.jsx
import { useDispatch, useSelector } from 'react-redux';
import { toggleLike, toggleFavorite, deleteAnimal } from '../features/animals/animalsSlice';
import { Link } from 'react-router-dom';

const AnimalCard = ({ animal }) => {
  const dispatch = useDispatch();

  // Получаем актуальные данные из Redux (это решает проблему с обновлением звёздочки)
  const currentAnimal = useSelector(state => 
    state.animals.animals.find(a => a.id === animal.id)
  ) || animal;

  const handleLike = () => dispatch(toggleLike(animal.id));
  const handleFavorite = () => dispatch(toggleFavorite(animal.id));
  const handleDelete = () => {
    if (window.confirm(`Удалить ${currentAnimal.name}?`)) {
      dispatch(deleteAnimal(animal.id));
    }
  };

  const averageRating = currentAnimal.rating.length 
    ? (currentAnimal.rating.reduce((a, b) => a + b, 0) / currentAnimal.rating.length).toFixed(1) 
    : "—";

  return (
    <div className="animal-card">
      <img src={currentAnimal.image} alt={currentAnimal.name} className="animal-image" />

      <div className="animal-info">
        <h3>{currentAnimal.name}</h3>
        <p className="breed">{currentAnimal.breed} • {currentAnimal.age} лет</p>
        
        <div className="rating">
          ⭐ {averageRating} ({currentAnimal.rating.length} оценок)
        </div>

        <p className="bio">{currentAnimal.bio}</p>
        <div className="status">{currentAnimal.status}</div>
      </div>

      <div className="card-actions">
        <button onClick={handleLike} className="like-btn">
          ❤️ {currentAnimal.likes}
        </button>

        <button 
          onClick={handleFavorite} 
          className={`favorite-btn ${currentAnimal.isFavorite ? 'active' : ''}`}
        >
          {currentAnimal.isFavorite ? '★' : '☆'} Избранное
        </button>

        <Link to={`/animal/${currentAnimal.id}`} className="btn-detail">
          Подробнее
        </Link>

        <button onClick={handleDelete} className="btn-delete">
          Удалить
        </button>
      </div>
    </div>
  );
};

export default AnimalCard;