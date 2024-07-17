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

  interface Form {
    email:string,
    password:string
}
  const userContext = useContext(UserContext);
  const navigate = useNavigate()

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    console.log(storedUser);
    console.log(userContext?.state);
    if (storedUser && userContext) {
      userContext.dispatch({ type: 'SET_USERDATA', payload: JSON.parse(storedUser) });
    }
    console.log(userContext?.state);
  }, [userContext]);

  const loginUser = (formData: Form) => {
    const existsUser = users.find(
      (user) => user.email === formData.email && user.pass === formData.password
    );
    console.log(existsUser);
    if (existsUser) {
      const { email, pass, name } = existsUser;
      if (userContext) {
        userContext.dispatch({ type: 'SET_USERDATA', payload: { email, pass, name } });
        localStorage.setItem('user', JSON.stringify({ email, pass, name }));
        localStorage.setItem("isLogged", "true");
        navigate('/home');
      }
    }else {
      if (userContext) {
        userContext.dispatch({ type: 'LOGOUT' });
      }
    }
  };

  return (
    <Routes>
      <Route path="/login" element={userContext?.state.user.autenticado ? <Navigate to="/" /> : <Login loginUser={loginUser} />} />
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
