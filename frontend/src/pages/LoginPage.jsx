// Components
import PageTemplate from "../components/PageTemplate";

// Constants
import LOCALIZE from "../ressources/text/localize";

function LoginPage() {
  return (
    <PageTemplate title={LOCALIZE.loginpage.title}>
      <p>Loginpage</p>
    </PageTemplate>
  );
}

export default LoginPage;
