import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Container,
  Form,
  InputGroup,
  ListGroup,
  Stack,
} from "react-bootstrap";
import ModalSupp from "../components/ModalSupp";
import occupService from "../service/occupationService";
import { useNavigate } from "react-router-dom";

const OccupePage = () => {
  const [occupations, setOccupations] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedOcc, setSelectedOcc] = useState({});
  const [load, setLoad] = useState(false);
  const navigate = useNavigate();

  const [showSupp, setShowSupp] = useState(false);
  useEffect(() => {
    getOccupes();
  }, []);
  const getOccupes = async () => {
    const response = await occupService.getOccs();
    if (response.status === 200) setOccupations([...response.data]);
  };

  const suppGrade = async () => {
    setLoad(true);
    const response = await occupService.deleteGrade(selectedOcc.codeOcc);
    if (response.status === 200) {
      const Ngrades = occupations.filter(
        (occ) => occ.codeOcc !== selectedOcc.codeOcc
      );
      setOccupations([...Ngrades]);
      setShowSupp(false);
      setLoad(false);
    }
  };

  const searchHandle = async (value) => {
    setSearch(value);
    if (value === "") getOccupes();
    else {
      const response = await occupService.filter(value);
      if (response.status === 200) {
        setOccupations([...response.data]);
      }
    }
  };

  return (
    <>
      <ModalSupp
        setShow={setShowSupp}
        onLoad={load}
        show={showSupp}
        onOk={suppGrade}
      />
      <Container className="mt-4">
        <h6 className="text-left"> Occupation</h6>
        <hr />
        <Stack className="mx-4 py-4 px-4" direction="horizontal" gap={3}>
          <div className="p-2">
            <Button
              onClick={(e) => {
                console.log("redirect");
                navigate("/occupations/form");
              }}
              variant="primary"
            >
              Ajouter
            </Button>
          </div>
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
          <table class="table">
            <thead>
              <tr>
                <th>Nom prof</th>
                <th>Nom Salle</th>
                <th>date d'occupation</th>
                <th>Heur de debut</th>
                <th>Heur du fin</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {occupations.map((occ, index) => (
                <tr>
                  <td> {occ?.professeur.name}</td>
                  <td> {occ?.salle.designation}</td>
                  <td> {occ?.dateOccupe}</td>
                  <td>{occ?.startTime}</td>
                  <td>{occ?.endTime}</td>
                  <td>
                    <Button
                      onClick={(e) => navigate(`/occupations/form/${occ.codeOcc}`)}
                      className="fs-15"
                      variant="secondary"
                    >
                      modifier
                    </Button>
                    <div className="vr" />
                    <Button variant="outline-danger">supprimer</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </ListGroup>
      </Container>
    </>
  );
};
export default OccupePage;
