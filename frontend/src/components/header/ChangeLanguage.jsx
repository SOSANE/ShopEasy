import { useDispatch, useSelector } from "react-redux";
import { changeLang } from "../../redux/localizationSlice";

import LOCALIZE from "../../ressources/text/localize";

function ChangeLanguage() {
  const langue = useSelector(state => state.localization.language);
  const dispatch = useDispatch();

  return (
    <>
      <p>{`${LOCALIZE.language}: ${langue}`}</p>
      <button onClick={() => dispatch(changeLang(LOCALIZE.langueContraire))}>
        {LOCALIZE.header.change}
      </button>
    </>
  );
}

export default ChangeLanguage;
