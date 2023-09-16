from rest_framework import serializers

from authorization.serializers import OtherUserSerializer
from authorization.validators import UsernameValidator
from .models import Message


class MessageSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='from_user.username', read_only=True)

    class Meta:
        model = Message
        fields = ('username', 'date', 'text')


class DialogPreviewSerializer(serializers.Serializer):
    user = OtherUserSerializer(read_only=True)
    last_message = MessageSerializer(read_only=True)


class ChatSerializer(serializers.Serializer):
    user = OtherUserSerializer(read_only=True)
    messages = MessageSerializer(many=True, read_only=True)


class SendMessageSerializer(serializers.Serializer):
    to_user = serializers.CharField(validators=[UsernameValidator()])
    text = serializers.CharField()
