import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";

// Composantes & fonctions
import { useLocalization } from "../../state/contexts/LocalizationContext";
import { signup } from "../../api/authentification";
import { ErrorMessages } from "../../api/helpers";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Constantes
import LOCALIZE from "../../ressources/text/localize";
import PATH from "../../ressources/routes/paths";

function RegisterForm() {
  const language = useLocalization();
  let navigate = useNavigate();
  const { register, handleSubmit } = useForm({ shouldUseNativeValidation: true });
  const [errorMessages, setErrorMessages] = useState({});
  const [showPasswordDoNotMatchErrorMessage, setShowPasswordDoNotMatchErrorMessage] =
    useState(false);

  const onSubmit = async formData => {
    if (formData.confirmPassword !== formData.password) {
      setShowPasswordDoNotMatchErrorMessage(true);
    } else {
      const data = await signup(formData.email, formData.username, formData.password);
      setShowPasswordDoNotMatchErrorMessage(false);
      if (data.id) {
        navigate(PATH.login);
      } else {
        setErrorMessages(ErrorMessages(data));
      }
    }
  };

  return (
    <div className="overflow-hidden rounded p-28 shadow-lg">
      <div className="p-4">
        <form
          id="registration-form"
          className="flex flex-col gap-1"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-row gap-3">
            <div className="flex flex-col gap-3">
              <Label htmlFor="register-form-username-input" className="pl-1">
                {LOCALIZE.registerPage.form.usernameLabel}
              </Label>
              <Input
                type="text"
                id="register-form-username-input"
                aria-required
                {...register("username", {
                  required: LOCALIZE.registerPage.form.usernameValidationMessage,
                })}
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
                {...register("email", {
                  required: LOCALIZE.registerPage.form.emailValidationMessage,
                })}
                aria-required
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
              {...register("password", {
                required: LOCALIZE.registerPage.form.passwordValidationMessage,
              })}
              aria-required
              aria-label={LOCALIZE.registerPage.form.passwordLabel}
              placeholder={LOCALIZE.registerPage.form.passwordPlaceholder}
            />

            <Label htmlFor="register-form-confirm-password-input" className="pl-1">
              {LOCALIZE.registerPage.form.confirmPasswordLabel}
            </Label>
            <Input
              type="password"
              id="register-form-confirm-password-input"
              {...register("confirmPassword", {
                required: LOCALIZE.registerPage.form.confirmPasswordValidationMessage,
              })}
              aria-required
              aria-label={LOCALIZE.registerPage.form.confirmPasswordLabel}
              placeholder={LOCALIZE.registerPage.form.confirmPasswordPlaceholder}
            />
          </div>

          {/* Petit soucis de traductions, errorMessages ne change pas de langues lors d'un re-render.... */}
          <ul className="text-lg font-medium text-red-700">
            {errorMessages && (
              <>
                {Object.keys(errorMessages).map((e, v) => {
                  return errorMessages[e].map(value => {
                    return <li key={v}>{value}</li>;
                  });
                })}
              </>
            )}

            {showPasswordDoNotMatchErrorMessage && (
              <li>{LOCALIZE.registerPage.form.passwordsDoNotMatchErrorMessage}</li>
            )}
          </ul>

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
