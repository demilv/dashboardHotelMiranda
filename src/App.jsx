import React, { useEffect, useContext } from "react";
import { Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login/Login.jsx';
import Dashboard from './pages/Dashboard/Dashboard.jsx';
import Home from "./pages/Home/Home.jsx";
import Room from "./pages/Room/Room.jsx";
import Booking from "./pages/Bookings/Booking.jsx";
import Concierge from "./pages/Concierge/Concierge.jsx";
import AddUser from "./pages/Concierge/addUser.jsx";
import AddRoom from "./pages/Room/AddRoom.jsx";
import EditRoom from "./pages/Room/EditRoom.jsx";
import CheckRoom from "./pages/Room/CheckRoom.jsx";
import users from "./data/conciergeData.json";
import EditUserOnContext from "./pages/Dashboard/editUserOnContext.jsx";
import EditUser from "./pages/Concierge/editUser.jsx";
import CheckUser from "./pages/Concierge/CheckUser.jsx";
import EditDocumentBooking from "./pages/Bookings/editDocumentBooking.jsx";
import { UserContext } from './context/userContext.jsx'; 
import Reviews from "./pages/Reviews/Reviews.jsx";
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
        <Route path="/checkUser/:userId" element={<CheckUser />} />
        <Route path="/addRoom" element={<AddRoom />} />
        <Route path="/editRoom/:roomId" element={<EditRoom />} />
        <Route path="/checkRoom/:roomId" element={<CheckRoom />} />
        <Route path="/editUserOnContext" element={<EditUserOnContext />} />
      </Route>
    </Routes>
  );
}

export default App;
