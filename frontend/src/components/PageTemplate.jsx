import { useLocalization } from "../state/contexts/LocalizationContext";

// Components
import Header from "./header/Header";
import Footer from "./footer/Footer";
import Container from "react-bootstrap/Container";

function PageTemplate({ children, title }) {
  const language = useLocalization();

  return (
    <>
      <Header />
      <Container>
        <h1>{title}</h1>
        {children}
      </Container>
      <Footer />
    </>
  );
}

export default PageTemplate;
