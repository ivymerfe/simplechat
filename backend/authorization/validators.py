from django.core import validators
from django.utils.deconstruct import deconstructible
from django.utils.translation import gettext_lazy


@deconstructible
class EmailCodeValidator(validators.RegexValidator):
    regex = r'^[0-9]{6}$'
    message = gettext_lazy(
        'Invalid code'
    )
    code='invalid_code'
    flags = 0


@deconstructible
class UsernameValidator(validators.RegexValidator):
    """
        Validator for user identifier
        4-16 symbols
        only ascii lowercase, numbers and underscore
        must start with a letter
    """
    regex = r'^[a-z][a-z0-9_]{3,15}$'
    message = gettext_lazy(
        'Invalid identifier'
    )
    code = 'invalid_id'
    flags = 0
