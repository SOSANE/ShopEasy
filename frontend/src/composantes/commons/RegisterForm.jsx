import { useState } from "react";
import { Link } from "react-router";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Components & fonction
import { useLocalization } from "../../state/contexts/LocalizationContext";

// Constants
import LOCALIZE from "../../ressources/text/localize";
import PATH from "../../ressources/routes/paths";

function RegisterForm() {
  const language = useLocalization();
  const username = useState("");
  const email = useState("");
  const password = useState("");
  const confirmPassword = useState("");

  function handleSubmit(e) {
    e.preventDefault();
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
            />

            <Label htmlFor="register-form-confirm-password-input" className="pl-1">
              {LOCALIZE.registerPage.form.confirmPasswordLabel}
            </Label>
            <Input
              type="email"
              id="register-form-confirm-password-input"
              required
              aria-required
              name={confirmPassword}
              aria-label={LOCALIZE.registerPage.form.confirmPasswordLabel}
              placeholder={LOCALIZE.registerPage.form.confirmPasswordPlaceholder}
            />
          </div>

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
