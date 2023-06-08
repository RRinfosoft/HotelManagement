import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Accordion from 'react-bootstrap/Accordion';
import { db, storage } from '../../../firebase';
import { useParams, useNavigate } from 'react-router-dom';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { addDoc, doc, collection, getDoc, serverTimestamp, updateDoc } from 'firebase/firestore';
import Spinner from 'react-bootstrap/Spinner';
import './Product.css'
import ProductTable from './ProductTable';
import { Container, Row } from 'react-bootstrap';
// import ProductTable from ''



const initialState = {
    productname: "",
    productmaterial: "",
    materialcategories: "",
    work: "",

}

const ProductForm = () => {
    const [data, setData] = useState(initialState);
    const { productname, productmaterial, materialcategories, work } = data;
    const [file, setFile] = useState(null);
    const [progress, setProgress] = useState(null);
    const [errors, setErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    // const navigate = useNavigate();
    const { id } = useParams();


    useEffect(() => {
        id && getSingleUser();
    }, [id])

    const getSingleUser = async () => {
        const docRef = doc(db, "product", id);
        const snapshot = await getDoc(docRef);
        if (snapshot.exists()) {
            setData({ ...snapshot.data() });
        }

    }

    // make a hooks for upload image
    useEffect(() => {
        const uploadFile = () => {
            const name = new Date().getTime() + file.name;
            const storageRef = ref(storage, file.name);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on("state_changed", (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setProgress(progress);
                switch (snapshot.state) {
                    case "paused":
                        console.log("Upload is Pause");
                        break;
                    case "running":
                        console.log("Upload is Pause");
                        break;
                    default:
                        break;

                };

            }, (error) => {
                console.log(error)
            },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setData((prev) => ({ ...prev, img: downloadURL }))
                    });
                }
            );
        };

        file && uploadFile()

    }, [file]);





    // inputs main value ko target krna
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };


    const validate = () => {
        let errors = {};

        if (!productname) {
            errors.productname = "Product Name is required"
        }
        if (!productmaterial) {
            errors.productmaterial = "Material Name is required"
        }
        if (!materialcategories) {
            errors.materialcategories = "Categore Name is required"
        }
        if (!work) {
            errors.work = "Product Name is required"
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
                await addDoc(collection(db, "product"), {
                    ...data,
                    timestamp: serverTimestamp()
                });
            } catch (error) {
                console.log(error)
            }

        } else {
            try {
                await updateDoc(doc(db, "product", id), {
                    ...data,
                    timestamp: serverTimestamp()
                });
            } catch (error) {
                console.log(error)
            }

        }

        // navigate("/add");
    }
    return (
        <>
<Container>
    <Row>



        <div style={{marginTop:"50px"}}></div>

            <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Add Products</Accordion.Header>
                    <Accordion.Body>
                        {isSubmit ? <Spinner animation="border" /> : (
                            <> <center>
                                <h2>{id ? "Update User" : "Add Product"}</h2>
                            </center>
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Control
                                            type="text"
                                            placeholder="product Name"
                                            error={errors.productname ? { content: errors.productname } : null}
                                            name="productname"
                                            onChange={handleChange}
                                            value={productname}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Control
                                            type="text"
                                            placeholder="product Material"
                                            error={errors.productmaterial ? { content: errors.productmaterial } : null}
                                            name="productmaterial"
                                            onChange={handleChange}
                                            value={productmaterial}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Control
                                            type="text"
                                            placeholder="Material Categories"
                                            error={errors.materialcategories ? { content: errors.materialcategories } : null}
                                            name="materialcategories"
                                            onChange={handleChange}
                                            value={materialcategories}
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Control
                                            type="text"
                                            error={errors.work ? { content: errors.work } : null}
                                            placeholder="Work Name"
                                            name="work"
                                            onChange={handleChange}
                                            value={work}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Control
                                            label="Upload"
                                            type='file'
                                            onChange={(e) => setFile(e.target.files[0])}
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
            <ProductTable />



        </>
    )
}

export default ProductForm