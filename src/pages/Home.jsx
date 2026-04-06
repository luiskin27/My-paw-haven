// src/pages/Home.jsx
const Home = () => {
  return (
    <div style={{ padding: "40px", textAlign: "center", minHeight: "80vh" }}>
      <h1>🐶 Добро пожаловать в приют "Лапа Добра" 🐱</h1>
      <p style={{ fontSize: "20px", marginTop: "20px" }}>
        Здесь мы помогаем бездомным собакам и кошкам найти свой дом
      </p>
      <p style={{ marginTop: "30px" }}>
        <a href="/login" style={{ fontSize: "18px", color: "#e76f51" }}>
          Войти в аккаунт
        </a>
      </p>
    </div>
  );
};

export default Home;