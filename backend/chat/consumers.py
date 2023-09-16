from asgiref.sync import async_to_sync
from channels.generic.websocket import JsonWebsocketConsumer
from django.core.exceptions import ValidationError
from authorization.validators import UsernameValidator
from authorization.models import User
from .actions import send_message

class MessagingConsumer(JsonWebsocketConsumer):
    username_validator = UsernameValidator()

    def connect(self):
        self.accept()
        if self.scope['user'].is_anonymous:
            self.close(code=4001)
            return
        
        user = self.scope['user']
        if not user.is_verified:
            self.close(code=4002)
            return
        group_name = f'user-{user.username}'
        async_to_sync(self.channel_layer.group_add)(group_name, self.channel_name)
        self.groups.append(group_name)
    
    def error(self, error):
        self.send_json(content={'error': error})

    def receive_json(self, content):
        if 'to_user' not in content:
            self.error('no_username')
            return
        if 'text' not in content:
            self.error('no_text')
            return
        to_username = content['to_user'].strip()
        text = content['text'].strip()
        if not to_username:
            self.error('username_empty')
            return
        if not text:
            self.error('text_empty')
            return
        try:
            self.username_validator(to_username)
        except ValidationError:
            self.error('invalid_username')
            return
        
        to_user = User.objects.filter(username__iexact=to_username).first()
        if to_user is None:
            self.error('user_not_found')
            return
        
        try:
            send_message(from_user=self.scope["user"], to_user=to_user, text=text)
            self.send_json(content={'success': True})
        except Exception as e:
            self.error(str(e))


    def chat_message(self, event):
        # Handles the "chat.message" event when it's sent to us.
        self.send_json(content={
            "type": "message",
            "from_user": event["from_user"],
            "text": event["text"],
            "date": event["date"]
        })
