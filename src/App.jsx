import React, { useState, useEffect, useContext } from "react";
import { Route, Routes, useNavigate, Navigate, BrowserRouter } from 'react-router-dom';
import Login from '../components/Login/Login.jsx';
import Dashboard from '../components/Dashboard/Dashboard.jsx';
import Home from "../components/Home/Home.jsx";
import Room from "../components/Room/Room.jsx";
import Booking from "../components/Bookings/Booking.jsx";
import Reviews from "../components/Reviews/Reviews.jsx";
import Concierge from "../components/Concierge/Concierge.jsx";
import AddUser from "../components/Concierge/addUser.jsx";
import AddRoom from "../components/Room/AddRoom.jsx";
import users from "../data/conciergeData.json"
import { UserContext } from '../context/userContext.jsx'; 


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
    console.log('State actualizado:', state);
  }, [state]);

  const loginUser = (formData) => {
    const existsUser = users.find(
      (user) => user.email === formData.email && user.password === formData.password
    );
    console.log(existsUser)
    if (existsUser) {
      const {email, pass} = existsUser;
      console.log({email, pass})
      dispatch({ type: 'SET_USERDATA', payload: {email, pass} });
      localStorage.setItem('user', JSON.stringify({email, pass}));
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

  return (
    <Routes>
      <Route path="/login" element={state.user.autenticado ? <Navigate to="/" /> : <Login loginUser={loginUser} />} />
      <Route path="/" element={state.user.autenticado ? <Dashboard logoutUser={logoutUser} goHome={goHome} goRoom={goRoom} goBooking={goBooking} goReviews={goReviews} goConcierge={goConcierge}/> : <Navigate to="/login" />}>
        <Route path="/home" element={<Home />} />
        <Route path="/room" element={<Room />} />
        <Route path="/booking" element={<Booking/>} />
        <Route path="/reviews" element={<Reviews/>} />
        <Route path="/concierge" element={<Concierge/>} />
        <Route path="/addUser" element={<AddUser/>}/>
        <Route path="/addRoom" element={<AddRoom/>}/>
      </Route>
    </Routes>
  );
}

export default App;
