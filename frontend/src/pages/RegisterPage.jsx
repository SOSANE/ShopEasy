// Components & fonction
import { useLocalization } from "../state/contexts/LocalizationContext";
import PageTemplate from "../composantes/PageTemplate";
import RegisterForm from "../composantes/commons/RegisterForm";

// Constants
import LOCALIZE from "../ressources/text/localize";

function RegisterPage() {
  const language = useLocalization();

  return (
    <PageTemplate title={LOCALIZE.registerPage.title}>
      <p>{LOCALIZE.registerPage.text1}</p>
      <RegisterForm />
    </PageTemplate>
  );
}

export default RegisterPage;
