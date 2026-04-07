// src/components/AnimalCard.jsx
import { useDispatch } from 'react-redux';
import { deleteAnimal } from '../features/animals/animalsSlice';
import { Link } from 'react-router-dom';

const AnimalCard = ({ animal }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    if (window.confirm(`Вы уверены, что хотите удалить ${animal.name}?`)) {
      dispatch(deleteAnimal(animal.id));
    }
  };

  return (
    <div className="animal-card">
      <img 
        src={animal.image} 
        alt={animal.name} 
        className="animal-image"
      />
      
      <div className="animal-info">
        <h3>{animal.name}</h3>
        <p className="breed">{animal.breed} • {animal.age} лет</p>
        <p className="gender">{animal.gender === 'М' ? '♂' : '♀'} {animal.gender}</p>
        
        <p className="bio">{animal.bio}</p>
        
        <div className="status">
          <span>{animal.status}</span>
        </div>
      </div>

      <div className="card-actions">
        <Link to={`/animal/${animal.id}`} className="btn-detail">
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