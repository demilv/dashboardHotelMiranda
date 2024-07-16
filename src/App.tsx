import React, { useEffect, useContext } from "react";
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import Home from "./pages/Home/Home";
import Room from "./pages/Room/Room";
import Booking from "./pages/Bookings/Booking";
import Concierge from "./pages/Concierge/Concierge";
import AddUser from "./pages/Concierge/addUser";
import AddRoom from "./pages/Room/AddRoom";
import EditRoom from "./pages/Room/EditRoom";
import CheckRoom from "./pages/Room/CheckRoom";
import users from "./data/conciergeData.json";
import EditUserOnContext from "./pages/Dashboard/editUserOnContext";
import EditUser from "./pages/Concierge/editUser";
import CheckUser from "./pages/Concierge/CheckUser";
import EditDocumentBooking from "./pages/Bookings/editDocumentBooking";
import { UserContext } from './context/userContext'; 
import Reviews from "./pages/Reviews/Reviews";
import { PrivateRoutes } from './AuthProvider/PrivateRoutes';

function App() {
  const { state, dispatch } = useContext(UserContext);
  const navigate = useNavigate()

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
      navigate('/home');
    } else {
      dispatch({ type: 'LOGOUT' });
      alert('Prueba con el email kdeveral0@nifty.com y la password 1');
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
