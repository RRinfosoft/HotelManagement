import React from 'react'
import { Container, Col, Row } from 'react-bootstrap'
import './home.css'
import { BsThreeDotsVertical } from "react-icons/bs";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Accordion from 'react-bootstrap/Accordion';

const Home = () => {



  
  return (
    <>
    

      <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>Add Home pages</Accordion.Header>
        <Accordion.Body>
            <Form>
              <br />
              <Form.Group className="mb-3 aboutinput" controlId="formBasicEmail">
                <Form.Control type="email" placeholder="MainHeading" />
              </Form.Group>

              <Form.Group className="mb-3 aboutinput" controlId="formBasicPassword">
                <Form.Control className="inputs1" type="file" placeholder="img1" />
              </Form.Group>

              <Form.Group className="mb-3 aboutinput" controlId="formBasicPassword">
                <Form.Control className="inputs1" type="file" placeholder="img2" />
              </Form.Group>

              <Form.Group className="mb-3 aboutinput" controlId="formBasicPassword">
                <Form.Control className="inputs1" type="file" placeholder="img2" />
              </Form.Group>

              <center>
                <Button className="addbtn" variant="secondary" type="submit">
                  Add
                </Button>
              </center>
            </Form>
            < br />
          {/* </div> */}
        </Accordion.Body>
      </Accordion.Item>
   
    </Accordion>

      {/* <Container>
        <Row>
          <h1>Home</h1>
          <div className="home-parent">
            <Form>
              <br />
              <Form.Group className="mb-3 aboutinput" controlId="formBasicEmail">
                <Form.Control type="email" placeholder="MainHeading" />
              </Form.Group>

              <Form.Group className="mb-3 aboutinput" controlId="formBasicEmail">
                <Form.Control type="email" placeholder="MainHeading" />
              </Form.Group>



              <Form.Group className="mb-3 aboutinput" controlId="formBasicPassword">
                <Form.Control className="inputs1" type="file" placeholder="img1" />
              </Form.Group>
              <Form.Group className="mb-3 aboutinput" controlId="formBasicPassword">
                <Form.Control className="inputs1" type="file" placeholder="img2" />
              </Form.Group>
              <Form.Group className="mb-3 aboutinput" controlId="formBasicPassword">
                <Form.Control className="inputs1" type="file" placeholder="img2" />
              </Form.Group>
              <center>
                <Button className="addbtn" variant="secondary" type="submit">
                  Add
                </Button>
              </center>
            </Form>
            < br />
          </div>
        </Row>
      </Container> */}
    </>
  )
}

export default Home