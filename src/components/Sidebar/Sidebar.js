import React, {  useState } from 'react'
import { FaBars,FaBookReader, FaTh, } from 'react-icons/fa'
import { AiFillHome } from "react-icons/ai";
import { HiTemplate } from "react-icons/hi";
import { ImSpinner10 } from "react-icons/im";
import { MdOutlineContactPhone,MdOutlineProductionQuantityLimits } from "react-icons/md";
import { Link } from 'react-router-dom';
import './Sidebar.css'



const Sidebar = ({children}) => {
  const [ isOpen, setIsOpen ] = useState(false);
  const toggle= () => setIsOpen (!isOpen );
  const menuItem = [
    {
      path: "/",
      name: "Dashboard",
      icon: <FaTh />
    },
    {
      path: "/home",
      name: "Home",
      icon: <AiFillHome />
    },
    {
      path: "/about",
      name: "About",
      icon: <FaBookReader />
    },
    {
      path: "/product",
      name: "Product",
      icon: <HiTemplate />
    },
    // {
    //   path: "/add",
    //   name: "AddProduct",
    //   icon: <MdOutlineProductionQuantityLimits />
    // },

    {
      path: "/process",
      name: "Process",
      icon: <ImSpinner10 />
    },
    {
      path: "/contact",
      name: "Contact",
      icon: <MdOutlineContactPhone />
    },

    
  
  ]
  return (
    <div className="container-fluid  ">
      <div style={{width: isOpen ? "200px" : "50px"}} className='sidebar'>
        <div className='top_section'>
          <h1 style={{display: isOpen ? "block" : "none"}} className='logo'>Logo</h1>
          <div style={{marginLeft: isOpen ? "50px" : "0px"}} className='bars'>
            <FaBars onClick={toggle} />
          </div>
        </div>
        {
          menuItem.map((item,index)=>(
            <Link to={item.path} key={index} className="link" 
            activeclassName="active">
              <div className='icon'> {item.icon}</div>
              <div style={{display: isOpen ? "block" : "none"}}  className='Link_text'>{item.name}</div>
            </Link>
          ))
        }
      </div>
      <main style={{width:"100%",height:"100vh",overflow:"scroll"}}>{children}</main>
    </div>
  )
}

export default Sidebar