// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Purchase from "./pages/Purchase.jsx";

import { checkAuth } from "./features/auth/authSlice";

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  // Проверка авторизации при запуске
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (loading) {
    return (
      <div style={{ 
        height: "100vh", 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center",
        fontSize: "28px",
        background: "#fdf6f0",
        color: "#e76f51"
      }}>
        🐾 Загрузка приюта... Пожалуйста, подождите
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Header />
      
      <Routes>
        <Route path="/" element={<Home />} />
        
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        
        {/* Защищённая страница */}
        <Route 
          path="/purchase" 
          element={
            isAuthenticated ? <Purchase /> : <Navigate to="/login" replace />
          } 
        />

        {/* Если адрес неправильный — возвращаем на главную */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      
      <Footer />
    </BrowserRouter>
  );
}

export default App;