from django.urls import path
from .views import *

urlpatterns = [
    path('find/', FindUserView.as_view(), name='find_user'),
    path('dialogs/', DialogsView.as_view(), name='dialogs'),
    path('user/', ChatView.as_view(), name='chat'),
    path('send/', SendMessageView.as_view(), name='send_message')
]
