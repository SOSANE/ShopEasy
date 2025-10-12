import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Components & fonction
import { useLocalization } from "../../state/contexts/LocalizationContext";
import { signup } from "../../api/authentification";

// Constants
import LOCALIZE from "../../ressources/text/localize";
import PATH from "../../ressources/routes/paths";

// validation tres preliminaire
function RegisterForm() {
  const language = useLocalization();
  let navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showError, setShowError] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (confirmPassword !== password) {
      setShowError(true);
    } else {
      const data = await signup(email, username, password);
      if (data) {
        setShowError(false);
        navigate(PATH.login);
      } else {
        setShowError(true);
      }
    }
  }

  return (
    <div className="max-w-lg overflow-hidden rounded shadow-lg">
      <div className="p-4">
        <form
          id="registration-form"
          className="flex flex-col gap-1"
          onSubmit={e => handleSubmit(e)}
        >
          <div className="flex flex-row gap-3">
            <div className="flex flex-col gap-3">
              <Label htmlFor="register-form-username-input" className="pl-1">
                {LOCALIZE.registerPage.form.usernameLabel}
              </Label>
              <Input
                type="text"
                id="register-form-username-input"
                required
                aria-required
                name={username}
                aria-label={LOCALIZE.registerPage.form.usernameLabel}
                placeholder={LOCALIZE.registerPage.form.usernameLabel}
                onChange={e => setUsername(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-3">
              <Label htmlFor="register-form-email-input" className="pl-1">
                {LOCALIZE.registerPage.form.emailLabel}
              </Label>
              <Input
                type="email"
                id="register-form-email-input"
                required
                aria-required
                name={email}
                aria-label={LOCALIZE.registerPage.form.emailLabel}
                placeholder={LOCALIZE.registerPage.form.emailPlaceholder}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-col gap-3 pt-3">
            <Label htmlFor="register-form-password-input" className="pl-1">
              {LOCALIZE.registerPage.form.passwordLabel}
            </Label>
            <Input
              type="password"
              id="register-form-password-input"
              required
              aria-required
              name={password}
              aria-label={LOCALIZE.registerPage.form.passwordLabel}
              placeholder={LOCALIZE.registerPage.form.passwordPlaceholder}
              onChange={e => setPassword(e.target.value)}
            />

            <Label htmlFor="register-form-confirm-password-input" className="pl-1">
              {LOCALIZE.registerPage.form.confirmPasswordLabel}
            </Label>
            <Input
              type="password"
              id="register-form-confirm-password-input"
              required
              aria-required
              name={confirmPassword}
              aria-label={LOCALIZE.registerPage.form.confirmPasswordLabel}
              placeholder={LOCALIZE.registerPage.form.confirmPasswordPlaceholder}
              onChange={e => setConfirmPassword(e.target.value)}
            />
          </div>

          {showError && <p>Erreur</p>}
          <input
            type="submit"
            id="register-form-submit"
            value={LOCALIZE.registerPage.form.buttonLabel}
            className="mt-3 rounded-sm bg-stone-800 p-2 text-stone-50 hover:bg-stone-950 hover:text-stone-200"
          />
          <Link to={PATH.login} className="pt-4">
            {LOCALIZE.registerPage.form.loginAccount}
          </Link>
        </form>
      </div>
    </div>
  );
}

export default RegisterForm;
