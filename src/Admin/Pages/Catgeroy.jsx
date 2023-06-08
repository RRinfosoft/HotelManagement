import React, { useEffect, useState } from "react";
import "./pages.css";
import { DataGrid } from '@mui/x-data-grid';
import MainLayout from "./MainLayout";
import { useNavigate } from "react-router-dom";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import { Button, Container, Table, Col, Row } from "react-bootstrap";
import { BsPlusLg } from "react-icons/bs";
import Swal from "sweetalert2";
// import { TabTitle } from "../../Title";
import { useDispatch, useSelector } from "react-redux";
import { getHome } from "../../redux/home/homeAction"
import { AiFillDashboard, AiFillDelete, AiFillEdit, AiFillEye, AiFillSetting, AiOutlinePlusSquare } from 'react-icons/ai'

const Catgeroy = () => {

 


  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (item) => {
        return (
          <div className="cellAction d-flex">
            <AiFillEye style={{ fontSize: "1.5rem", margin:"10px" }}/>

            <AiFillDelete style={{ fontSize: "1.5rem",  color:"red", margin:"10px" }}/>

            <AiFillEdit style={{ fontSize: "1.5rem",color:"green", margin:"10px"}}/>
          </div>
        );
      },
    },
  ];

  
  const columns = [
    { field: 'id', headerName: 'Image', width: 70 },
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




  const rows = [
    { id: "./img/pic.jpg", lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65, },
  ];

  const home = useSelector((state) => state.home.home);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getHome(page));
    // dispatch(deleteHome(page));
  }, []);
  // useEffect(() => {
  // }, []);

  const handleDelete = async (id) => {
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
        deleteDoc(doc(db, `home/${id}`));
        // deleteHome();
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };
  const handleAddData = () => {
    navigate("/home-form");
  };
  console.log(home);
  return (
    <>
      <MainLayout />
      <Table striped bordered hover style={{textAlign:"left"}}>
          <thead>
            <tr>
              <th><h5><AiFillDashboard /> &nbsp; Dashboard / Product's Category Management</h5></th>
            </tr>
          </thead>
        </Table>
      <div className="main-div">
        <Container style={{ width: "90%" }}>
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
            <Col
              style={{ padding: "30px", textAlign: "left", width: "50%" }}
              sm={6}
            >

            </Col>
            <hr />
          </Row>
        </Container>
        <Container style={{ width: "90%" }}>
          <Row>
            {home &&
              home.map((item) => (
                <Col sm={12} key={item.id}>
                  <h3
                    style={{
                      margin: "auto",
                      textAlign: "left",
                    }}
                  >
                    {item.heading1}
                  </h3>
                  <br />
                  <h3 style={{ margin: "auto", textAlign: "left" }}>
                    {item.heading2}
                  </h3>
                  <br />
                  <p
                    style={{
                      margin: "auto",
                      textAlign: "left",
                    }}
                  >
                    {item.paragraph1}
                  </p>
                  <br />
                  <p
                    style={{
                      margin: "auto",
                      textAlign: "left",
                    }}
                  >
                    {item.paragraph2}
                  </p>
                  <br />
                  <p
                    style={{
                      margin: "auto",
                      textAlign: "left",
                    }}
                  >
                    {item.paragraph3}
                  </p>
                  <br />
                  <p
                    style={{
                      margin: "auto",
                      textAlign: "left",
                    }}
                  >
                    {item.paragraph4}
                  </p>
                  <br />
                  <p
                    style={{
                      margin: "auto",
                      textAlign: "left",
                    }}
                  >
                    {item.paragraph5}
                  </p>
                  <br />
                  <Button
                    variant="success"
                    style={{ margin: "auto" }}
                    onClick={() => navigate(`/home-form/${item.id}`)}
                  >
                    Update
                  </Button>
                  &nbsp;&nbsp;
                  <Button
                    variant="danger"
                    style={{ margin: "auto" }}
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </Button>
                </Col>
              ))}
               <div style={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={rows}
              columns={columns.concat(actionColumn)}
              pageSize={5}
              rowsPerPageOptions={[5]}
              checkboxSelection
            />
          </div>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Catgeroy;