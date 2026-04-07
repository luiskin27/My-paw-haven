// src/pages/AddAnimal.jsx
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addAnimal } from '../features/animals/animalsSlice';
import { useNavigate } from 'react-router-dom';
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
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.breed || !formData.bio) {
      alert("Пожалуйста, заполните обязательные поля (Имя, Порода, Био)");
      return;
    }

    dispatch(addAnimal(formData));
    alert("Животное успешно добавлено в приют! 🐾");
    navigate('/animals');   // перейдёт на список животных
  };

  return (
    <div className="add-animal-page">
      <div className="form-container">
        <h1>🐾 Добавить новое животное</h1>
        <p>Заполните информацию о питомце</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Имя животного *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Например: Барсик"
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
              placeholder="Мейн-кун / Лабрадор и т.д."
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
                placeholder="2"
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
            <label>Фото (URL)</label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://... (можно оставить пустым)"
            />
          </div>

          <div className="form-group">
            <label>Описание / Био *</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows="5"
              placeholder="Расскажите характер, привычки, что любит животное..."
              required
            />
          </div>

          <button type="submit" className="submit-btn">
            Добавить в приют
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddAnimal;