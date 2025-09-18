import { useSelector } from "react-redux";

// Components
import NavBar from "./NavBar";

function Header() {
  const langue = useSelector(state => state.localization.language);

  return (
    <header>
      <NavBar />
    </header>
  );
}

export default Header;
