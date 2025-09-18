import { useSelector } from "react-redux";

// Components
import PageTemplate from "../components/PageTemplate";

// Constants
import LOCALIZE from "../ressources/text/localize";

function LoginPage() {
  const langue = useSelector(state => state.localization.language);

  return (
    <PageTemplate title={LOCALIZE.loginpage.title}>
      <p>{LOCALIZE.loginpage.text1}</p>
    </PageTemplate>
  );
}

export default LoginPage;
