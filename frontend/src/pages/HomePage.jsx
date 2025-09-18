import { useSelector } from "react-redux";

// Components
import PageTemplate from "../components/PageTemplate";

// Constants
import LOCALIZE from "../ressources/text/localize";

function HomePage() {
  const langue = useSelector(state => state.localization.language);

  return (
    <PageTemplate title={LOCALIZE.homepage.title}>
      <p>Homepage</p>
    </PageTemplate>
  );
}

export default HomePage;
