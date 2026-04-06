export const authMiddleware = (store) => (next) => (action) => {
  
  // Ловим регистрацию
  if (action.type === "auth/register") {
    console.log("Регистрация:", action.payload);
    
    // сохраняем в localStorage (типо база)
    localStorage.setItem("user", JSON.stringify(action.payload));
  }

  // Ловим логин
  if (action.type === "auth/login") {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    
    if (!savedUser || savedUser.email !== action.payload.email) {
      alert("Пользователь не найден!");
      return;
    }

    console.log("Успешный вход");
  }

  return next(action);
};