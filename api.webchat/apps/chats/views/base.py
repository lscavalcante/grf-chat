from rest_framework.views import APIView
from django.db.models import Q
from django.utils.timezone import now

from apps.accounts.models import User

from apps.chats.models import Chat, ChatMessage
from apps.chats.utils.exceptions import UserNotFound, ChatNotFound
from apps.chats.serializers import ChatSerializer


class BaseView(APIView):
    # Get User by any field
    def get_user(self, raise_exception=True, **kwargs) -> User | None:
        user = User.objects.filter(**kwargs).first()

        if not user and raise_exception:
            raise UserNotFound

        return user

    # checking if chat already exist for user_id and to_user
    def has_existing_chat(self, user_id, to_user_id) -> Chat | None:
        chat = Chat.objects.filter(
            (Q(from_user_id=user_id) & Q(to_user_id=to_user_id)) |
            (Q(from_user_id=to_user_id) & Q(to_user_id=user_id)),
            deleted_at__isnull=True
        ).first()

        if chat:
            return ChatSerializer(chat, context={'user_id': user_id}).data

    # checking if chat belongs to user or not
    def chat_belongs_to_user(self, chat_id, user_id) -> Chat | None:
        chat = Chat.objects.filter(
            Q(from_user_id=user_id) | Q(to_user_id=user_id),
            id=chat_id,
            deleted_at__isnull=True
        ).first()

        if not chat:
            raise ChatNotFound

        return chat

    # mark message that have been received as seen
    def mark_message_as_seen(self, chat_id, user_id) -> None:
        ChatMessage.objects.filter(
            chat_id=chat_id,
            viewed_at__isnull=True,
            deleted_at__isnull=True
        ).exclude(
            from_user_id=user_id
        ).update(
            viewed_at=now()
        )
