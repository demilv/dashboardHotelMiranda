import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { TbZoom } from "react-icons/tb";
import { IoMdHeartEmpty } from "react-icons/io";
import { CiMail, CiBellOn } from "react-icons/ci";
import { MdOutlineMessage } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";
import { GiCancel } from "react-icons/gi";
import Button, { ButtonProvider } from "../styledComponents/ButtonStyled";
import './Dashboard.css';

const Dashboard = ({ logoutUser, goHome, goRoom }) => {
  const [isAsideVisible, setIsAsideVisible] = useState(false);

  const toggleAside = () => {
    setIsAsideVisible(!isAsideVisible);
  };

  return (
    <>
      <ButtonProvider>
        <section class="navbarContainer">
          <div className="navbar">
            <div className={`navbar__aside ${isAsideVisible ? 'visible' : ''}`}>
              <img className="navbar__aside__logo" src="../../public/logoDash.png" alt="Logo"/>
              <button className="noShow" onClick={goHome}><Button initialColor="white" index={0}>Dashboard</Button></button>
              <button className="noShow" onClick={goRoom}><Button initialColor="white" index={1}>Room</Button></button>
              <Button initialColor="white" index={2}>Bookings</Button>
              <Button initialColor="white" index={3}>Contact</Button>
              <button className="noShow" ><Button initialColor="white" index={4}>Concierge</Button></button>
              <img className="navbar__aside__img" src="../../public/IMG_20191223_131827 (2) Grande.jpg" alt="Profile"/>
              <div className="navbar__aside__myData">
                <h3 className="myData__name">Gonzalo Cano</h3>
                <h5 className="myData__mail">gonzalo.cano.rodriguez93@gmail.com</h5>
                <button className="myData__contact">Contact Us</button>
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
            </div>
          </div>
          <div className="outletContainer">
            <Outlet />
          </div>
        </section>
      </ButtonProvider>
    </>
  );
}

export default Dashboard;

