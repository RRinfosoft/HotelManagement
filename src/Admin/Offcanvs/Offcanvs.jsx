import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { BsFillBellFill } from "react-icons/bs";
import { GrNotification } from "react-icons/gr";
import '../Offcanvs/offcanvs.css'
function Offcanvs() {

    const notification = [
        {
            img: "./img/profile2.jpeg",
            text: "Get Order By this User",
            time: "29 min ago"
        },

        {
            img: "./img/profile2.jpeg",
            text: "Get Order By this User",
            time: "29 min ago"
        },
        {
            img: "./img/profile2.jpeg",
            text: "Get Order By this User",
            time: "29 min ago"
        },
        {
            img: "./img/profile2.jpeg",
            text: "Get Order By this User",
            time: "29 min ago"
        },
        {
            img: "./img/profile2.jpeg",
            text: "Get Order By this User",
            time: "29 min ago"
        },
        {
            img: "./img/profile2.jpeg",
            text: "Get Order By this User",
            time: "29 min ago"
        },
        {
            img: "./img/profile2.jpeg",
            text: "Get Order By this User",
            time: "29 min ago"
        },
        {
            img: "./img/profile2.jpeg",
            text: "Get Order By this User",
            time: "29 min ago"
        },
        {
            img: "./img/profile2.jpeg",
            text: "Get Order By this User",
            time: "29 min ago"
        },
    ]
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>

            <BsFillBellFill variant="info" onClick={handleShow} />
            <Offcanvas style={{ width: "300px" }} show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title><GrNotification />   Notification</Offcanvas.Title>
                </Offcanvas.Header>
               
                <Offcanvas.Body variant="dark">
                    {
                        notification.map((item) => {
                            return (
                                <>
                                    <div className="notification">
                                        <div className="notificationWraper">
                                            <img style={{ width: "60px", height: "60px", borderRadius: "50%", marginTop: "10px" }} src={item.img} alt="" />
                                            <div className="notifiText">{item.text}</div>
                                        </div>
                                        <div className="notifiTime">{item.time}</div>
                                    </div>
                                </>
                            )
                        })
                    }
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export default Offcanvs;