import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router";
import { Lock, User } from "lucide-react";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";

// Components & fonction
import { useLocalization } from "../../state/contexts/LocalizationContext";
import { AuthContext } from "../../state/contexts/AuthContext";
import { login, userInfo } from "../../api/authentification";

// Constants
import LOCALIZE from "../../ressources/text/localize";
import PATH from "../../ressources/routes/paths";

function LoginForm() {
  const language = useLocalization();
  let navigate = useNavigate();
  const { setCurrentUser } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const data = await login(username, password);
    if (data) {
      const info = await userInfo();
      setCurrentUser({
        username: info.username,
        email: info.email,
      });
      setShowError(false);
      navigate(PATH.home);
    } else {
      setShowError(true);
    }
  }

  return (
    <div className="max-w-lg overflow-hidden rounded shadow-lg">
      <div className="px-6 py-6">
        <form id="login-form" className="flex flex-col px-5" onSubmit={e => handleSubmit(e)}>
          <div className="flex flex-col gap-3 py-4">
            <InputGroup>
              <InputGroupAddon>
                <User />
              </InputGroupAddon>
              <InputGroupInput
                type="text"
                id="login-form-username"
                name={username}
                required
                aria-required
                aria-label={LOCALIZE.loginpage.form.usernameLabel}
                placeholder={LOCALIZE.loginpage.form.usernameLabel}
                onChange={e => setUsername(e.target.value)}
              />
            </InputGroup>
            <InputGroup>
              <InputGroupAddon>
                <Lock />
              </InputGroupAddon>
              <InputGroupInput
                type="password"
                id="login-form-password"
                name={password}
                required
                aria-required
                aria-label={LOCALIZE.loginpage.form.passwordLabel}
                placeholder={LOCALIZE.loginpage.form.passwordLabel}
                onChange={e => setPassword(e.target.value)}
              />
            </InputGroup>
          </div>
          {showError && <p>Erreur!!</p>}

          <input
            type="submit"
            id="login-form-submit"
            value={LOCALIZE.loginpage.form.buttonLabel}
            className="rounded-sm bg-stone-800 p-2 text-stone-50 hover:bg-stone-950 hover:text-stone-200"
          />
          <Link to={PATH.signup} className="pt-4">
            {LOCALIZE.loginpage.form.registerAccount}
          </Link>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
