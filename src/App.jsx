import React, { useEffect, useContext } from "react";
import { Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/pages/Login/Login.jsx';
import Dashboard from './components/pages/Dashboard/Dashboard.jsx';
import Home from "./components/pages/Home/Home.jsx";
import Room from "./components/pages/Room/Room.jsx";
import Booking from "./components/pages/Bookings/Booking.jsx";
import Concierge from "./components/pages/Concierge/Concierge.jsx";
import AddUser from "./components/pages/Concierge/addUser.jsx";
import AddRoom from "./components/pages/Room/AddRoom.jsx";
import EditRoom from "./components/pages/Room/EditRoom.jsx";
import users from "./data/conciergeData.json";
import EditUserOnContext from "./components/pages/Dashboard/editUserOnContext.jsx";
import EditUser from "./components/pages/Concierge/editUser.jsx";
import EditDocumentBooking from "./components/pages/Bookings/editDocumentBooking.jsx";
import { UserContext } from './context/userContext.jsx'; 
import Reviews from "./components/pages/Reviews/Reviews.jsx";
import { PrivateRoutes } from './AuthProvider/PrivateRoutes';

function App() {
  const { state, dispatch } = useContext(UserContext);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    console.log(storedUser);
    console.log(state);
    if (storedUser) {
      dispatch({ type: 'SET_USERDATA', payload: JSON.parse(storedUser) });
    }
    console.log(state);
  }, [dispatch]);

  const loginUser = (formData) => {
    const existsUser = users.find(
      (user) => user.email === formData.email && user.password === formData.password
    );
    console.log(existsUser);
    if (existsUser) {
      const { email, pass, name } = existsUser;
      dispatch({ type: 'SET_USERDATA', payload: { email, pass, name } });
      localStorage.setItem('user', JSON.stringify({ email, pass, name }));
      localStorage.setItem("isLogged", "true");
      navigate('/');
    } else {
      dispatch({ type: 'LOGOUT' });
      alert('Usuario o contraseña incorrecta');
    }
  };

  return (
    <Routes>
      <Route path="/login" element={state.user.autenticado ? <Navigate to="/" /> : <Login loginUser={loginUser} />} />
      <Route path="/" element={
        <PrivateRoutes>
          <Dashboard />
        </PrivateRoutes>
      }>
        <Route path="/home" element={<Home />} />
        <Route path="/room" element={<Room />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/editBooking/:bookingId" element={<EditDocumentBooking />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/concierge" element={<Concierge />} />
        <Route path="/addUser" element={<AddUser />} />
        <Route path="/editUser/:userId" element={<EditUser />} />
        <Route path="/addRoom" element={<AddRoom />} />
        <Route path="/editRoom/:roomId" element={<EditRoom />} />
        <Route path="/editUserOnContext" element={<EditUserOnContext />} />
      </Route>
    </Routes>
  );
}

export default App;
