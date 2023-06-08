import React from "react";
import { BsThreeDotsVertical, BsGlobe, BsFillBellFill } from "react-icons/bs";
import ModalLogin from "../../ModalLogout";
import Offcanvs from '../Offcanvs/Offcanvs'
// import { GrNotification } from "react-icons/gr";
const MainLayout = () => {
  return (
    <div className="crud">
      <div class="dropdown">
        <a target="_blank" href="https://godgift.rrtutorials.com/">
          <button class="dropbtn">
            <BsGlobe />
          </button>
        </a>
        <button class="dropbtn">
          <Offcanvs />
          <span style={{ backgroundColor: "yellow", color: "black", borderRadius: "50%", position: "relative", top: "-40px", left: "15px", }}>7</span>
        </button>
      </div>
      <div class="dropdown">
        <button class="dropbtn">
          <BsThreeDotsVertical />
        </button>
        <div class="dropdown-content">
          <a href="#">
            <ModalLogin />
          </a>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
