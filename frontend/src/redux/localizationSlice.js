import { createSlice } from "@reduxjs/toolkit";
import LOCALIZE from "../ressources/text/localize";

/**
 * Slice pour gérer/changer l'état du language
 */

const localizationSlice = createSlice({
  name: "localization",
  initialState: { language: localStorage.getItem("currLang") || "fr" },
  reducers: {
    changeLang: (state, action) => {
      LOCALIZE.setLanguage(action.payload);
      localStorage.setItem("currLang", action.payload);
      return {
        ...state,
        language: action.payload,
      };
    },
  },
});

export const { changeLang } = localizationSlice.actions;
export default localizationSlice.reducer;
