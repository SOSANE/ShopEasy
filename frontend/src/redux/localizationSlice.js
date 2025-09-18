import { createSlice } from "@reduxjs/toolkit";
import LOCALIZE from "../ressources/text/localize";

/**
 * Slice pour gérer/changer l'état du language
 */

const localizationSlice = createSlice({
  name: "localization",
  initialState: { language: setLanguage() },
  reducers: {
    changeLang: (state, action) => {
      localStorage.setItem("currLang", action.payload);
      LOCALIZE.setLanguage(action.payload);
      state.language = action.payload;
    },
  },
});

function setLanguage() {
  const language = localStorage.getItem("currLang") || "fr";
  LOCALIZE.setLanguage(language);
  return language;
}

export const { changeLang } = localizationSlice.actions;
export default localizationSlice.reducer;
