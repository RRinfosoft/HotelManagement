// import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { AiFillDashboard } from 'react-icons/ai'
import { FaCalculator, FaCarAlt, FaCartPlus, FaJediOrder, FaObjectGroup, FaProductHunt, FaUserAlt, FaUserPlus } from 'react-icons/fa'
import Button from '@mui/material/Button';
import Table from 'react-bootstrap/Table';
import { ProductText } from '../../Constant';
const Dashboard = () => {


  const user = [
    {
      name: "Himanshu Daksh",
      email: "himanshudaksh1254@gamil.com",
      stuts: "Active"
    },
    {
      name: "Himanshu Daksh",
      email: "himanshudaksh1254@gamil.com",
      stuts: "Active"
    },
    {
      name: "Himanshu Daksh",
      email: "himanshudaksh1254@gamil.com",
      stuts: "Active"
    },
   

  ]

  const Coustumer=[
    {
      name: "Himanshu Daksh",
      email: "himanshudaksh1254@gamil.com",
      stuts: "Active"
    },
    {
      name: "Himanshu Daksh",
      email: "himanshudaksh1254@gamil.com",
      stuts: "Active"
    },
    {
      name: "Himanshu Daksh",
      email: "himanshudaksh1254@gamil.com",
      stuts: "Active"
    },
    {
      name: "Himanshu Daksh",
      email: "himanshudaksh1254@gamil.com",
      stuts: "Active"
    },
  ]

  const product = [
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




  ];
  return (
    <div>
      <Container>
        <Table striped bordered hover style={{textAlign:"left"}}>
          <thead>
            <tr>
              <h5><AiFillDashboard /> &nbsp;{ProductText.DASHBOARD} / Home</h5>
            </tr>
          </thead>
        </Table>
        <Row>
          <Col sm={6}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th colSpan={4}><FaUserAlt />&nbsp; &nbsp;Latest User </th>
                </tr>
                <tr>
                  <th>User Name</th>
                  <th>Email:ID</th>
                  <th>Stuats</th>
                </tr>
              </thead>
              <tbody>
                {
                  user.map((item) => {
                    return (
                      <>
                        <tr>
                          <td>{item.name}</td>
                          <td>{item.email}</td>
                          <td><Button variant="contained" color="success">{item.stuts}</Button></td>
                        </tr>
                      </>
                    )
                  })
                }
              </tbody>
            </Table>
          </Col> <Col md={6}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th colSpan={4}><FaProductHunt />&nbsp; &nbsp;Latest Products </th>
                </tr>
                <tr>
                  <th>Product Image</th>
                  <th>Product Name</th>
                  <th>Product Modal</th>
                  <th>Stuats</th>
                </tr>
              </thead>
              <tbody>
                {
                  product.map((item) => {
                    return (
                      <>
                        <tr>
                          <td><img style={{ width: "50px", height: "50px", borderRadius: "50%", }} src={item.img} alt="" /></td>
                          <td>{item.name}</td>
                          <td>{item.modal}</td>
                          <td><Button variant="contained" color="success">{item.stuts}</Button></td>
                        </tr>
                      </>
                    )
                  })
                }
              </tbody>
            </Table>
          </Col>
        </Row>



        <Row>
          <Col sm={6}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th colSpan={4}><FaUserPlus/>&nbsp; &nbsp;Latest Coustumer </th>
                </tr>
                <tr>
                  <th>User Name</th>
                  <th>Email:ID</th>
                  <th>Stuats</th>
                </tr>
              </thead>
              <tbody>
                {
                  Coustumer.map((item) => {
                    return (
                      <>
                        <tr>
                          <td>{item.name}</td>
                          <td>{item.email}</td>
                          <td><Button variant="contained" color="success">{item.stuts}</Button></td>
                        </tr>
                      </>
                    )
                  })
                }
              </tbody>
            </Table>
          </Col> <Col md={6}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th colSpan={4}><FaCartPlus />&nbsp; &nbsp;Latest Order </th>
                </tr>
                <tr>
                  <th>Unique ID</th>
                  <th>Name</th>
                  <th>Amount</th>
                  <th>Stuats</th>
                </tr>
              </thead>
              <tbody>
                {/* {
                  product.map((item) => {
                    return (
                      <> */}
                        <tr>
                          <th colSpan={4}>No Result Found</th>
                          {/* <td><img style={{ width: "50px", height: "50px", borderRadius: "50%", }} src={item.img} alt="" /></td>
                          <td>{item.name}</td>
                          <td>{item.modal}</td>
                          <td><Button variant="contained" color="success">{item.stuts}</Button></td> */}
                        </tr>
                      {/* </>
                    )
                  })
                } */}
              </tbody>
            </Table>
          </Col>
        </Row>



      </Container>
    </div>
  )
}

export default Dashboard
