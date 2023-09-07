from django.contrib.auth.backends import ModelBackend, UserModel
from django.core.exceptions import MultipleObjectsReturned
from django.db.models import Q

from .models import User

class EmailBackend(ModelBackend):
    def authenticate(self, request, email=None, password=None, **kwargs):
        try: #to allow authentication through phone number or any other field, modify the below statement
            user = UserModel.objects.get(Q(username__iexact=email) | Q(email__iexact=email))
        except UserModel.DoesNotExist:
            UserModel().set_password(password)
        except MultipleObjectsReturned:
            return User.objects.filter(email=email).order_by('id').first()
        else:
            if user.check_password(password) and self.user_can_authenticate(user):
                return user

    def get_user(self, user_id):
        try:
            user = UserModel.objects.get(pk=user_id)
        except UserModel.DoesNotExist:
            return None

        return user if self.user_can_authenticate(user) else None
