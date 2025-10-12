import { useContext } from "react";

// Components & fonction
import PageTemplate from "../composantes/PageTemplate";
import { useLocalization } from "../state/contexts/LocalizationContext";
import { AuthContext } from "../state/contexts/AuthContext";

// Constants
import LOCALIZE from "../ressources/text/localize";

function HomePage() {
  const language = useLocalization();
  const { currentUser } = useContext(AuthContext);

  return (
    <PageTemplate title={LOCALIZE.homepage.title}>
      {/* a ajouter dans ressources */}
      {currentUser && <p>Bonjour, {currentUser.username}</p>}
      <p>{LOCALIZE.homepage.text1}</p>
    </PageTemplate>
  );
}

export default HomePage;
