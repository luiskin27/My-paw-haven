// src/components/Header.jsx
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import { Link } from 'react-router-dom';
import '../styles/header.css';

const Header = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="main-header">
      <div className="header-container">
        <div className="logo-container">
          <img 
            src="https://yesgooddog.co.uk/wp-content/uploads/2020/06/yes-good-dog-paw-print-icon.png" 
            alt="Приют Лапа Добра" 
            className="logo"
          />
          <div className="logo-text">
            <h1>Лапа Добра</h1>
            <p>Приют для собак и кошек</p>
          </div>
        </div>

        <nav className="nav-menu">
          <Link to="/">Главная</Link>
          <Link to="/purchase">Усыновить</Link>
          
          {isAuthenticated ? (
            <div className="user-info">
              <span>👋 {user?.name}</span>
              <button onClick={handleLogout} className="logout-btn">Выйти</button>
            </div>
          ) : (
            <div className="auth-links">
              <Link to="/login">Войти</Link>
              <Link to="/register" className="register-link">Регистрация</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;