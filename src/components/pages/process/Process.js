import './pro.css'
import { Container, Row } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import ProcessTable from './ProcessTable';

import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { db, storage } from '../../../firebase';
import { useParams, useNavigate } from 'react-router-dom';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { addDoc, doc, collection, getDoc, serverTimestamp, updateDoc } from 'firebase/firestore';
import Spinner from 'react-bootstrap/Spinner';



const initialState = {
    mainheading: "",
    subheading: "",
    maintitle: "",
    subtitle: "",
    paratitle:"",
    paratitle2:"",

}





const Process = () => {
    const [data, setData] = useState(initialState);
    const { mainheading, subheading, maintitle, subtitle, paratitle,paratitle2} = data;
    // const [file, setFile] = useState(null);
    const [progress, setProgress] = useState(null);
    const [errors, setErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();


    useEffect(() => {
        id && getSingleUser();
    }, [id])

    const getSingleUser = async () => {
        const docRef = doc(db, "process", id);
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

        if (!mainheading) {
            errors.mainheading = "Heading Name is required"
        }
        if (!subheading) {
            errors.subheading = "MHeading Name is required"
        }
        if (!maintitle) {
            errors.maintitle = "Title Name is required"
        }
        if (!subtitle) {
            errors.subtitle = "Title Name is required"
        }
        if (!paratitle) {
            errors.paratitle = "Para Title Name is required"
        }
        if (!paratitle2) {
            errors.paratitle2 = "Para Title Name is required"
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
                await addDoc(collection(db, "process"), {
                    ...data,
                    timestamp: serverTimestamp()
                });
            } catch (error) {
                console.log(error)
            }

        } else {
            try {
                await updateDoc(doc(db, "process", id), {
                    ...data,
                    timestamp: serverTimestamp()
                });
            } catch (error) {
                console.log(error)
            }

        }

        navigate("/process");
    }
   




    
    return (
        <>
        <Container>
            <Row>

         

<div style={{marginTop:"50px"}}></div>

<Accordion defaultActiveKey="0">
    <Accordion.Item eventKey="0">
        <Accordion.Header>Add Process</Accordion.Header>
        <Accordion.Body>
            {isSubmit ?<Spinner animation="border" /> : (
                <> <center>
                    <h2>{id ? "Update User" : "Add Process"}</h2>
                </center>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Control
                                type="text"
                                placeholder="Main Heading"
                                error={errors.mainheading ? { content: errors.mainheading } : null}
                                name="mainheading"
                                onChange={handleChange}
                                value={mainheading}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Control
                                type="text"
                                placeholder="Sub Heading"
                                error={errors.subheading ? { content: errors.subheading } : null}
                                name="subheading"
                                onChange={handleChange}
                                value={subheading}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Control
                                type="text"
                                placeholder="Main Title"
                                error={errors.maintitle ? { content: errors.maintitle } : null}
                                name="maintitle"
                                onChange={handleChange}
                                value={maintitle}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Control
                                type="text"
                                error={errors.subtitle ? { content: errors.subtitle } : null}
                                placeholder="Sub Title"
                                name="subtitle"
                                onChange={handleChange}
                                value={subtitle}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Control
                                type="text"
                                placeholder="Para Title"
                                error={errors.paratitle ? { content: errors.paratitle } : null}
                                name="paratitle"
                                onChange={handleChange}
                                value={paratitle}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Control
                                type="text"
                                placeholder="Para Title2"
                                error={errors.paratitle2 ? { content: errors.paratitle2 } : null}
                                name="paratitle2"
                                onChange={handleChange}
                                value={paratitle2}
                            />
                        </Form.Group>
                       

                    <center>
                        
                    <Button className='submit-btn' variant="primary" type="submit"disabled={progress !== null && progress < 100}>
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
<ProcessTable />



























































        
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

