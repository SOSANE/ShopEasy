import { useSelector } from "react-redux";

// Components
import PageTemplate from "../components/PageTemplate";

// Constants
import LOCALIZE from "../ressources/text/localize";

function LoginPage() {
  const langue = useSelector(state => state.localization.language);

  return (
    <PageTemplate title={LOCALIZE.loginpage.title}>
      <p>Loginpage</p>
    </PageTemplate>
  );
}

export default LoginPage;
