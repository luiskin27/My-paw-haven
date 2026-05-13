// src/pages/AddAnimal.jsx
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addAnimalAsync } from '../features/animals/animalsSlice';
import '../styles/addAnimal.css';

const AddAnimal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    breed: '',
    age: '',
    gender: 'М',
    bio: '',
    image: '',
    status: 'Ищет дом'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.breed || !formData.bio) {
      alert("Пожалуйста, заполните обязательные поля");
      return;
    }

    const result = await dispatch(addAnimalAsync(formData));
    if (!result.error) {
      alert("Животное успешно добавлено! 🐾");
      navigate('/animals');
    }
  };

  return (
    <div className="add-animal-page">
      <div className="form-container">
        <h1>🐾 Добавить нового питомца</h1>
        <p>Заполните информацию о животном</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Имя животного *</label>
            <input 
              type="text" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div className="form-group">
            <label>Порода *</label>
            <input 
              type="text" 
              name="breed" 
              value={formData.breed} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Возраст (лет)</label>
              <input 
                type="number" 
                name="age" 
                value={formData.age} 
                onChange={handleChange} 
              />
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
            <label>Ссылка на фото (URL)</label>
            <input 
              type="text" 
              name="image" 
              value={formData.image} 
              onChange={handleChange} 
              placeholder="https://example.com/photo.jpg"
            />
          </div>

          <div className="form-group">
            <label>Описание / Био *</label>
            <textarea 
              name="bio" 
              value={formData.bio} 
              onChange={handleChange} 
              rows="5" 
              required 
              placeholder="Расскажите о характере, привычках и особенностях животного..."
            />
          </div>

          <button type="submit" className="submit-btn">
            🐾 Добавить животное
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddAnimal;