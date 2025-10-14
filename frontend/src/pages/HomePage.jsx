// Composantes & fonctions
import PageTemplate from "../composantes/PageTemplate";
import { useLocalization } from "../state/contexts/LocalizationContext";
import { useAuth } from "../state/contexts/AuthContext";

// Constantes
import LOCALIZE from "../ressources/text/localize";

function HomePage() {
  const language = useLocalization();
  const { currentUser } = useAuth();

  return (
    <PageTemplate title={LOCALIZE.homepage.title}>
      {currentUser && (
        <p>
          {LOCALIZE.homepage.text2} {currentUser.username}
        </p>
      )}
      <p>{LOCALIZE.homepage.text1}</p>
    </PageTemplate>
  );
}

export default HomePage;
