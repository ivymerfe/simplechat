from django.urls import path
from chat.consumers import MessagingConsumer


urlpatterns = [
    path('api/v1/connect/', MessagingConsumer.as_asgi(), name='ws_connect')
]
