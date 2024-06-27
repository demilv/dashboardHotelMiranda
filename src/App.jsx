import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import Login from '../components/Login/Login.jsx';
import Dashboard from '../components/Dashboard/Dashboard.jsx';
import Home from "../components/Home/Home.jsx";

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

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const loginUser = (formData) => {
    const existsUser = usuarios.find(
      (user) =>
        user.email === formData.email && user.password === formData.password
    );
    if (existsUser) {
      setUser(existsUser);
      setLoginError('');
      localStorage.setItem('user', JSON.stringify(existsUser));
      navigate('/');
    } else {
      setUser(false);
      setLoginError('Usuario o contraseña incorrecta');
    }
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/login');
  };

  const goHome = () => {
    navigate('/home');
  };

  /*const attempt2 = () => {
    navigate('/prueba2');
  };*/

  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to="/" /> : <Login user={user} loginUser={loginUser} loginError={loginError} />} />
      <Route path="/" element={user ? <Dashboard logoutUser={logoutUser} goHome={goHome} /> : <Navigate to="/login" />}>
        <Route path="/home" element={<Home />} />
        <Route path="prueba2" element={<Prueba2 />} />
      </Route>
    </Routes>
  );
}

export default App;
