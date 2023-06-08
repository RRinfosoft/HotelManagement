import React, { useEffect, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import { DataGrid } from '@mui/x-data-grid';
import "./pages.css";
import MainLayout from "./MainLayout";
import { useNavigate, useParams } from "react-router-dom";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import { Button, Container, Table, Col, Row } from "react-bootstrap";
import { BsPlusLg } from "react-icons/bs";
import { BsPlus } from "react-icons/bs";
import CertificationForm from "./CertificationForm";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { getCer } from "../../redux/certification/certificationAction";
import { AiFillDashboard, AiFillDelete, AiFillEdit, AiFillRead, AiFillSetting, AiOutlinePlusSquare, AiOutlineReload } from "react-icons/ai";

const Certification = () => {

  
 
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 90,
    },
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
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  ];
  

  const navigate = useNavigate();
  const certification = useSelector((state) => state.certification.certification);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getCer(page));
  }, []);

  const handleDelete = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteDoc(doc(db, `certification/${id}`));
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  }
  const handleAddData = () => {
    navigate("/certification-form");
  };
  console.log(certification);
  return (
    <>
      <MainLayout />
      <Table striped bordered hover style={{ textAlign: "left" }}>
        <thead>
          <tr>
            <th><h5><AiFillDashboard /> &nbsp; Dashboard / Payment Management</h5></th>
          </tr>
        </thead>
      </Table>
      <Container style={{ width: "90%" }}>
        <Row>
          
        <Table striped bordered hover>
            <thead>
              <tr>
                <th>
                  <div
                    style={{ textAlign: "left", marginLeft: "10px" }}
                    className="b">
                    <Button
                      style={{ textAlign: "left", marginLeft: "10px", border: " 1px solid" }}
                      variant="light" >
                      <AiFillSetting />&nbsp;Setting
                    </Button>
                    <Button
                      style={{ textAlign: "left", marginLeft: "10px", border: " 1px solid" }}
                      variant="light" >
                      <AiOutlineReload />&nbsp;Reload
                    </Button>
                  </div>
                </th>
              </tr>
            </thead>
          </Table>
          {/* <Col style={{ padding: "30px", textAlign: "left" }} sm={6}>
            <h4>CERTIFICATION</h4>

            <Button
              variant="dark"
              className="back-to-form1"
              style={{ margin: "auto" }}
              onClick={() => handleAddData()}
            >
              <BsPlusLg />
            </Button>
          </Col>
          <hr /> */}
        </Row>
      </Container>
      <div className="main-div">
        <Container style={{ width: "90%" }}>
          <Row>
            {certification &&
              certification?.map((item) => (
                <Col sm={12} key={item.id}>
                  <Table responsive="sm">
                    <tbody>
                      <tr>
                        <td>
                          <div
                            style={{ display: "flex", margin: "auto" }}
                          >
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
                              {item.heading1}
                            </p>
                            <p style={{ margin: "auto", width: "350px" }}>
                              {item.paragragh1}
                            </p>
                            <Button
                              variant="success"
                              style={{ margin: "auto" }}
                              onClick={() =>
                                navigate(`/certification-form/${item.id}`)
                              }
                            >
                              Update
                            </Button>&nbsp;&nbsp;
                            <Button
                              variant="danger"
                              style={{ margin: "auto" }}
                              onClick={() => handleDelete(item.id)}
                            >
                              Delete
                            </Button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </Col>
              ))}
             <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
          </Row>
        </Container>
      </div>
    </>
  )
}

export default Certification