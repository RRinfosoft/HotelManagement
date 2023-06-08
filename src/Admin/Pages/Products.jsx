import React, { useEffect, useState } from "react";
import "./pages.css";
import { DataGrid } from '@mui/x-data-grid';
import { AiFillDashboard, AiFillDelete, AiFillEdit, AiFillEye, AiFillSetting, AiOutlinePlusSquare } from 'react-icons/ai'
import MainLayout from "./MainLayout";
import { Link, useNavigate, useParams } from "react-router-dom";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import { Button, Container, Table, Col, Row } from "react-bootstrap";
import { BsPlusLg } from "react-icons/bs";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/productAction/productAction";
import { deleteProduct } from "../../redux/productAction/productAction";
import { ProductText } from "../../Constant";

const Products = () => {


  const productd = [
    {
      img: "./img/pic.jpg",
      name: "Sony Vivo 30",
      modal: "Sony Vivo 2046 mx",
      stuts: "Active"
    },
    {
      img: "./img/pic.jpg",
      name: "Sony Vivo 30",
      modal: "Sony Vivo 2046 mx",
      stuts: "Active"
    },
    {
      img: "./img/pic.jpg",
      name: "Sony Vivo 30",
      modal: "Sony Vivo 2046 mx",
      stuts: "Active"
    },
    {
      img: "./img/pic.jpg",
      name: "Sony Vivo 30",
      modal: "Sony Vivo 2046 mx",
      stuts: "UnActive"
    },
    {
      img: "./img/pic.jpg",
      name: "Sony Vivo 30",
      modal: "Sony Vivo 2046 mx",
      stuts: "Active"
    },
]

  const imgColumn = [
    {
      field: "id",
      headerName: "Image",
      width: 70,
      productd: (prams) => {
        return (
          <>
          <img src="./img/pic.jpg" alt='img'/>
          </>
        );
      },
    },
  ];

  const columns = [
    // { field: 'id', headerName: 'Image', width: 70 },
    { field: 'firstName', headerName: 'Product Name', width: 130 },
    { field: 'lastName', headerName: 'Modal', width: 130 },
  
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
  ];


  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (item) => {
        return (
          <div className="cellAction d-flex">
            <AiFillEye style={{ fontSize: "1.5rem", margin:"10px" }} variant="primary" onClick={() => deleteDatas(item.id)} />

            <AiFillDelete style={{ fontSize: "1.5rem",  color:"red", margin:"10px" }} variant="danger" onClick={() => deleteDatas(item.id)} />

            <AiFillEdit style={{ fontSize: "1.5rem",color:"green", margin:"10px"}} onClick={() => navigate(`/product-form/${item.id}`)} />
          </div>
        );
      },
    },
  ];

  const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65, },
  ];

  const navigate = useNavigate();
  const product = useSelector((state) => state.products.products);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  useEffect(() => {
    dispatch(getProducts(page));
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
        dispatch(deleteProduct(id))
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  const handleAddData = () => {
    navigate("/product-form");
  };

  return (
    <>
      <MainLayout />
      <Container style={{ width: "90%" }} >
        <Table striped bordered hover style={{ textAlign: "left" }}>
          <thead>
            <tr>
              <th><h5><AiFillDashboard /> &nbsp; {ProductText.DASHBOARD} / {ProductText.PRODUCTS_MANAGEMENT}</h5></th>
            </tr>
          </thead>
        </Table>
        <Row>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>
                  <div
                    style={{ textAlign: "left", marginLeft: "10px" }}
                    className="b">
                    <Button variant="light"
                      onClick={() => handleAddData()}
                      style={{ textAlign: "left", marginLeft: "10px", border: " 1px solid" }}>
                      <AiOutlinePlusSquare />
                      &nbsp;Create
                    </Button>
                    <Button
                      style={{ textAlign: "left", marginLeft: "10px", border: " 1px solid" }}
                      variant="light" >
                      <AiFillSetting />&nbsp;Setting
                    </Button>
                    <Button
                      style={{ textAlign: "left", marginLeft: "10px", border: " 1px solid" }}
                      variant="light" >
                      <AiFillEdit />&nbsp;Bulk Edit
                    </Button>
                    <Button
                      style={{ textAlign: "left", marginLeft: "10px", border: " 1px solid" }}
                      variant="light" >
                      <AiFillDelete />&nbsp;Bulk Delete
                    </Button>
                  </div>
                </th>
              </tr>
            </thead>
          </Table>
          <hr />
        </Row>
      </Container>
      <div className="main-div">
        <Container style={{ width: "90%" }}>
          {product &&
            product.map((item) => (
              <Row key={item.id}>
                <Table responsive="sm" striped bordered hover variant="dark">
                  <tbody>
                    <tr>
                      <td>
                        <div
                          style={{ display: "flex", margin: "auto" }}>
                          <img
                            src={item.img}
                            style={{
                              height: "60px",
                              width: "60px",
                              margin: "auto",
                              borderRadius: "50%",
                            }}
                          />
                          <p style={{ margin: "auto" }}>
                            {item.name}
                          </p>
                          <p style={{ margin: "auto" }}>
                            {item.info}
                          </p>
                          <Button
                            variant="success"
                            style={{ margin: "auto" }}
                            onClick={() => navigate(`/product-form/${item.id}`)}
                          >
                            {ProductText.UPDATE}
                          </Button>
                          <Button
                            variant="danger"
                            style={{ margin: "auto" }}
                            onClick={() => deleteDatas(item.id)}
                          >
                            {ProductText.DELETE}
                          </Button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Row>
            ))}
          <div style={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={rows}
              columns={imgColumn.concat(columns).concat(actionColumn)}
              pageSize={5}
              rowsPerPageOptions={[5]}
              checkboxSelection
            />
          </div>
        </Container>
      </div>
    </>
  );
};
export default Products;
