import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";

// Composantes & fonctions
import { useLocalization } from "../../state/contexts/LocalizationContext";
import { login, userInfo } from "../../api/authentification";
import { Lock, User } from "lucide-react";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";

// Constantes
import LOCALIZE from "../../ressources/text/localize";
import PATH from "../../ressources/routes/paths";

function LoginForm({ setCurrentUser }) {
  const language = useLocalization();
  let navigate = useNavigate();
  const { register, handleSubmit } = useForm({ shouldUseNativeValidation: true });
  const [showErrorMessages, setShowErrorMessages] = useState(false);

  const onSubmit = async formData => {
    // e.preventDefault();
    const data = await login(formData.username, formData.password);
    if (data) {
      const info = await userInfo();
      setCurrentUser({
        username: info.username,
        email: info.email,
      });
      setShowErrorMessages(false);
      navigate(PATH.home);
    } else {
      setShowErrorMessages(true);
    }
  };

  return (
    <div className="overflow-hidden rounded p-24 shadow-lg">
      <div className="px-6 py-6">
        <form
          id="login-form"
          className="flex flex-col gap-4 px-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-3">
            <InputGroup>
              <InputGroupAddon>
                <User />
              </InputGroupAddon>
              <InputGroupInput
                type="text"
                id="login-form-username"
                {...register("username", {
                  required: LOCALIZE.loginpage.form.usernameValidationMessage,
                })}
                aria-required
                aria-label={LOCALIZE.loginpage.form.usernameLabel}
                placeholder={LOCALIZE.loginpage.form.usernameLabel}
              />
            </InputGroup>
            <InputGroup>
              <InputGroupAddon>
                <Lock />
              </InputGroupAddon>
              <InputGroupInput
                type="password"
                id="login-form-password"
                {...register("password", {
                  required: LOCALIZE.loginpage.form.passwordValidationMessage,
                })}
                aria-required
                aria-label={LOCALIZE.loginpage.form.passwordLabel}
                placeholder={LOCALIZE.loginpage.form.passwordLabel}
              />
            </InputGroup>
          </div>
          <div>
            {showErrorMessages && (
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
