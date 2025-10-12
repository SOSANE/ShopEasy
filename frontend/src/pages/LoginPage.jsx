import { useContext } from "react";

// Components & fonction
import PageTemplate from "../composantes/PageTemplate";
import { useLocalization } from "../state/contexts/LocalizationContext";
import { AuthContext } from "../state/contexts/AuthContext";
import LoginForm from "../composantes/commons/LoginForm";

// Constants
import LOCALIZE from "../ressources/text/localize";

function LoginPage() {
  const language = useLocalization();
  const { setCurrentUser, setIsLoggedIn } = useContext(AuthContext);

  return (
    <PageTemplate title={LOCALIZE.loginpage.title}>
      <p>{LOCALIZE.loginpage.text1}</p>
      <LoginForm setCurrentUser={setCurrentUser} setIsLoggedIn={setIsLoggedIn} />
    </PageTemplate>
  );
}

export default LoginPage;
