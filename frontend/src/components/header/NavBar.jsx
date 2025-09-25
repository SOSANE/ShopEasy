// Components & fonction
import { useLocalization } from "../../state/contexts/LocalizationContext";
import ChangeLanguage from "./ChangeLanguage";
import shopEasyLogo from "../../assets/shopping-bag.svg";
import { Link } from "react-router";

// Constants
import PATH from "../../ressources/routes/paths";
import LOCALIZE from "../../ressources/text/localize";

function NavBar() {
  const language = useLocalization();

  return (
    <nav className="py-5 shadow-md">
      <div className="mx-auto flex items-center px-8 lg:container">
        <div className="w-2/3 max-w-full">
          <Link to={PATH.home} className="flex w-full items-center justify-start">
            <img className="size-8" src={shopEasyLogo} alt={LOCALIZE.header.logoAltText} />
            <span className="ml-2 text-2xl font-semibold text-stone-900">{LOCALIZE.title}</span>
          </Link>
        </div>

        <div className="flex w-1/3 items-center justify-end">
          <Link to={PATH.login} className="pr-3">
            {LOCALIZE.loginpage.title}
          </Link>
          <ChangeLanguage />
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
