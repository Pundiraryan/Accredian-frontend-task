import React from "react";
import "./Dashboard.css";
import Navbar from "../Navbar/Navbar";
const Dashboard = (props) => {
  return (
    <div>
      <Navbar />
      <h1>Welcome {props.profile}</h1>
    </div>
  );
};

export default Dashboard;
