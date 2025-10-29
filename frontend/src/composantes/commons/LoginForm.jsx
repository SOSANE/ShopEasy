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
let counter = 0;
function LoginForm({ setCurrentUser }) {
  const language = useLocalization();
  let navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showErrorMessages, setShowErrorMessages] = useState(false);
  const [emptyFieldError, setEmptyFieldError] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    const data = await login(username, password);
    if (data) {
      const info = await userInfo();
      setCurrentUser({
        username: info.username,
        email: info.email,
      });
      setShowErrorMessages(false);
      // setIsLoggedIn(true);
      navigate(PATH.home);
    } else {
      setShowErrorMessages(true);
    }
  }

  function handleBlur(e) {
    if (e.target.value.trim() === "") {
      setEmptyFieldError(true);
    } else {
      setEmptyFieldError(false);
    }
  }

  return (
    <div className="overflow-hidden rounded p-24 shadow-lg">
      <div className="px-6 py-6">
        <form
          id="login-form"
          className="flex flex-col gap-4 px-5"
          onSubmit={e => handleSubmit(onSubmit(e))}
        >
          <div className="flex flex-col gap-3">
            <InputGroup className={emptyFieldError && username === "" ? "border-red-700" : ""}>
              <InputGroupAddon>
                <User />
              </InputGroupAddon>
              <InputGroupInput
                type="text"
                id="login-form-username"
                {...register("username", {
                  required: true,
                  value: username,
                  onBlur: e => handleBlur(e),
                  onChange: e => setUsername(e.target.value),
                })}
                // name={username}
                // required
                aria-required
                aria-label={LOCALIZE.loginpage.form.usernameLabel}
                placeholder={LOCALIZE.loginpage.form.usernameLabel}
                // onChange={e => setUsername(e.target.value)}
                // onBlur={e => handleBlur(e)}
              />
            </InputGroup>
            <span>username: {username}</span>
            <InputGroup className={emptyFieldError && password === "" ? "border-red-700" : ""}>
              <InputGroupAddon>
                <Lock />
              </InputGroupAddon>
              <InputGroupInput
                type="password"
                id="login-form-password"
                {...register("password", {
                  required: true,
                  value: password,
                  onBlur: e => handleBlur(e),
                  onChange: e => setPassword(e.target.value),
                })}
                // name={password}
                // required
                aria-required
                aria-label={LOCALIZE.loginpage.form.passwordLabel}
                placeholder={LOCALIZE.loginpage.form.passwordLabel}
                // onChange={e => setPassword(e.target.value)}
                // onBlur={handleBlur}
              />
            </InputGroup>
            <span>Password: {password}</span>
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
        <span>Render: {counter++}</span>
      </div>
    </div>
  );
}

export default LoginForm;
