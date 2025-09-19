import { useLocalization, useLocalizationDispatch } from "../../state/contexts/LocalizationContext";

// Constants
import LOCALIZE from "../../ressources/text/localize";
import { SET_LANGUAGE } from "../../state/actions";

function ChangeLanguage() {
  const language = useLocalization();
  const dispatch = useLocalizationDispatch();

  return (
    <button
      variant="dark"
      onClick={() => dispatch({ type: SET_LANGUAGE, language: LOCALIZE.langueContraire })}
    >
      {LOCALIZE.header.changeLanguage}
    </button>
  );
}

export default ChangeLanguage;
