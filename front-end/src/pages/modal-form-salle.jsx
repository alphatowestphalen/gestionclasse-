import React, { useEffect, useState } from "react";
import MyModal from "../components/modal";
import salleService from "../service/salleService";
import { Container, Form, InputGroup, ListGroup, Stack } from "react-bootstrap";

const ModalFormSalle = ({
  onOk,
  setSelected,
  selected,
  onLoad,
  setShow,
  show,
}) => {
  const [salles, setSalles] = useState([]);
  const [search, setSearch] = useState("");
  useEffect((_) => {
    getProfs();
  }, []);

  const getProfs = async () => {
    const response = await salleService.getSalles();
    if (response.status === 200) setSalles([...response.data]);
  };

  const searchHandle = async (value) => {
    setSearch(value);
    if (value === "") getProfs();
    else {
      const response = await salleService.filter(value);
      if (response.status === 200) {
        setSalles([...response.data]);
      }
    }
  };
  return (
    <MyModal
      onOk={(e) => {
        setShow(false);
        onOk();
      }}
      onLoad={onLoad}
      setShow={setShow}
      show={show}
      title="Ajouter une Salle"
    >
      <Container>
        <Stack className="mx-4 px-4" direction="horizontal">
          <div className="p-2 ms-auto">
            <InputGroup>
              <InputGroup.Text id="basic-addon1">Search</InputGroup.Text>
              <Form.Control
                onChange={(e) => searchHandle(e.target.value)}
                aria-label="Username"
                value={search}
                aria-describedby="basic-addon1"
              />
            </InputGroup>
          </div>
        </Stack>
        <ListGroup className="mx-4 px-4">
          {salles.map((salle, index) => (
            <ListGroup.Item key={index}>
              <Stack direction="horizontal" gap={3}>
                <div>
                  <Form.Check
                    onChange={(e) => setSelected({ ...salle })}
                    inline
                    name="grade"
                    type="radio"
                    checked={salle.codeSal === selected?.codeSal}
                    id="Feminin"
                  />
                </div>
                <div className="me-auto">
                  <h6>{salle?.designation}</h6>
                </div>
              </Stack>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Container>
    </MyModal>
  );
};

export default ModalFormSalle;
