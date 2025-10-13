"""
Le format final d'une réponse est gérée par Django REST Framework. Nous
comptons utiliser une version custom de rest_framework.views.exception_handler
pour ajouter une section 'code' (en plus d'un 'message') dans la réponse.

Le format des exceptions était habituellement {"field": ["liste_messages"]}.
Maintenant, le format est {"field": [{"message": "...", "code": "..."}]}
"""

from rest_framework.views import exception_handler
from rest_framework.exceptions import ValidationError
from api.static.user_create_validation_consts import (
    UserCreateValidationMessageConstants,
)


def api_custom_exception_handler(exc, context):
    """Méthode pour gérer les exceptions customisés"""
    response = exception_handler(exc, context)

    if isinstance(exc, ValidationError):
        api_response_data = {}
        for field, errors in response.data.items():
            error_list = []

            for error in errors:
                message = str(error)
                code = get_error_code(message)
                error_list.append({"message": message, "code": code})
            api_response_data[field] = error_list
        response.data = api_response_data

    return response


def get_error_code(message):
    """Retourne un code d'erreur associé au message d'erreur"""
    if UserCreateValidationMessageConstants.PASSWORD_TOO_SHORT_MESSAGE in message:
        return UserCreateValidationMessageConstants.PASSWORD_TOO_SHORT_CODE
    if (
        UserCreateValidationMessageConstants.PASSWORD_TOO_SIMILAR_TO_ANOTHER_FIELD_MESSAGE
        in message
    ):
        return (
            UserCreateValidationMessageConstants.PASSWORD_TOO_SIMILAR_TO_ANOTHER_FIELD_CODE
        )
    if UserCreateValidationMessageConstants.PASSWORD_TOO_COMMON_MESSAGE in message:
        return UserCreateValidationMessageConstants.PASSWORD_TOO_COMMON_CODE
    if (
        UserCreateValidationMessageConstants.PASSWORD_ENTIRELY_NUMERIC_MESSAGE
        in message
    ):
        return UserCreateValidationMessageConstants.PASSWORD_ENTIRELY_NUMERIC_CODE

    if UserCreateValidationMessageConstants.INVALID_USERNAME_MESSAGE in message:
        return UserCreateValidationMessageConstants.INVALID_USERNAME_CODE

    if UserCreateValidationMessageConstants.USER_ALREADY_EXISTS_MESSAGE in message:
        return UserCreateValidationMessageConstants.USER_ALREADY_EXISTS_CODE

    return UserCreateValidationMessageConstants.GENERIC_VALIDATION_CODE
