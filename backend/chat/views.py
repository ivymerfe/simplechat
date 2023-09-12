from asgiref.sync import async_to_sync
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from authorization.permissions import IsVerified
from authorization.models import User
from authorization.serializers import OtherUserSerializer
from .models import Chat, DialogPreview, Message
from .serializers import *
from .actions import send_message

# Create your views here.


class FindUserView(APIView):
    permission_classes = (IsAuthenticated, IsVerified)

    def post(self, request):
        name_or_username = request.data.get('query', '').strip()
        if not name_or_username:
            return Response({'detail': 'empty_query'}, status=400)
        if (name_or_username.startswith('@')):
            username = name_or_username[1:].strip()
            if not username:
                return Response([])
            users = User.objects.filter(username__startswith=username)[:4]
        else:
            users = User.objects.filter(first_name__startswith=name_or_username)[:4]
        
        if not users:
            return Response([])
        return Response(OtherUserSerializer(users, many=True).data)


class DialogsView(APIView):
    permission_classes = (IsAuthenticated, IsVerified)

    def get(self, request):
        user = request.user
        dialog_users = user.profile.dialog_users.all()
        dialogs = []
        for duser in dialog_users:
            last_message = (Message.objects.filter(from_user=duser, to_user=user) | Message.objects.filter(from_user=user, to_user=duser)).order_by('date').last()
            dialogs.append(DialogPreview(duser, last_message))
        
        return Response(DialogPreviewSerializer(dialogs, many=True).data)


class ChatView(APIView):
    permission_classes = (IsAuthenticated, IsVerified)

    def get(self, request):
        user = request.user
        friend_username = request.data.get('user', None)
        if not friend_username:
            return Response({'detail': 'invalid_username'}, status=400)
        friend = User.objects.filter(username__iexact=friend_username).first()
        if friend is None:
            return Response({'detail': 'user_not_found'}, status=400)
        messages = (Message.objects.filter(from_user=user, to_user=friend) | Message.objects.filter(from_user=friend, to_user=user)).order_by('date')
        chat = Chat(friend, messages)
        return Response(ChatSerializer(chat).data)


class SendMessageView(APIView):
    permission_classes = (IsAuthenticated, IsVerified)

    def post(self, request):
        serializer = SendMessageSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        to_username = serializer.validated_data['to_user']
        text = serializer.validated_data['text'].strip()
        to_user = User.objects.filter(username__iexact=to_username).first()
        if to_user is None:
            return Response({'detail': 'user_not_found'}, status=400)
        
        send_message(from_user=request.user, to_user=to_user, text=text)
        return Response({'success': True})
