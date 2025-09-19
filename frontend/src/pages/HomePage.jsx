import { useLocalization } from "../state/contexts/LocalizationContext";

// Components
import PageTemplate from "../components/PageTemplate";

// Constants
import LOCALIZE from "../ressources/text/localize";

function HomePage() {
  const language = useLocalization();

  return (
    <PageTemplate title={LOCALIZE.homepage.title}>
      <p>{LOCALIZE.homepage.text1}</p>
    </PageTemplate>
  );
}

export default HomePage;
