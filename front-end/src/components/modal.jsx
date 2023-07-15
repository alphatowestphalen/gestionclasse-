import React, { useEffect } from "react";
import { Button, Modal } from "react-bootstrap";

const MyModal = ({ show, setShow, children, title, onOk, onLoad }) => {
  const handleClose = () => setShow(false);
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button disabled={onLoad} variant="primary" onClick={onOk}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MyModal;
