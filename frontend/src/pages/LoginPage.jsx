// Composantes & fonctions
import PageTemplate from "../composantes/PageTemplate";
import { useLocalization } from "../state/contexts/LocalizationContext";
import { useAuth } from "../state/contexts/AuthContext";
import LoginForm from "../composantes/commons/LoginForm";

// Constantes
import LOCALIZE from "../ressources/text/localize";

function LoginPage() {
  const language = useLocalization();
  const { setCurrentUser, setIsLoggedIn } = useAuth();

  return (
    <PageTemplate title={LOCALIZE.loginpage.title}>
      <p className="mb-12">{LOCALIZE.loginpage.text1}</p>
      <LoginForm setCurrentUser={setCurrentUser} setIsLoggedIn={setIsLoggedIn} />
    </PageTemplate>
  );
}

export default LoginPage;
