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
import profService from "../service/profService";

const ProfPage = () => {
  const [grades, setGrades] = useState([]);
  const [profs, setProfs] = useState([]);
  const [searchGrade, setSearchGrade] = useState("");
  const [search, setSearch] = useState("");
  const [selectedProf, setSelectedProf] = useState("");
  const [load, setLoad] = useState(false);
  const [show, setShow] = useState(false);
  const [showSupp, setShowSupp] = useState(false);
  useEffect(() => {
    getGrades();
    getProfs();
  }, []);

  const getGrades = async () => {
    const response = await gradeService.getGrades();
    if (response.status === 200) setGrades([...response.data.slice(0, 4)]);
  };
  const getProfs = async () => {
    const response = await profService.getProfs();
    if (response.status === 200) setProfs([...response.data]);
  };

  const addProf = async () => {
    setLoad(true);
    if (selectedProf.codeProf === "") return;

    if (selectedProf.codeProf) {
      const response = await profService.updateProf(selectedProf.codeProf, {
        ...selectedProf,
      });
      if (response.status === 200) {
        const newProf = response.data;
        const index = profs.findIndex(
          (prof) => prof.codeProf === newProf.codeProf
        );
        profs[index] = newProf;
        setProfs((profs) => [...profs]);
        setSelectedProf({});
        setShow(false);
        setLoad(false);
      }
    } else {
      const response = await profService.addProf({ ...selectedProf });
      if (response.status === 200) {
        setSelectedProf({});
        setProfs((profss) => [response.data, ...profss]);
        setLoad(false);
      }
    }
  };
  const suppGrade = async () => {
    setLoad(true);
    const response = await profService.deleteProf(selectedProf.codeProf);
    if (response.status === 200) {
      const Ngrades = grades.filter(
        (grade) => grade.codeGrade !== selectedProf.codeProf
      );
      setGrades([...Ngrades]);
      setShowSupp(false);
      setSelectedProf({});
      setLoad(false);
    }
  };

  const genreHandle = (e) => {
    setSelectedProf((prof) => {
      return { ...prof, genre: e.target.value };
    });
  };
  const gradeHandle = (value) => {
    setSelectedProf((prof) => {
      return { ...prof, grade: { ...value } };
    });
  };

  const searchGradeHandle = async (value) => {
    setSearchGrade(value);
    if (value === "") getGrades();
    else {
      const response = await gradeService.filter(value);
      if (response.status === 200) {
        setGrades([...response.data]);
      }
    }
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
    <>
      <ModalSupp
        setShow={setShowSupp}
        onLoad={load}
        show={showSupp}
        onOk={suppGrade}
      />
      <MyModal
        onOk={addProf}
        onLoad={load}
        setShow={setShow}
        show={show}
        title="Ajouter une Professeur"
      >
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Nom et Prenom : </Form.Label>
            <Form.Control
              value={selectedProf?.name || ""}
              onChange={(e) =>
                setSelectedProf((prof) => {
                  return { ...prof, name: e.target.value };
                })
              }
              type="email"
              placeholder="Rakoto Be Vao"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Genre : </Form.Label>
            <br />
            <Form.Check
              inline
              label="Masculin"
              value="MASCULIN"
              name="genre"
              type="radio"
              checked={"MASCULIN" === selectedProf.genre}
              id="Masculin"
              onChange={genreHandle}
            />
            <Form.Check
              inline
              label="Feminin"
              value="FEMININ"
              checked={"FEMININ" === selectedProf.genre}
              name="genre"
              type="radio"
              id="Feminin"
              onChange={genreHandle}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Grade : </Form.Label>
            <Container className="mt-3">
              <InputGroup>
                <InputGroup.Text id="basic-addon1">Search</InputGroup.Text>
                <Form.Control
                  onChange={(e) => searchGradeHandle(e.target.value)}
                  aria-label="Username"
                  value={searchGrade}
                  aria-describedby="basic-addon1"
                />
              </InputGroup>
              <ListGroup className="mt-3">
                {grades.map((grade, index) => (
                  <ListGroup.Item key={index}>
                    <Stack direction="horizontal" gap={2}>
                      <div>
                        <Form.Check
                          onChange={(e) => gradeHandle(grade)}
                          inline
                          name="grade"
                          type="radio"
                          checked={
                            grade.codeGrade === selectedProf?.grade?.codeGrade
                          }
                          id="Feminin"
                        />
                      </div>
                      <div>{grade.designation}</div>
                    </Stack>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Container>
          </Form.Group>
        </Form>
      </MyModal>

      <Container className="mt-4">
        <h6 className="text-left"> Professeurs</h6>
        <hr />
        <Stack className="mx-4 py-4 px-4" direction="horizontal" gap={3}>
          <div className="p-2">
            <Button
              onClick={(e) => {
                setSelectedProf({});
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
        <div className="mx-4 px-4">
          <table class="table">
            <thead>
              <tr>
                <th>Nom et Prenom</th>
                <th>Grade</th>
                <th>Sex</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {profs.map((prof, index) => (
                <tr key={index}>
                  <td>{prof?.name}</td>
                  <td>{prof?.grade?.designation}</td>
                  <td>{prof?.genre}</td>
                  <td><Button
                    onClick={(e) => {
                      setShow(true);
                      setSelectedProf(prof);
                    }}
                    className="fs-15"
                    variant="secondary"
                  >
                    modifier
                  </Button>
                    <div className="vr" />
                    <Button
                      onClick={(e) => {
                        setSelectedProf(prof);
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
        </div>
      </Container>
    </>
  );
};
export default ProfPage;
