import { useDispatch, useSelector } from "react-redux";
import { changeLang } from "../../redux/localizationSlice";

// Constants
import LOCALIZE from "../../ressources/text/localize";

function ChangeLanguage() {
  const langue = useSelector(state => state.localization.language);
  const dispatch = useDispatch();

  return (
    <button variant="dark" onClick={() => dispatch(changeLang(LOCALIZE.langueContraire))}>
      {LOCALIZE.header.changeLanguage}
    </button>
  );
}

export default ChangeLanguage;
