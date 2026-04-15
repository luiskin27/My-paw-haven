// src/pages/EditAnimal.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateAnimal } from '../features/animals/animalsSlice';
import '../styles/addAnimal.css';

const EditAnimal = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const animal = useSelector(state => 
    state.animals.animals.find(a => a.id === id)
  );

  const [formData, setFormData] = useState({
    name: '',
    breed: '',
    age: '',
    gender: 'М',
    bio: '',
    image: '',
    status: 'Ищет дом'
  });

  useEffect(() => {
    if (animal) {
      setFormData({
        name: animal.name || '',
        breed: animal.breed || '',
        age: animal.age || '',
        gender: animal.gender || 'М',
        bio: animal.bio || '',
        image: animal.image || '',
        status: animal.status || 'Ищет дом'
      });
    }
  }, [animal]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.breed || !formData.bio) {
      alert("Пожалуйста, заполните обязательные поля (Имя, Порода, Био)");
      return;
    }

    dispatch(updateAnimal({ id, ...formData }));
    alert("✅ Изменения сохранены!");
    navigate(`/animal/${id}`);
  };

  if (!animal) {
    return <h2 style={{ textAlign: 'center', padding: '50px' }}>Животное не найдено 😔</h2>;
  }

  return (
    <div className="add-animal-page">
      <div className="form-container">
        <h1>✏️ Редактировать животное</h1>
        <p>Измените данные о <strong>{animal.name}</strong></p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Имя животного *</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Порода *</label>
            <input type="text" name="breed" value={formData.breed} onChange={handleChange} required />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Возраст</label>
              <input type="number" name="age" value={formData.age} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>Пол</label>
              <select name="gender" value={formData.gender} onChange={handleChange}>
                <option value="М">Мужской ♂</option>
                <option value="Ж">Женский ♀</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Ссылка на фото</label>
            <input type="text" name="image" value={formData.image} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Описание / Био *</label>
            <textarea 
              name="bio" 
              value={formData.bio} 
              onChange={handleChange} 
              rows="5" 
              required 
            />
          </div>

          <button type="submit" className="submit-btn">
            Сохранить изменения
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditAnimal;