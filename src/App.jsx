import React, { useState, useEffect, useContext } from "react";
import { Route, Routes, useNavigate, Navigate, BrowserRouter } from 'react-router-dom';
import Login from './components/pages/Login/Login.jsx';
import Dashboard from './components/pages/Dashboard/Dashboard.jsx';
import Home from "./components/pages/Home/Home.jsx";
import Room from "./components/pages/Room/Room.jsx";
import Booking from "./components/pages/Bookings/Booking.jsx";
import Concierge from "./components/pages/Concierge/Concierge.jsx";
import AddUser from "./components/pages/Concierge/addUser.jsx";
import AddRoom from "./components/pages/Room/AddRoom.jsx";
import users from "./data/conciergeData.json";
import EditUser from "./components/pages/Dashboard/editUser.jsx";
import { UserContext } from './context/userContext.jsx'; 
import Reviews from "./components/pages/Reviews/Reviews.jsx";


function App() {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(UserContext);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    console.log(storedUser)
    console.log(state)
    if (storedUser) {
      dispatch({ type: 'SET_USERDATA', payload: JSON.parse(storedUser) });
    }
    console.log(state)
  }, [dispatch]);

  useEffect(() => {
    console.log('Esto es el contxt:', state);
  }, [state]);

  const loginUser = (formData) => {
    const existsUser = users.find(
      (user) => user.email === formData.email && user.password === formData.password
    );
    console.log(existsUser)
    if (existsUser) {
      const {email, pass, name} = existsUser;
      dispatch({ type: 'SET_USERDATA', payload: {email, pass, name} });
      localStorage.setItem('user', JSON.stringify({email, pass, name}));
      navigate('/');
    } else {
      dispatch({ type: 'LOGOUT' });
      alert('Usuario o contraseña incorrecta');
    }
  };

  const logoutUser = () => {
    dispatch({ type: 'LOGOUT' });
    localStorage.removeItem('user');
    navigate('/login');
  };

  const goHome = () => {
    navigate('/home');
  };

  const goRoom = () => {
    navigate('/room');
  };

  const goBooking = () => {
    navigate('/booking')
  }

  const goReviews = () =>{
    navigate('/reviews')
  }

  const goConcierge = () =>{
    navigate('/concierge')
  }

  const goEditUser = () =>{
    navigate('/editUser')
  }

  return (
    <Routes>
      <Route path="/login" element={state.user.autenticado ? <Navigate to="/" /> : <Login loginUser={loginUser} />} />
      <Route path="/" element={state.user.autenticado ? <Dashboard logoutUser={logoutUser} goHome={goHome} goRoom={goRoom} goBooking={goBooking} goReviews={goReviews} goConcierge={goConcierge} goEditUser={goEditUser}/>  : <Navigate to="/login" />}>
        <Route path="/home" element={<Home />} />
        <Route path="/room" element={<Room />} />
        <Route path="/booking" element={<Booking/>} />
        <Route path="/reviews" element={<Reviews/>} />
        <Route path="/concierge" element={<Concierge/>} />
        <Route path="/addUser" element={<AddUser/>}/>
        <Route path="/addRoom" element={<AddRoom/>}/>
        <Route path="/editUser" element={<EditUser/>}/>
      </Route>
    </Routes>
  );
}

export default App;
