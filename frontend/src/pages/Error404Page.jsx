// Composantes & fonctions
import PageTemplate from "../composantes/PageTemplate";
import { useLocalization } from "../state/contexts/LocalizationContext";

// Constantes
import LOCALIZE from "../ressources/text/localize";

function Error404Page() {
  const language = useLocalization();

  return (
    <PageTemplate title={LOCALIZE.error404page.title}>
      <p>{LOCALIZE.error404page.text1}</p>
    </PageTemplate>
  );
}

export default Error404Page;
