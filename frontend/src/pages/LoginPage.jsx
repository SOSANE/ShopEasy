import { useLocalization } from "../state/contexts/LocalizationContext";

// Components
import PageTemplate from "../components/PageTemplate";

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
