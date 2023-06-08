import React from "react";
import { Modal, Button } from "react-bootstrap";
// import "./pages.css";

const ModalComp = ({
  open,
  setOpen,
  heading1,
  heading2,
  heading3,
  heading4,
  heading5,
  heading6,
  heading7,
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
        
          <div style={{ margin: "auto" }}>
            <p style={{ color: "black" }}>{heading1}</p>
            <p style={{ color: "black" }}>{heading2}</p>
            <p style={{ color: "black" }}>{heading3}</p>
            <p style={{ color: "black" }}>{heading4}</p>
            <p style={{ color: "black" }}>{heading5}</p>
            <p style={{ color: "black" }}>{heading5}</p>
            <p style={{ color: "black" }}>{heading7}</p>
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