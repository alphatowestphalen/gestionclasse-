import React, { useEffect, useState } from "react";
import { Container, Form, InputGroup, ListGroup, Stack } from "react-bootstrap";
import MyModal from "../components/modal";
import profService from "../service/profService";

const ModalFormProf = ({
  onOk,
  setSelected,
  selected,
  onLoad,
  setShow,
  show,
}) => {
  const [profs, setProfs] = useState([]);
  const [search, setSearch] = useState("");
  useEffect((_) => {
    getProfs();
  }, []);

  const getProfs = async () => {
    const response = await profService.getProfs();
    if (response.status === 200) setProfs([...response.data]);
  };

  const searchHandle = async (value) => {
    setSearch(value);
    if (value === "") getProfs();
    else {
      const response = await profService.filter(value);
      if (response.status === 200) {
        setProfs([...response.data]);
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
      title="Ajouter une Professeur"
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
          {profs.map((prof, index) => (
            <ListGroup.Item key={index}>
              <Stack direction="horizontal" gap={3}>
                <div>
                  <Form.Check
                    onChange={(e) => setSelected({ ...prof })}
                    inline
                    name="grade"
                    type="radio"
                    checked={prof.codeProf === selected?.codeProf}
                    id="Feminin"
                  />
                </div>
                <div className="me-auto">
                  <h6>{prof?.name}</h6>
                  <i> {prof?.grade?.designation} </i>
                  <em> || {prof?.genre}</em>
                </div>
              </Stack>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Container>
    </MyModal>
  );
};

export default ModalFormProf;
