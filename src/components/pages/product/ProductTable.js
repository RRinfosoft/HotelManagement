import React, { useEffect, useState } from 'react'
import { collection, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { db } from '../../../firebase';
import Table from 'react-bootstrap/Table';
import ModalCamp from './ModalCamp';





const ProductTable = () => {
    const [users, setUsers] = useState([]);
    const [open, setOpen] = useState(false);
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {
        setLoading(true);
        const unsub = onSnapshot(collection(db, "product"), (snapshot) => {
            let list = [];
            snapshot.docs.forEach((doc) => {
                list.push({ id: doc.id, ...doc.data() })
            });
            setUsers(list);
            setLoading(false);

        }, (error) => {
            console.log(error)
        }
        );
        return () => {
            unsub();
        };
    }, []);



    const handleModel = (item) => {
        setOpen(true);
        setUser(item);

    }
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure to delete that user ?")) {
            try {
                setOpen(false);
                await deleteDoc(doc(db, "product", id));
                setUsers(users.filter((user) => user.id !== id));
            } catch (err) {
                console.log(err)
            }
        }

    }

    return (
        <>
            {users && users.map((item) => (
                <table class="table bordred">

                    <tbody>
                        <tr>
                            {/* <th scope="row"></th> */}
                            <td>   <img
                                src={item.img}
                                style={{
                                    width: "50px",
                                    height: "50px",
                                    margin: "auto",
                                    borderRadius: "50%",
                                }}
                            /></td>
                            <td>{item.productname}</td>
                            <td>{item.productmaterial}</td>
                            <td>{item.materialcategories}</td>
                            <td>{item.work}</td>
                
                               <td> <button
                                    style={{
                                        backgroundColor: "green",
                                        width: "100px",
                                        height: "30px",
                                        // marginLeft: "10px"

                                    }}
                                    onClick={() => navigate(`/update/${item.id}`)}
                                >
                                    Update
                                </button>
                                </td>
                                    <td>
                                <button style={{
                                    backgroundColor: "purple",
                                    width: "100px",
                                    height: "30px",
                                    // marginLeft: "10px"

                                }}
                                    onClick={() => handleModel(item)}
                                >
                                    View
                                </button>
                                </td>
                                {open && (
                                    <ModalCamp
                                        open={open}
                                        setOpen={setOpen}
                                        handleDelete={handleDelete}
                                        {...user}
                                    />
                                )}
            

                        </tr>

                    </tbody>
                </table>
            ))}
        </>
    )
}

export default ProductTable