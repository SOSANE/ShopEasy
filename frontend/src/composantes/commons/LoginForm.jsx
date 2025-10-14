import { useState } from "react";
import { Link, useNavigate } from "react-router";

// Composantes & fonctions
import { useLocalization } from "../../state/contexts/LocalizationContext";
import { login, userInfo } from "../../api/authentification";
import { Lock, User } from "lucide-react";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";

// Constantes
import LOCALIZE from "../../ressources/text/localize";
import PATH from "../../ressources/routes/paths";

function LoginForm({ setCurrentUser, setIsLoggedIn }) {
  const language = useLocalization();
  let navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);
  const [inputError, setInputError] = useState(false);

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
      setIsLoggedIn(true);
      navigate(PATH.home);
    } else {
      setShowError(true);
    }
  }

  function handleBlur(e) {
    if (e.target.value.trim() === "") {
      setInputError(true);
    } else {
      setInputError(false);
    }
  }

  return (
    <div className="overflow-hidden rounded p-24 shadow-lg">
      <div className="px-6 py-6">
        <form id="login-form" className="flex flex-col gap-4 px-5" onSubmit={e => handleSubmit(e)}>
          <div className="flex flex-col gap-3">
            <InputGroup className={inputError && username === "" ? "border-red-700" : ""}>
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
                onBlur={e => handleBlur(e)}
              />
            </InputGroup>
            <InputGroup className={inputError && password === "" ? "border-red-700" : ""}>
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
                onBlur={handleBlur}
              />
            </InputGroup>
          </div>
          <div>
            {showError && (
              <p className="text-lg font-medium text-red-700">
                {LOCALIZE.loginpage.form.errorMessage}
              </p>
            )}
          </div>

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
