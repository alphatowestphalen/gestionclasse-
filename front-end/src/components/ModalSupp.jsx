import React, { useEffect } from "react";
import { Button, Modal } from "react-bootstrap";

const ModalSupp = ({ show, setShow, onOk, onLoad }) => {
  const handleClose = () => setShow(false);
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Question ????</Modal.Title>
      </Modal.Header>
      <Modal.Body>Êtes vous vraiment suprimer </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Non
        </Button>
        <Button disabled={onLoad} variant="danger" onClick={onOk}>
          Oui
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalSupp;
