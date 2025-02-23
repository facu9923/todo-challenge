import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Importamos el archivo CSS

const Login = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState(''); // Nuevo estado para el nombre de usuario
  const [password, setPassword] = useState(''); // Nuevo estado para la contraseña
  const [errorMessage, setErrorMessage] = useState(''); // Nuevo estado para el mensaje de error
  const navigate = useNavigate(); // Hook para navegar entre rutas

  // Función para enviar los datos del formulario al backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Limpiar el mensaje de error antes de intentar loguearse
    const data = { username, password };
    try {
      const response = await fetch('http://localhost:8000/api/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Credenciales incorrectas');
      }

      const result = await response.json();
      setIsAuthenticated(true);
      navigate('/');
    } catch (error) {
      setErrorMessage(error.message); // Mostrar el mensaje de error en la UI
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>To Do - List Challenge</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="login-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
        />
        {errorMessage && <p className="error-message">{errorMessage}</p>}{' '}
        {/* Muestra el error si existe */}
        <div className="login-button-container">
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
