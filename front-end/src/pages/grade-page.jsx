import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Container,
  Form,
  InputGroup,
  ListGroup,
  Stack,
} from "react-bootstrap";
import gradeService from "../service/gradeService";
import MyModal from "../components/modal";
import ModalSupp from "../components/ModalSupp";

const GradePage = () => {
  const [grades, setGrades] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("");
  const [load, setLoad] = useState(false);
  const [id, setId] = useState(null);
  const [show, setShow] = useState(false);
  const [showSupp, setShowSupp] = useState(false);
  useEffect(() => {
    getGrades();
  }, []);

  const getGrades = async () => {
    const response = await gradeService.getGrades();
    if (response.status === 200) setGrades([...response.data]);
  };

  const addGrade = async () => {
    if (selectedGrade === "") return;
    setLoad(true);
    console.log(id);
    console.log(!id);

    if (id) {
      const response = await gradeService.updateGrade(id, {
        designation: selectedGrade,
      });
      if (response.status === 200) {
        const index = grades.findIndex((grade) => grade.codeGrade === id);
        const newGrades = grades[index];
        newGrades.designation = selectedGrade;
        grades[index] = newGrades;
        setGrades([...grades]);
        setShow(false);
        setLoad(false);
      }
    } else {
      const response = await gradeService.addGrade({
        designation: selectedGrade,
      });
      if (response.status === 200) {
        setSelectedGrade("");
        setGrades((grades) => [response.data, ...grades]);
        setLoad(false);
      }
    }
  };
  const suppGrade = async () => {
    setLoad(true);
    const response = await gradeService.deleteGrade(id);
    if (response.status === 200) {
      const Ngrades = grades.filter((grade) => grade.codeGrade !== id);
      setGrades([...Ngrades]);
      setShowSupp(false);
      setLoad(false);
    }
  };

  const searchHandle = async (value) => {
    setSearch(value);
    if (value === "") getGrades();
    else {
      const response = await gradeService.filter(value);
      if (response.status === 200) {
        setGrades([...response.data]);
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
      <MyModal
        onOk={addGrade}
        onLoad={load}
        setShow={setShow}
        show={show}
        title="Ajouter une Grade"
      >
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Grade : </Form.Label>
            <Form.Control
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value)}
              type="email"
              placeholder="Doctorat"
            />
          </Form.Group>
        </Form>
      </MyModal>
      <Container className="mt-4">
        <h1 className="text-center"> Grade</h1>
        <Stack className="mx-4 py-4 px-4" direction="horizontal" gap={3}>
          <div className="p-2">
            <Button
              onClick={(e) => {
                setId(null);
                setShow(true);
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
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>Description</th>
                <th className="tableAction">Action</th>
              </tr>
            </thead>
            <tbody>
              {grades.map((grade, index) => (
                <tr className="text-left">
                  <td>{grade?.designation}</td>
                  <td> <Button
                  onClick={(e) => {
                    setShow(true);
                    setId(grade.codeGrade);
                    setSelectedGrade(grade?.designation);
                  }}
                  className="fs-15"
                  variant="secondary"
                >
                  modifier
                </Button>
                <div className="vr" />
                <Button
                  onClick={(e) => {
                    setId(grade.codeGrade);
                    setShowSupp(true);
                  }}
                  variant="outline-danger"
                >
                  supprimer
                </Button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </ListGroup>
      </Container>
    </>
  );
};
export default GradePage;
