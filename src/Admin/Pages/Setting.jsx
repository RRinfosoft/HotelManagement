import React, { useEffect, useState } from "react";
import "./pages.css";
import MainLayout from "./MainLayout";
import { useNavigate } from "react-router-dom";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import { Button, Container, Table, Col, Row } from "react-bootstrap";
import { BsPlusLg } from "react-icons/bs";
import Swal from "sweetalert2";

const Setting = () => {
  const [nav, setNav] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "nav"),
      (snapshot) => {
        let list = [];
        snapshot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setNav(list);
      },
      (error) => {
        console.log(error);
      }
    );
    return () => {
      unsub();
    };
  }, []);

  const deleteDatas = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteDoc(doc(db, `nav/${id}`));
        Swal.fire("Deleted!", "Deleted Successfully.", "success");
      }
    });
  };
  const handleAddData = () => {
    navigate("/nav-form");
  };
  console.log(nav);

  return (
    <>
      <MainLayout />
      <Container style={{ width: "90%" }}>
        <Row>
          {/* <Col style={{ padding: "30px", textAlign: "left" }} sm={6}>
            <h4>NAVBAR</h4>
          </Col> */}
          <Col style={{ padding: "30px", textAlign: "right" }} sm={6}>
            <Button
              variant="dark"
              className="back-to-form"
              style={{ margin: "auto" }}
              onClick={() => handleAddData()}
            >
              <BsPlusLg />
            </Button>
          </Col>
          <hr />
        </Row>
        <div className="main-div">
          <Row>
            {nav &&
              nav.map((item) => (
                <Col sm={12} key={item.id}>
                  <Table responsive="sm">
                    <thead className="heading">
                      <th>Website Name</th>
                      <th>Menu1</th>
                      <th>Mneu2</th>
                      <th>Menu3</th>
                      <th>Menu4</th>
                      <th>Menu5</th>
                      <th>Menu6</th>
                      <th>Actions</th>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <p>{item.website}</p>
                        </td>
                        <td>
                          <p>{item.menu1}</p>
                        </td>
                        <td>
                          <p>{item.menu2}</p>
                        </td>
                        <td>
                          <p>{item.menu3}</p>
                        </td>
                        <td>
                          <p>{item.menu4}</p>
                        </td>
                        <td>
                          <p>{item.menu5}</p>
                        </td>
                        <td>
                          <p>{item.menu6}</p>
                        </td>
                        <td>
                          <Button
                            variant="success"
                            className="updatebtn1"
                            onClick={() => navigate(`/nav-form/${item.id}`)}
                          >
                            Update
                          </Button>
                          &nbsp;&nbsp;
                          <Button
                            variant="danger"
                            style={{ margin: "auto" }}
                            onClick={() => deleteDatas(item.id)}
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </Col>
              ))}
          </Row>
        </div>
      </Container>
    </>
  );
};

export default Setting;