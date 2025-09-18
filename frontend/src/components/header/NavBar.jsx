import { useSelector } from "react-redux";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import ChangeLanguage from "./ChangeLanguage";

// Constants
import PATH from "../../ressources/routes/paths";
import LOCALIZE from "../../ressources/text/localize";

function NavBar() {
  const langue = useSelector(state => state.localization.language);

  return (
    <Navbar fixed="top" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href={PATH.home}>{LOCALIZE.title}</Navbar.Brand>
        <Nav className="justify-content-end">
          <Nav.Item>
            <Nav.Link href={PATH.login}>{LOCALIZE.loginpage.title}</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <ChangeLanguage />
          </Nav.Item>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavBar;
