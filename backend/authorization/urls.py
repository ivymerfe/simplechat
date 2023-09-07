from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from .views import CheckCodeView, CheckUsernameView, EmailTokenObtainPairView, UpdateUsernameView, MyselfView, RegisterView, SendCodeView

urlpatterns = [
    path('token/', EmailTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', RegisterView.as_view(), name='register'),
    path('me/', MyselfView.as_view(), name='myself'),
    path('check_username/', CheckUsernameView.as_view(), name='check_username'),
    path('send_code/', SendCodeView.as_view(), name='send_code'),
    path('check_code/', CheckCodeView.as_view(), name='check_code'),
    path('update_username/', UpdateUsernameView.as_view(), name='update_username')
]
