// src/pages/AnimalDetail.jsx
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { deleteAnimalAsync } from '../features/animals/animalsSlice';  // ← ИСПРАВЛЕНО!
import '../styles/animalDetail.css';

const AnimalDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const animal = useSelector(state => 
    state.animals.animals.find(a => a.id === id)
  );

  if (!animal) {
    return <h2>Животное не найдено 😔</h2>;
  }

  const handleDelete = () => {
    if (window.confirm(`Удалить ${animal.name}?`)) {
      dispatch(deleteAnimalAsync(animal.id));  // ← ИСПРАВЛЕНО!
      navigate('/animals');
    }
  };

  return (
    <div className="detail-page">
      <div className="detail-container">
        <button onClick={() => navigate('/animals')} className="back-btn">
          ← Назад к списку
        </button>

        <div className="detail-content">
          <img 
            src={animal.image || 'https://via.placeholder.com/600x400?text=Нет+фото'} 
            alt={animal.name}
            className="detail-image"
          />

          <div className="detail-info">
            <h1>{animal.name}</h1>
            <p className="breed-age">{animal.breed} • {animal.age} лет • {animal.gender}</p>
            
            <div className="status-badge">{animal.status}</div>

            <div className="bio-section">
              <h3>О животном:</h3>
              <p>{animal.bio}</p>
            </div>

            <div className="actions">
              <Link to={`/edit/${animal.id}`} className="btn-edit">
                Редактировать
              </Link>
              <button onClick={handleDelete} className="btn-delete">
                Удалить животное
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimalDetail;