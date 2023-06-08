import './contact.css'
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
import ContactTable from './ContactTable';



const initialState = {
    mainhead: "",
    subhead: "",
    subhead: "",
    text: "",
    text2:"",

}





const Contact = () => {
    const [data, setData] = useState(initialState);
    const { mainhead, subhead, subhead2, text,text2} = data;
    // const [file, setFile] = useState(null);
    const [contact, setContact] = useState(null);
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

        if (!mainhead) {
            errors.mainhead = "Heading Name is required"
        }
        if (!subhead) {
            errors.subhead = "MHeading Name is required"
        }
        if (!subhead2) {
            errors.maintitle = "Sub Head2 is required"
        }
        if (!text) {
            errors.subtitle = "Text is required"
        }
        if (!text2) {
            errors.paratitle = "Text2 is required"
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
                await addDoc(collection(db, "contact"), {
                    ...data,
                    timestamp: serverTimestamp()
                });
            } catch (error) {
                console.log(error)
            }

        } else {
            try {
                await updateDoc(doc(db, "contact", id), {
                    ...data,
                    timestamp: serverTimestamp()
                });
            } catch (error) {
                console.log(error)
            }

        }

        navigate("/contact");
    }
   




    
    return (
        <>
        <Container>
            <Row>

         

<div style={{marginTop:"50px"}}></div>

<Accordion defaultActiveKey="0">
    <Accordion.Item eventKey="0">
        <Accordion.Header>Add Contact Details</Accordion.Header>
        <Accordion.Body>
            {isSubmit ?<Spinner animation="border" /> : (
                <> <center>
                    <h2>{id ? "Update User" : "Add Contact Details"}</h2>
                </center>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Control
                                type="text"
                                placeholder="Main Head"
                                error={errors.mainhead ? { content: errors.mainhead } : null}
                                name="mainhead"
                                onChange={handleChange}
                                value={mainhead}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Control
                                type="text"
                                placeholder="Sub Head"
                                error={errors.subhead ? { content: errors.subhead } : null}
                                name="subhead"
                                onChange={handleChange}
                                value={subhead}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Control
                                type="text"
                                placeholder="Sub Head2"
                                error={errors.subhead2 ? { content: errors.subhead2 } : null}
                                name="subhead2"
                                onChange={handleChange}
                                value={subhead2}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Control
                                type="text"
                                error={errors.text ? { content: errors.text } : null}
                                placeholder="Text"
                                name="text"
                                onChange={handleChange}
                                value={text}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Control
                                type="text"
                                placeholder="Text2"
                                error={errors.text2 ? { content: errors.text2 } : null}
                                name="text2"
                                onChange={handleChange}
                                value={text2}
                            />
                        </Form.Group>
                        {/* <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Control
                                type="text"
                                placeholder="Para Title2"
                                error={errors.paratitle2 ? { content: errors.paratitle2 } : null}
                                name="paratitle2"
                                onChange={handleChange}
                                value={paratitle2}
                            />
                        </Form.Group> */}
                       

                    <center>
                        
                    <Button className='submit-btn' variant="primary" type="submit"disabled={contact !== null && contact < 100}>
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
<ContactTable />



























































        
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

export default Contact

