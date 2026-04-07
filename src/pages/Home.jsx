// src/pages/Home.jsx
import { Link } from 'react-router-dom';
import '../styles/home.css';

const Home = () => {
  return (
    <div className="home-page">
      <div className="hero">
        <h1>🐾 Приют «Лапа Добра»</h1>
        <p>Мы помогаем бездомным собакам и кошкам найти любящий дом</p>
        
        <div className="hero-buttons">
          <Link to="/animals" className="btn-primary">
            Посмотреть всех животных
          </Link>
          <Link to="/add-animal" className="btn-secondary">
            + Добавить животное
          </Link>
        </div>
      </div>

      <div className="features">
        <div className="feature-card">
          <h3>❤️ Усыновление</h3>
          <p>Помоги животному найти семью</p>
        </div>
        <div className="feature-card">
          <h3>📋 Наш список</h3>
          <p>Более 20 хвостиков ждут тебя</p>
        </div>
        <div className="feature-card">
          <h3>🔐 Авторизация</h3>
          <p>Только для волонтёров и сотрудников</p>
        </div>
      </div>
    </div>
  );
};

export default Home;