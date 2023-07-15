import React from "react";
import { Nav, NavDropdown } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

const MyNavBar = () => {
  return (
    <div className="navbars">
      <div>
        <h3>Gestion classe</h3>
        <hr /> 
      </div>
      <ul>
        <li><Nav.Link href="/occupations">OCCUPATION</Nav.Link></li>
        <li><Nav.Link href="/salle-de-classe">SALLE</Nav.Link></li>
        <li><Nav.Link href="/professeurs">PROFESSEUR</Nav.Link></li>
        <li><Nav.Link href="/grades">GRADE</Nav.Link></li>
      </ul>
    </div>
  );
};

export default MyNavBar;
