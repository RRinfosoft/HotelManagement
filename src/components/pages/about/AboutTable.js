import React, { useEffect, useState } from 'react'
import { collection, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { db } from '../../../firebase';
import Table from 'react-bootstrap/Table';
import ModalCamp from './ModalCamp'
import { Button } from 'react-bootstrap';





const AboutTable = () => {
  const [about, setAbout] = useState([]);
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    setLoading(true);
    const unsub = onSnapshot(collection(db, "about"), (snapshot) => {
      let list = [];
      snapshot.docs.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() })
      });
      setAbout(list);
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
        await deleteDoc(doc(db, "about", id));
        setAbout(about.filter((user) => user.id !== id));
      } catch (err) {
        console.log(err)
      }
    }

  }

  return (
    <>
      {about && about.map((item) => (
        <table class="table bordred">

          <tbody>
            <tr>
              {/* <th scope="row"></th> */}

              <td>{item.heading1}</td>
              <td>{item.heading2}</td>
              <td>{item.heading3}</td>
              <td>{item.heading4}</td>
              <td>{item.heading5}</td>
              <td>{item.heading6}</td>
              <td>{item.heading7}</td>
              <td> <button
                style={{
                  backgroundColor: "green",
                  width: "100px",
                  height: "30px",
                  // marginLeft: "10px"

                }}
                onClick={() => navigate(`/about/${item.id}`)}
              >
                Update
              </button>
              </td>
              {/* <Button variant="danger" onClick={() => handleDelete(id)}>
          Delete
        </Button> */}
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

export default AboutTable