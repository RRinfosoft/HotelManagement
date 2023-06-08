import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { db } from "../../firebase";
import "./pages.css";
import { addDoc, doc, collection, getDoc, updateDoc } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const initialState = {
  website: "",
  menu1: "",
  menu2: "",
  menu3: "",
  menu4: "",
  menu5: "",
  menu6: "",
};

const NavForm = () => {
  const [data, setData] = useState(initialState);
  const { website, menu1, menu2, menu3, menu4, menu5, menu6 } = data;
  const [errors, setErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    id && getSingleUser();
  }, [id]);

  const getSingleUser = async () => {
    const docRef = doc(db, "nav", id);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      setData({ ...snapshot.data() });
    }
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const validate = () => {
    let errors = {};
    if (!menu1) {
      errors.menu1 = "Menu1 is Required";
    }
    if (!menu2) {
      errors.menu2 = "Menu2 is Required";
    }
    if (!menu3) {
      errors.menu3 = "Menu3 is Required";
    }
    if (!menu4) {
      errors.menu4 = "Menu4 is Required";
    }
    if (!menu5) {
      errors.menu5 = "Menu5 is Required";
    }
    if (!menu6) {
      errors.menu6 = "Menu6 is Required";
    }
    if (!website) {
      errors.website = "Website is Required";
    }
    return errors;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let errors = validate();
    if (Object.keys(errors).length) return setErrors(errors);
    setIsSubmit(true);
    if (!id) {
      try {
        await addDoc(collection(db, "nav"), {
          ...data,
        });
      } catch (error) {
        console.log(error);
      }
      Swal.fire({
        icon: "success",
        title: "Success",
        text: `Thanks for contacting us. We will connect with you shortly...`,
        showConfirmButton: true,
        timer: 5000,
      });
      navigate("/setting");
    } else {
      try {
        await updateDoc(doc(db, "nav", id), {
          ...data,
        });
      } catch (error) {
        console.log(error);
      }
      Swal.fire({
        icon: "success",
        title: "Updated",
        text: `Thanks for contacting us. We will connect with you shortly...`,
        showConfirmButton: true,
        timer: 5000,
      });
      navigate("/setting");
    }
  };

  return (
    <Container style={{ width: "90%" }} className="main-form">
      <div>
        <>
          <h4>{id ? "Update Navbar Menu" : "Add Menu"}</h4>
          <br />
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                name="website"
                error={errors.website ? { content: errors.website } : null}
                placeholder="Website"
                onChange={handleChange}
                value={website}
              />
            </Form.Group>
            <Row>
              <Col sm={6}>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Control
                    name="menu1"
                    error={errors.menu1 ? { content: errors.menu1 } : null}
                    placeholder="Menu1"
                    onChange={handleChange}
                    value={menu1}
                  />
                </Form.Group>
              </Col>
              <Col sm={6}>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Control
                    name="menu2"
                    error={errors.menu2 ? { content: errors.menu2 } : null}
                    placeholder="Menu2"
                    onChange={handleChange}
                    value={menu2}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col sm={6}>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Control
                    name="menu3"
                    error={errors.menu3 ? { content: errors.menu3 } : null}
                    placeholder="Menu3"
                    onChange={handleChange}
                    value={menu3}
                  />
                </Form.Group>
              </Col>
              <Col sm={6}>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Control
                    name="menu4"
                    error={errors.menu4 ? { content: errors.menu4 } : null}
                    placeholder="Menu4"
                    onChange={handleChange}
                    value={menu4}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col sm={6}>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Control
                    name="menu5"
                    error={errors.menu5 ? { content: errors.menu5 } : null}
                    placeholder="Menu5"
                    onChange={handleChange}
                    value={menu5}
                  />
                </Form.Group>
              </Col>
              <Col sm={6}>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Control
                    name="menu6"
                    error={errors.menu6 ? { content: errors.menu6 } : null}
                    placeholder="Menu6"
                    onChange={handleChange}
                    value={menu6}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Button
              variant="success"
              type="submit"
            >
              Submit
            </Button>
          </Form>
        </>
      </div>
    </Container>
  );
};

export default NavForm;