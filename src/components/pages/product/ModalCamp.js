import React from "react";
import { Modal, Button } from "react-bootstrap";
// import "./pages.css";

const ModalComp = ({
  open,
  setOpen,
  img,
  productname,
  productmaterial,
  materialcategories,
  work,
  id,
  handleDelete,
}) => {
  return (
    <Modal
      show={open}
      onHide={() => setOpen(false)}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>User Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div style={{ display: "flex" }}>
          <div>
            <img
              className="d-flex mx-auto"
              style={{ height: "150px", width: "150px", borderRadius: "50%" }}
              src={img}
            />
          </div>
          <div style={{ margin: "auto" }}>
            <p style={{ color: "black" }}>{productname}</p>
            <p style={{ color: "black" }}>{productmaterial}</p>
            <p style={{ color: "black" }}>{materialcategories}</p>
            <p style={{ color: "black" }}>{work}</p>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <Button variant="danger" onClick={() => handleDelete(id)}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalComp;