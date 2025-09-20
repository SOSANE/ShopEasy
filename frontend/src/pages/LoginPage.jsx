// Components & fonction
import PageTemplate from "../components/PageTemplate";
import { useLocalization } from "../state/contexts/LocalizationContext";

// Constants
import LOCALIZE from "../ressources/text/localize";

function LoginPage() {
  const language = useLocalization();

  return (
    <PageTemplate title={LOCALIZE.loginpage.title}>
      <p>{LOCALIZE.loginpage.text1}</p>
    </PageTemplate>
  );
}

export default LoginPage;
