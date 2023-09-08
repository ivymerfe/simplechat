from django.urls import path
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)
from .views import *

urlpatterns = [
    path('token/', EmailTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', RegisterView.as_view(), name='register'),
    path('me/', MyselfView.as_view(), name='myself'),
    path('check_username/', CheckUsernameView.as_view(), name='check_username'),
    path('send_code/', SendCodeView.as_view(), name='send_code'),
    path('check_code/', CheckCodeView.as_view(), name='check_code'),
    path('change_name/', ChangeNameView.as_view(), name='change_name'),
    path('change_avatar/', ChangeAvatarView.as_view(), name='change_avatar'),
    path('change_username/', ChangeUsernameView.as_view(), name='change_username'),
    path('change_password/', ChangePasswordView.as_view(), name='change_password'),
    path('change_email/', ChangeEmailView.as_view(), name='change_email'),
    path('password_reset/', PasswordResetView.as_view(), name='password_reset')
]
