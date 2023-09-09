from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
from chat.models import Message


channel_layer = get_channel_layer()


def send_message(from_user, to_user, text):
    user_profile = from_user.profile
    to_user_profile = to_user.profile
    if not to_user_profile.dialog_users.filter(pk=from_user.pk).exists():
        to_user_profile.dialog_users.add(from_user)
        to_user_profile.save()
    if not user_profile.dialog_users.filter(pk=to_user.pk).exists():
        user_profile.dialog_users.add(to_user)
        user_profile.save()
    
    message = Message.objects.create(from_user=from_user, to_user=to_user, text=text)

    # Signal websockets
    async_to_sync(channel_layer.group_send)(
        f"user-{to_user.username}",
        {
            "type": "chat.message",
            "text": text,
            "from_user": from_user.username,
            "date": str(message.date)
        },
    )
