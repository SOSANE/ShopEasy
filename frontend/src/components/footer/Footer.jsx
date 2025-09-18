import { useSelector } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import LOCALIZE from "../../ressources/text/localize";

function Footer() {
  const langue = useSelector(state => state.localization.language);
  return (
    <footer className="footer fixed-bottom">
      <div className="text-center py-3">
        © 2025 Copyright:
        <a href="#"> {LOCALIZE.title}</a>
      </div>
    </footer>
  );
}

export default Footer;
