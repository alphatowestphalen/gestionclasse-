import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  ListGroup,
  Row,
  Stack,
} from "react-bootstrap";
import ModalFormProf from "./modal-form-Prof";
import ModalFormSalle from "./modal-form-salle";
import occupService from "../service/occupationService";
import { useNavigate, useParams } from "react-router-dom";
import { wait } from "@testing-library/user-event/dist/utils";
import salleService from "../service/salleService";
import profService from "../service/profService";

const FormOccup = () => {
  const [prof, setProfs] = useState([]);
  const [salle, setSalle] = useState([]);
  const [selectedOcc, setSelectedOcc] = useState({});
  const [selectedProf, setSelectedProf] = useState({});
  const [selectedSalle, setSelectedSalle] = useState({});
  const [showModalSalle, setShowModalSalle] = useState(false);
  const [showModalProf, setShowModalProf] = useState(false);
  const [load, setLoad] = useState(false);
  const navigate = useNavigate();

  let { occId } = useParams();
  useEffect((_) => {
    if (occId !== undefined) getOcc(occId);
  }, []);

  const getSalles = async () => {
    const response = await salleService.getSalles();
    if (response.status === 200) setSalle([...response.data])

  }
  const getProf = async () => {
    const response = await profService.getProfs();
    if (response.status === 200) setProfs([...response.data])
  }
  const getOcc = async (occId) => {
    const response = await occupService.getOcc(occId);
    if (response.status === 200) {
      setSelectedOcc({ ...response.data });
    }
  };

  const addOcc = async () => {
    setLoad(true);
    if (selectedOcc === "") return;

    if (selectedOcc.codeOcc) {
      const response = await occupService.updateOcc(selectedOcc.codeOcc, {
        ...selectedOcc,
      });
      if (response.status === 200) {
        setSelectedOcc({});
        setSelectedProf({});
        setSelectedSalle({});
        setLoad(false);
        navigate("/occupations");
      }
    } else {
      console.log(selectedOcc);

      const response = await occupService.addOcc({ ...selectedOcc });
      if (response.status === 200) {
        setSelectedOcc({});
        setSelectedProf({});
        setSelectedSalle({});
        setLoad(false);
        navigate("/occupations");
      }
    }
  };
  const okProfHandle = () => {
    if (selectedProf)
      setSelectedOcc((occ) => {
        return { ...occ, professeur: { ...selectedProf } };
      });
  };
  const okSalleHandle = () => {
    if (selectedSalle)
      setSelectedOcc((occ) => {
        return { ...occ, salle: { ...selectedSalle } };
      });
  };
  // const handeChangeSelectSalle = (event) =>{
  //   setSelectedSalle({ ...selectedSalle, designation: event.target.value });
  //   console.log(selectedSalle);
  // }

  return (
    <>
      <ModalFormProf
        onOk={okProfHandle}
        setSelected={setSelectedProf}
        selected={selectedProf}
        onLoad={load}
        setShow={setShowModalProf}
        show={showModalProf}
      />
      <ModalFormSalle
        onOk={okSalleHandle}
        setSelected={setSelectedSalle}
        selected={selectedSalle}
        onLoad={load}
        setShow={setShowModalSalle}
        show={showModalSalle}
      />

      <div style={{ width: "500px", marginTop: "3rem" }}>
        <Form>
          <h2 className="mb-4 text-center ">
            {occId ? "Modifier" : "Ajouter"} un occupation
          </h2>
          <Container>
            <Form.Group className="mb-3">
              <Form.Label>date : </Form.Label>
              <Form.Control
                value={selectedOcc?.dateOccupe || ""}
                onChange={(e) => {
                  setSelectedOcc((occ) => {
                    return { ...occ, dateOccupe: e.target.value };
                  });
                }}
                type="date"
                placeholder="Doctorat"
              />
            </Form.Group>
          </Container>
          <Container>
            <Form.Label>Heur d'occupation </Form.Label>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Debut : </Form.Label>
                  <Form.Control
                    value={selectedOcc?.startTime || ""}
                    onChange={(e) => {
                      setSelectedOcc((occ) => {
                        return { ...occ, startTime: e.target.value };
                      });
                    }}
                    type="time"
                    placeholder="Doctorat"
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Fin : </Form.Label>
                  <Form.Control
                    value={selectedOcc?.endTime || ""}
                    onChange={(e) => {
                      setSelectedOcc((occ) => {
                        return { ...occ, endTime: e.target.value };
                      });
                    }}
                    type="time"
                    placeholder="Doctorat"
                  />
                </Form.Group>
              </Col>
            </Row>
          </Container>
          <Container>
            {/* <Row>
              <Col>
                <select class="form-control" value={selectedProf} onChange={handeChangeSelectProf} id="sel1">
                  {prof.map((items, index) => (
                    <option value={items.name} key={index}> {items.name}</option>
                  ))}
                </select>
              </Col>
            </Row> */}
            {/* <Form.Label>Salle</Form.Label>
            <Row>
              <Col>
                <select class="form-control" value={selectedSalle} onChange={handeChangeSelectSalle} id="sel1">
                  {salle.map((items, index) => (
                    <option value={items.codeSal} key={index}> {items.designation}</option>
                  ))}
                </select>
              </Col>
            </Row> */}
            {/* <Row>
              <Col>
                <select class="form-control" value={selectedSalle} onChange={handeChangeSelectSalle} id="sel1">
                  {salle.map((items, index) => (
                    <option value={} key={index}> {items.designation}</option>
                  ))}
                </select>
                <p>Selected Salle: {selectedSalle}</p>
              </Col>
            </Row> */}
            <Row>
              <Col>
                <Button
                  onClick={(e) => {
                    selectedOcc.professeur &&
                      setSelectedProf({ ...selectedOcc.professeur });
                    setShowModalProf(true);
                  }}
                >
                  Proffesseur
                </Button>
              </Col>

              <Col>
                <Button
                  onClick={(e) => {
                    selectedOcc.salle &&
                      setSelectedSalle({ ...selectedOcc.salle });
                    setShowModalSalle(true);
                  }}
                >
                  Salle
                </Button>
              </Col>

            </Row>
            <Row>
              <Col>
                {selectedOcc.professeur && (
                  <ListGroup className="mt-2">
                    <ListGroup.Item>
                      <Stack direction="horizontal" gap={3}>
                        <div className="me-auto">
                          <h6>{selectedOcc.professeur?.name}</h6>
                          <i> {selectedOcc.professeur?.grade?.designation} </i>
                          <em> || {selectedOcc.professeur?.genre}</em>
                        </div>
                      </Stack>
                    </ListGroup.Item>
                  </ListGroup>
                )}
              </Col>
              <Col>
                {selectedOcc.salle && (
                  <ListGroup className="mt-2">
                    <ListGroup.Item>
                      <Stack direction="horizontal" gap={3}>
                        <div className="me-auto">
                          <h6>{selectedOcc.salle?.designation}</h6>
                        </div>
                      </Stack>
                    </ListGroup.Item>
                  </ListGroup>
                )}
              </Col>
            </Row>
          </Container>
          <Stack
            direction="horizontal"
            className="mt-4 justify-content-end"
            gap={3}
          >
            <Button variant="secondary">annuler</Button>
            <Button disabled={load} onClick={addOcc} variant="primary">
              {occId ? "Modifier" : "ajouter"}
            </Button>
          </Stack>
        </Form>
      </div>
    </>
  );
};

export default FormOccup;
