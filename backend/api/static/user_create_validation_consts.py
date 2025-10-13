class UserCreateValidationMessageConstants:
    """
    Simple collection de tous les codes ou messages de validation pour refléter
    les messages de validation de django.contrib.auth.locale.mr.LC_MESSAGES.django.po

    Cette collection est aussi une refléxion de quelques constantes dans le dossier frontend:
    /frontend/src/api/constants.js
    """

    USER_ALREADY_EXISTS_MESSAGE = "A user with that username already exists."
    USER_ALREADY_EXISTS_CODE = "user_already_exists"

    INVALID_USERNAME_MESSAGE = "Enter a valid username. This value may contain only letters, numbers, and @/./+/-/_ characters."
    INVALID_USERNAME_CODE = "invalid_characters_in_username"

    PASSWORD_TOO_SHORT_MESSAGE = (
        "This password is too short. It must contain at least 8 characters."
    )
    PASSWORD_TOO_SHORT_CODE = "password_too_short"

    PASSWORD_TOO_SIMILAR_TO_ANOTHER_FIELD_MESSAGE = "The password is too similar to the"
    PASSWORD_TOO_SIMILAR_TO_ANOTHER_FIELD_CODE = "password_too_similar"

    PASSWORD_TOO_COMMON_MESSAGE = "This password is too common."
    PASSWORD_TOO_COMMON_CODE = "password_too_common"

    PASSWORD_ENTIRELY_NUMERIC_MESSAGE = "This password is entirely numeric."
    PASSWORD_ENTIRELY_NUMERIC_CODE = "password_entirely_numeric"

    GENERIC_VALIDATION_CODE = "generic_validation_message"
