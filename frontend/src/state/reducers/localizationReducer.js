import LOCALIZE from "../../ressources/text/localize";
import { SET_LANGUAGE } from "../actions";

export function setLanguage() {
  const language = localStorage.getItem("currLang") || "fr";
  LOCALIZE.setLanguage(language);
  return language;
}

export function localizationReducer(state, action) {
  if (action.type === SET_LANGUAGE) {
    localStorage.setItem("currLang", action.language);
    LOCALIZE.setLanguage(action.language);

    return {
      language: action.language,
    };
  }
}

export default localizationReducer;
