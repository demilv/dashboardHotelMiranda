import React from "react";
import { Outlet } from "react-router-dom";
import { TbZoom } from "react-icons/tb";

const Dashboard = ({ logoutUser, attempt, attempt2 }) => {
  return (
    <>
      <h1>Hi!</h1>
      <button onClick={attempt}>Go to Prueba</button>
      <button onClick={attempt2}>Go to Prueba2</button>
      <Outlet />
    </>
  );
}

export default Dashboard;
