import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row, Form, Table } from "react-bootstrap";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../../firebase";
import "./pages.css";
import Spinner from "react-bootstrap/Spinner";
import {
  addDoc,
  doc,
  collection,
  getDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { addProduct, updateProduct } from "../../redux/productAction/productAction";
import { useDispatch } from "react-redux";
import { AiFillDashboard } from "react-icons/ai";
const initialState = {
  name: "",
  product: "",
  info: "",
  price: "",
};

const CatgeroyForm = () => {
  const [data, setData] = useState(initialState);
  const { name, product, info, price } = data;
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [errors, setErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch()
  useEffect(() => {
    id && getSingleUser();
  }, [id]);

  const getSingleUser = async () => {
    const docRef = doc(db, "products", id);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      setData({ ...snapshot.data() });
    }
  };
  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + `/files/${file.name}`;
      const storageRef = ref(storage, `/files/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_chage",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is Pause");
              break;
            case "running":
              console.log("Upload is Running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setData((prev) => ({ ...prev, img: downloadURL }));
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const validate = () => {
    let errors = {};
    if (!name) {
      errors.name = "Name is Required";
    }
    if (!product) {
      errors.product = "Product is Required";
    }
    if (!info) {
      errors.info = "Info is Required";
    }
    if (!price) {
      errors.price = "Price is Required";
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
        dispatch(addProduct(data))
      } catch (error) {
        console.log(error);
      }
      Swal.fire({
        icon: "success",
        title: "Success",
        text: `Save SuccessFully`,
        showConfirmButton: true,
        timer: 5000,
      });
      navigate("/products");
    } else {
      try {
        dispatch(updateProduct({ data, id }))
      } catch (error) {
        console.log(error);
      }
      Swal.fire({
        icon: "success",
        title: "Updated",
        text: `Update Successfully`,
        showConfirmButton: true,
        timer: 5000,
      });
      navigate("/products");
    }
  };
  return (
    <>
      <Table striped bordered hover style={{textAlign:"left"}}>
        <thead>
          <tr>
            <th><h5><AiFillDashboard /> &nbsp; Dashboard / Product's Catgeroy/ Create</h5></th>
          </tr>
        </thead>
      </Table>
      <div style={{ padding: "50px", border: "1px solid", margin: "10px" }}>
        <>
          <h4></h4>
          <br />
          <Form onSubmit={handleSubmit}>
            <Container className="main-form">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th style={{ textAlign: "left" }}><h5> {id ? "Update Product Catgeroy" : "Craete Product Catgeroy"}</h5></th>
                  </tr>
                </thead>
              </Table>
              <Row>
                
              <Form.Group
                  className="mb-3 d-flex"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label className="me-5 d-flex">Cargeroy<span style={{ color: "red" }}>*</span></Form.Label>
                  <Form.Select aria-label="Default select example">
                    <option>Root Catgeroy</option>
                    <option>Mens</option>
                    <option>Womens</option>
                    <option>Kids</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group
                  className="mb-3 d-flex "
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label className="me-5 d-flex">Name<span style={{ color: "red" }}>*</span></Form.Label>
                  <Form.Control
                    label="Name"
                    name="name"
                    error={errors.name ? { content: errors.name } : null}
                    placeholder="Enter Name"
                    onChange={handleChange}
                    value={name}
                    autoFocus
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3 d-flex"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label className="me-5 d-flex">Model<span style={{ color: "red" }}>*</span></Form.Label>
                  <Form.Control
                    label="Product"
                    name="product"
                    error={errors.product ? { content: errors.product } : null}
                    placeholder="Enter Product"
                    onChange={handleChange}
                    value={product}
                  />
                </Form.Group>
              </Row>
              <Row>
                <Form.Group
                  className="mb-3 d-flex"
                  controlId="exampleForm.ControlInput1"
                ><Form.Label className="me-5 d-flex">Description<span style={{ color: "red" }}>*</span></Form.Label>
                  <Form.Control
                    label="Info"
                    name="info"
                    error={errors.info ? { content: errors.info } : null}
                    placeholder="Enter Info"
                    onChange={handleChange}
                    value={info}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3 d-flex"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label className="me-5 d-flex">Price<span style={{ color: "red" }}>*</span></Form.Label>
                  <Form.Control
                    label="Price"
                    name="price"
                    error={
                      errors.price ? { content: errors.price } : null
                    }
                    placeholder="Enter Price"
                    onChange={handleChange}
                    value={price}
                  />
                </Form.Group>
              </Row>
              <Row>
                <Form.Group
                  className="mb-3 d-flex"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label className="me-5 d-flex">Image<span style={{ color: "red" }}>*</span></Form.Label>
                  <Form.Control
                    label="FileUpload"
                    type="file"
                    accept="image/*"
                    name="file"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                </Form.Group>

                <Form.Group
                  className="mb-3 d-flex"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label className="me-5 d-flex">Status<span style={{ color: "red" }}>*</span></Form.Label>
                  <Form.Select aria-label="Default select example">
                    <option>Active</option>
                    <option>Unactive</option>

                  </Form.Select>
                </Form.Group>
              </Row>
            </Container>
            <br />
            <Button
              variant="success"
              type="submit"
            >
              Save
            </Button>
            <Button
              variant="danger"
              type="submit"
            >
              Cancel
            </Button>
          </Form>
        </>
      </div>
    </>
  );
};
export default CatgeroyForm;
