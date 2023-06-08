import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { AiFillSetting, AiFillHome, AiOutlineShoppingCart, AiFillFileMarkdown } from "react-icons/ai";
import { MdDashboard } from "react-icons/md";
import { GiTakeMyMoney } from "react-icons/gi";
import { BiCategoryAlt } from 'react-icons/bi'
import { MdOutlineSocialDistance } from "react-icons/md";
import { HiTemplate } from "react-icons/hi";
import "../App.css";
import { useAuthValue } from "../AuthContext";

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const { currentUser } = useAuthValue()

  const menuItem = [
    {
      path: "/dashboard",
      name: "Dashboard",
      icon: <MdDashboard />,
    },

    {
      path: "/products",
      name: "Products Management",
      icon: <HiTemplate />,
    },
    {
      path: "/home",
      name: "Product's Category",
      icon: <BiCategoryAlt />,
    },
    {
      path: "/socially-responsive",
      name: "MarketIng",
      icon: <AiFillFileMarkdown />,
    },
    {
      path: "/contact",
      name: "Order Management",
      icon: <AiOutlineShoppingCart />,
    }, {
      path: "/certification",
      name: "Payment Managment",
      icon: <GiTakeMyMoney />,
    },

    {
      path: "/setting",
      name: "Setting",
      icon: <AiFillSetting />,
    },
  ];
  return (
    <div className="container-fluid">
      <div style={{ width: isOpen ? "260px" : "50px" }} className="sidebar">
        <div className="top_section">
          <p className="admin-text" style={{ display: isOpen ? "block" : "none" }}>
            Admin
          </p>
          <div
            style={{ marginLeft: isOpen ? "120px" : "0px" }}
            className="bars"
          >
            <FaBars onClick={toggle} />
          </div>
        </div>
        <h1 style={{ display: isOpen ? "block" : "none" }} className="logo">
          {/* <img width="100px" src="./img/profile.png" alt="" /> */}
        </h1>
        {menuItem.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className="link"
            activeclassName="active"
          >
            <div className="icon">{item.icon}</div>
            <div
              style={{ display: isOpen ? "block" : "none" }}
              className="link_text"
            >
              {item.name}
            </div>
          </NavLink>
        ))}
      </div>
      <main style={{ width: "100%", height: "100vh", overflow: "scroll" }}>
        {children}
      </main>
    </div>
  );
};

export default Sidebar;
