import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../../context/userContext";
import { Outlet, useNavigate } from "react-router-dom";
import { CiMail, CiBellOn } from "react-icons/ci";
import { RxHamburgerMenu } from "react-icons/rx";
import { GiCancel, GiExitDoor } from "react-icons/gi";
import { ButtonAside } from "../../../styledComponents/StyledButton";
import './Dashboard.css';

const Dashboard = () => {
  const [isAsideVisible, setIsAsideVisible] = useState(false);
  const [active, setActive] = useState("");
  const { state, dispatch } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Esto es el contxt en Dashboard:', state);
  }, [state]);

  const toggleAside = () => {
    setIsAsideVisible(!isAsideVisible);
  };

  const logoutUser = () => {
    dispatch({ type: 'LOGOUT' });
    localStorage.removeItem('user');
    localStorage.setItem("isLogged", "false");
    navigate('/login');
  };

  return (
    <>
      <section className="navbarContainer">
        <div className="navbar">
          <div className={`navbar__aside ${isAsideVisible ? 'visible' : ''}`}>
            <img className="navbar__aside__logo" src="../../../public/logoDash.png" alt="Logo"/>
            <ButtonAside className="noShow" active={active === "Dashboard"} onClick={() => {setActive("Dashboard"); navigate('/home')}}>Dashboard</ButtonAside>
            <ButtonAside className="noShow" active={active === "Room"} onClick={() => {setActive("Room"); navigate('/room')}}>Room</ButtonAside>
            <ButtonAside className="noShow" active={active === "Bookings"} onClick={() => {setActive("Bookings"); navigate('/booking')}}>Bookings</ButtonAside>
            <ButtonAside className="noShow" active={active === "Contact"} onClick={() => {setActive("Contact"); navigate('/reviews')}}>Contact</ButtonAside>
            <ButtonAside className="noShow" active={active === "Concierge"} onClick={() => {setActive("Concierge"); navigate('/concierge')}}>Concierge</ButtonAside>
            <img className="navbar__aside__img" src="../../../public/IMG_20191223_131827 (2) Grande.jpg" alt="Profile"/>
            <div className="navbar__aside__myData">
              <h3 className="myData__name">{state.user.name}</h3>
              <h5 className="myData__mail">{state.user.email}</h5>
              <button onClick={() => navigate('/editUserOnContext')} className="myData__contact">Modify data</button>
            </div>
            <h2 className="navbar__aside__h2">Travi Hotel Admin Dashboard</h2>
            <h6 className="navbar__aside__h6">@ 2024 All Rights Reserved</h6>
            <h6 className="navbar__aside__h6">Made with &hearts; by Gonzalo</h6>
          </div>
          <div className="navbar__main">
            <button className="navbar__burger" onClick={toggleAside}>
              {isAsideVisible ? <GiCancel /> : <RxHamburgerMenu />}
            </button>
            <h1 className="navbar__h1">Dashboard</h1>
            <CiMail className="navbar__icon"/>
            <CiBellOn className="navbar__icon"/>
            <GiExitDoor className="navbar__icon" onClick={logoutUser}/>
          </div>
        </div>
        <div className="outletContainer">
          <Outlet />
        </div>
      </section>
    </>
  );
}

export default Dashboard;

