from django.db import models

from authorization.models import User

# Create your models here.


class Message(models.Model):
    from_user = models.ForeignKey(User, related_name='+', on_delete=models.CASCADE)
    to_user = models.ForeignKey(User, related_name='+', on_delete=models.CASCADE)
    date = models.DateTimeField(auto_now=True)
    text = models.TextField()


class DialogPreview:
    def __init__(self, user, last_message):
        self.user = user
        self.last_message = last_message


class Chat:
    def __init__(self, user, messages) -> None:
        self.user = user
        self.messages = messages
