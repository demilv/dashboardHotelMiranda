import React from "react";
import { Outlet } from "react-router-dom";
import { TbZoom } from "react-icons/tb";
import { IoMdHeartEmpty } from "react-icons/io";
import { CiMail, CiBellOn } from "react-icons/ci";
import { MdOutlineMessage } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";
import Button, { ButtonProvider } from "../styledComponents/ButtonStyled";
import './Dashboard.css'

const Dashboard = ({ logoutUser, attempt, attempt2 }) => {
  return (
    <>
      <ButtonProvider>
        <div className="navbar">
            <div className="navbar__aside">
              <img className="navbar__aside__logo" src="../../public/logoDash.png" alt="Logo"/>
              <Button initialColor="white" index={0}>Dashboard</Button>
              <Button initialColor="white" index={1}>Room</Button>
              <Button initialColor="white" index={2}>Bookings</Button>
              <Button initialColor="white" index={3}>Guest</Button>
              <Button initialColor="white" index={4}>Concierge</Button>
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
              <button className="navbar__burger"><RxHamburgerMenu /></button>
              <h1 className="navbar__h1">Dashboard</h1>        
              <TbZoom className="navbar__icon iconFirst"/>
              <IoMdHeartEmpty className="navbar__icon"/>
              <CiMail className="navbar__icon"/>
              <CiBellOn className="navbar__icon"/>
              <MdOutlineMessage className="navbar__icon"/>
              <img src="../../public/IMG_20191223_131827 (2) Grande.jpg" className="navbarFoto" alt="Profile"/>
            </div>          
        </div>
        <div className="outletContainer">
          <Outlet />
        </div>
      </ButtonProvider>
    </>
  );
}

export default Dashboard;
