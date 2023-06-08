import React from "react";
import { Modal, Button } from "react-bootstrap";
// import "./pages.css";

const ModalComp = ({
  open,
  setOpen,
  mainheading,
  subheading,
  maintitle,
  subtitle,
  paratitle,
  paratitle2,
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
            <p style={{ color: "black" }}>{mainheading}</p>
            <p style={{ color: "black" }}>{subheading}</p>
            <p style={{ color: "black" }}>{maintitle}</p>
            <p style={{ color: "black" }}>{subtitle}</p>
            <p style={{ color: "black" }}>{paratitle}</p>
            <p style={{ color: "black" }}>{paratitle2}</p>
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