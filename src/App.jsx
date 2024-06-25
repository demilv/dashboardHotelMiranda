import React, { useState } from "react";
import { Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import Login from '../components/Login/Login.jsx';
import Dashboard from '../components/Dashboard/Dashboard.jsx';
import Prueba from '../components/Prueba/Prueba.jsx';
import Prueba2 from '../components/Prueba2/Prueba2.jsx'

const usuarios = [
  {
    email: 'a@gmail.com',
    password: 'a',
    name: 'Gonzalo',
    role: 'admin',
  },
  {
    email: 'JoseMaria@gmail.com',
    password: 'bbbbb',
    name: 'Jose',
    role: 'client',
  },
];

function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loginError, setLoginError] = useState('');

  const loginUser = (formData) => {
    const existsUser = usuarios.find(
      (user) =>
        user.email === formData.email && user.password === formData.password
    );
    if (existsUser) {
      setUser(existsUser);
      setLoginError('');
      navigate('/');
    } else {
      setUser(false);
      setLoginError('Usuario o contraseña incorrecta');
    }
  };

  const logoutUser = () => {
    setUser(null);
    navigate('/login');
  };

  const attempt = () => {
    navigate('/prueba');
  };

  const attempt2 = () => {
    navigate('/prueba2');
  };

  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to="/" /> : <Login user={user} loginUser={loginUser} loginError={loginError} />} />
      <Route path="/" element={user ? <Dashboard logoutUser={logoutUser} attempt={attempt} attempt2={attempt2}/> : <Navigate to="/login" />}>
        <Route path="prueba" element={user ? <Prueba /> : <Navigate to="/login" />} />
        <Route path="prueba2" element={user ? <Prueba2 /> : <Navigate to="/login" />} />
      </Route>
    </Routes>
  );
}

export default App;
