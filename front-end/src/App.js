import "./App.css";

//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";

//core
import "primereact/resources/primereact.min.css";
import MyNavbar from "./components/nav_bar";
import "bootstrap/dist/css/bootstrap.min.css";
import GradePage from "./pages/grade-page";
import { Container, Row } from "react-bootstrap";
import SallePage from "./pages/salle-page";
import ProfPage from "./pages/prof-page";
import OccupePage from "./pages/occupe-page";
import FormOccup from "./pages/form-occupe";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";

const AppRoute = () => {
  return (
    <div className="HomePage">
      <MyNavbar />
      <Container className="d-flex justify-content-center">
        <Outlet />
      </Container>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppRoute />}>
          <Route path="grades" element={<GradePage />} />
          <Route path="salle-de-classe" element={<SallePage />} />
          <Route path="professeurs" element={<ProfPage />} />
          <Route path="occupations" element={<OccupePage />} />
          <Route path="occupations/form" element={<FormOccup />} />
          <Route path="occupations/form/:occId" element={<FormOccup />} />
          <Route />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
