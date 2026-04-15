// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Purchase from "./pages/Purchase.jsx";

// Новые страницы для животных
import AnimalsList from "./pages/AnimalsList.jsx";
import AddAnimal from "./pages/AddAnimal.jsx";
import AnimalDetail from "./pages/AnimalDetail.jsx";
import Favorites from "./pages/Favorites.jsx";
import { checkAuth } from "./features/auth/authSlice";
import EditAnimal from "./pages/EditAnimal.jsx";
function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (loading) {
    return <div className="loading">🐾 Загрузка приюта...</div>;
  }

  return (
    <BrowserRouter>
      <Header />
      
      <Routes>
        <Route path="/" element={<Home />} />
        
        {/* Авторизация */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Список животных */}
        <Route path="/animals" element={<AnimalsList />} />
        
        {/* Добавление животного */}
        <Route path="/add-animal" element={<AddAnimal />} />

        {/* Детальная страница животного (+10 баллов) */}
        <Route path="/animal/:id" element={<AnimalDetail />} />

        {/* Защищённая страница */}
        <Route 
          path="/purchase" 
          element={isAuthenticated ? <Purchase /> : <Navigate to="/login" replace />} 
        />

        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/edit/:id" element={<EditAnimal />} />
      </Routes>
      
      <Footer />
    </BrowserRouter>
  );
}

export default App;