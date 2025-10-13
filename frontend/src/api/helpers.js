import LOCALIZE from "../ressources/text/localize";
import {
  AUTH_TOKEN,
  USER_ALREADY_EXISTS_CODE,
  INVALID_USERNAME_CODE,
  PASSWORD_TOO_SHORT_CODE,
  PASSWORD_TOO_SIMILAR_TO_ANOTHER_FIELD_CODE,
  PASSWORD_TOO_COMMON_CODE,
  PASSWORD_ENTIRELY_NUMERIC_CODE,
  GENERIC_VALIDATION_CODE,
} from "./constants";

export function getToken() {
  const token = JSON.parse(sessionStorage.getItem(AUTH_TOKEN));
  return token;
}

export function ErrorMessages(errors) {
  let messages = {};
  for (var error in errors) {
    let message = [];
    for (let i = 0; i < errors[error].length; i++) {
      switch (errors[error][i].code) {
        case USER_ALREADY_EXISTS_CODE:
          message.push(LOCALIZE.registerPage.form.userAlreadyExistErrorMessage);
          break;
        case INVALID_USERNAME_CODE:
          message.push(LOCALIZE.registerPage.form.invalidUsernameErrorMessage);
          break;
        case PASSWORD_TOO_SHORT_CODE:
          message.push(LOCALIZE.registerPage.form.passwordTooShortErrorMessage);
          break;
        case PASSWORD_TOO_SIMILAR_TO_ANOTHER_FIELD_CODE:
          message.push(LOCALIZE.registerPage.form.passwordTooSimilarToAnotherFieldErrorMessage);
          break;
        case PASSWORD_TOO_COMMON_CODE:
          message.push(LOCALIZE.registerPage.form.passwordTooCommonErrorMessage);
          break;
        case PASSWORD_ENTIRELY_NUMERIC_CODE:
          message.push(LOCALIZE.registerPage.form.passwordEntirelyNumericErrorMessage);
          break;
        case GENERIC_VALIDATION_CODE:
          message.push(LOCALIZE.registerPage.form.passwordsDoNotMatchErrorMessage);
          break;
        default:
          message.push(LOCALIZE.registerPage.form.errorMessage);
      }
      messages[error] = message;
    }
  }
  return messages;
}
