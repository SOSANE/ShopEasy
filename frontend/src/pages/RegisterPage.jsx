// Composantes & fonctions
import { useLocalization } from "../state/contexts/LocalizationContext";
import PageTemplate from "../composantes/PageTemplate";
import RegisterForm from "../composantes/commons/RegisterForm";

// Constantes
import LOCALIZE from "../ressources/text/localize";

function RegisterPage() {
  const language = useLocalization();

  return (
    <PageTemplate title={LOCALIZE.registerPage.title}>
      <p className="mb-12">{LOCALIZE.registerPage.text1}</p>
      <RegisterForm />
    </PageTemplate>
  );
}

export default RegisterPage;
