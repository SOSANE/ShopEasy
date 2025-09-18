import { useDispatch, useSelector } from "react-redux";
import { changeLang } from "../redux/localizationSlice";

// Components
import PageTemplate from "../components/PageTemplate";

// Constants
import LOCALIZE from "../ressources/text/localize";
function HomePage() {
  const langue = useSelector(state => state.localization.language);
  const dispatch = useDispatch();

  return (
    <PageTemplate>
      <p>Homepage</p>

      <p>Langue: {langue}</p>
      {/* Le changement de langue peut etre son propre component */}
      <button onClick={() => dispatch(changeLang("en"))}>English</button>
      <button onClick={() => dispatch(changeLang("fr"))}>Français</button>
      <p>{LOCALIZE.test}</p>
    </PageTemplate>
  );
}

export default HomePage;
