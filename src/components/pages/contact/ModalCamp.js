import React from "react";
import { Modal, Button } from "react-bootstrap";
// import "./pages.css";

const ModalComp = ({
  open,
  setOpen,
  mainhead,
  subhead,
  subhead2,
  text,
  text2,
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
            <p style={{ color: "black" }}>{mainhead}</p>
            <p style={{ color: "black" }}>{subhead}</p>
            <p style={{ color: "black" }}>{subhead2}</p>
            <p style={{ color: "black" }}>{text}</p>
            <p style={{ color: "black" }}>{text2}</p>
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