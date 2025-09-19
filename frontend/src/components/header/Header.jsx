import { useLocalization } from "../../state/contexts/LocalizationContext";

// Components
import NavBar from "./NavBar";

function Header() {
  const language = useLocalization();

  return (
    <header>
      <NavBar />
    </header>
  );
}

export default Header;
