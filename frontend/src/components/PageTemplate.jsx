import { useSelector } from "react-redux";
import Container from "react-bootstrap/Container";

// Components
import Header from "./header/Header";
import Footer from "./footer/Footer";

function PageTemplate({ children, title }) {
  const langue = useSelector(state => state.localization.language);

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
