// import './pro.css'
import { Container, Row } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
// import ProcessTable from './ProcessTable';

import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { db, storage } from '../../../firebase';
import { useParams, useNavigate } from 'react-router-dom';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { addDoc, doc, collection, getDoc, serverTimestamp, updateDoc } from 'firebase/firestore';
import Spinner from 'react-bootstrap/Spinner';
import AboutTable from './AboutTable';



const initialState = {
    heading1: "",
    heading2: "",
    heading3: "",
    heading4: "",
    heading5: "",
    heading6: "",
    heading7: "",

}





const Process = () => {
    const [data, setData] = useState(initialState);
    const { heading1,heading2,heading3,heading4,heading5,heading6,heading7} = data;
    // const [file, setFile] = useState(null);
    const [about, setAbout] = useState(null);
    const [errors, setErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();


    useEffect(() => {
        id && getSingleUser();
    }, [id])

    const getSingleUser = async () => {
        const docRef = doc(db, "about", id);
        const snapshot = await getDoc(docRef);
        if (snapshot.exists()) {
            setData({ ...snapshot.data() });
        }

    }

   
    





    // inputs main value ko target krna
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };


    const validate = () => {
        let errors = {};

        if (!heading1) {
            errors.heading1 = "Heading1 Name is required"
        }
        if (!heading2) {
            errors.heading2 = "Heading Name is required"
        }
        if (!heading3) {
            errors.heading3 = "Title Name is required"
        }
        if (!heading4) {
            errors.heading4 = "Title Name is required"
        }
        if (!heading5) {
            errors.heading5 = "Para Title Name is required"
        }
        if (!heading6) {
            errors.heading6 = "Para Title Name is required"
        }
        if (!heading7) {
          errors.heading7 = "Para Title Name is required"
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
                await addDoc(collection(db, "about"), {
                    ...data,
                    timestamp: serverTimestamp()
                });
            } catch (error) {
                console.log(error)
            }

        } else {
            try {
                await updateDoc(doc(db, "about", id), {
                    ...data,
                    timestamp: serverTimestamp()
                });
            } catch (error) {
                console.log(error)
            }

        }

        navigate("/about");
    }
   




    
    return (
        <>
        <Container>
            <Row>

         

<div style={{marginTop:"50px"}}></div>

<Accordion defaultActiveKey="0">
    <Accordion.Item eventKey="0">
        <Accordion.Header>Add About Details</Accordion.Header>
        <Accordion.Body>
            {isSubmit ?<Spinner animation="border" /> : (
                <> <center>
                    <h2>{id ? "Update User" : "Add About Details"}</h2>
                </center>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Control
                                type="text"
                                placeholder=" Heading1"
                                error={errors.heading1 ? { content: errors.heading1 } : null}
                                name="heading1"
                                onChange={handleChange}
                                value={heading1}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Control
                                type="text"
                                placeholder="Heading2"
                                error={errors.heading2 ? { content: errors.heading2 } : null}
                                name="heading2"
                                onChange={handleChange}
                                value={heading2}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Control
                                type="text"
                                placeholder="Heading3"
                                error={errors.heading3 ? { content: errors.heading3 } : null}
                                name="heading3"
                                onChange={handleChange}
                                value={heading3}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Control
                                type="text"
                                error={errors.heading4 ? { content: errors.heading4 } : null}
                                placeholder="Heading4"
                                name="heading4"
                                onChange={handleChange}
                                value={heading4}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Control
                                type="text"
                                placeholder="Heading5"
                                error={errors.heading5 ? { content: errors.heading5 } : null}
                                name="heading5"
                                onChange={handleChange}
                                value={heading5}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Control
                                type="text"
                                placeholder="Heading6"
                                error={errors.heading6 ? { content: errors.heading6 } : null}
                                name="heading6"
                                onChange={handleChange}
                                value={heading6}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Control
                                type="text"
                                placeholder="Heading7"
                                error={errors.heading7 ? { content: errors.heading7 } : null}
                                name="heading7"
                                onChange={handleChange}
                                value={heading7}
                            />
                        </Form.Group>
                       

                    <center>
                        
                    <Button className='submit-btn' variant="primary" type="submit"disabled={about !== null && about < 100}>
                            Submit
                        </Button>
                    </center>
                    </Form>
                </>
             )} 
          
        </Accordion.Body>
    </Accordion.Item>
</Accordion>
</Row>
        </Container><br /><br />
<AboutTable />



























































        
            {/* <div className='top'
                style={{
                    width: "101%",
                    height: "50px",

                }}
            ></div>
            <Container >
                <Row>
                    <Accordion defaultActiveKey="0">
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Add Process Headings and Title</Accordion.Header>
                            <Accordion.Body>

                                <Form >
                                    <br />
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Control
                                            type="text"
                                            placeholder="Main Heading"
                                         
                                         
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">

                                        <Form.Control
                                            type="text"
                                            placeholder="Sub Heading"
                                          
                                          
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicEmail">

                                        <Form.Control
                                            type="text"
                                            placeholder="Main Title"
                                            
                                          
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicEmail">

                                        <Form.Control
                                            type="text"
                                            placeholder="Sub Title"
                                         
                                          
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicEmail">

                                        <Form.Control
                                            type="text"
                                            placeholder="Para Title"
                                       
                                         
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Control
                                            type="text"
                                            placeholder="Para Title"
                                          
                                           
                                        />
                                    </Form.Group>


                                    <center>
                                        <Button className='submit-btn' variant="secondary"
                                            type="submit"
                                           > Submit </Button>

                                    </center>
                                    < br />

                                </Form>

                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                    <ProcessTable />



                </Row>
            </Container> */}

            {/* <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Accordion Item #1</Accordion.Header>
                    <Accordion.Body>
                  
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion> */}

        </>
    )
}

export default Process

