from rest_framework import serializers

from apps.accounts.serializers import UserSerializer
from apps.attachments.models import FileAttachment, AudioAttachment
from apps.attachments.serializers import FileAttachmentSerializer, AudioAttachmentSerializer
from apps.chats.models import Chat, ChatMessage


class ChatSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()
    unseen_count = serializers.SerializerMethodField()
    last_message = serializers.SerializerMethodField()

    class Meta:
        model = Chat
        fields = ['id', 'last_message', 'unseen_count', 'user', 'viewed_at', 'created_at']

    def get_user(self, chat):
        user = chat.from_user

        if user.id == self.context['user_id']:
            user = chat.to_user
        return UserSerializer(user).data

    def get_unseen_count(self, chat):
        unseen_count = ChatMessage.objects.filter(
            chat_id=chat.id,
            viewed_at__isnull=True,
            deleted_at__isnull=True
            # excluo o usuario que esta logado e nao retorno os dele
        ).exclude(
            from_user=self.context['user_id']
        ).count()

        return unseen_count

    def get_last_message(self, chat):
        last_message = ChatMessage.objects.filter(
            chat_id=chat.id,
            deleted_at__isnull=True
        ).order_by('-created_at').first()

        if not last_message:
            return None

        return ChatMessageSerializer(last_message).data


class ChatMessageSerializer(serializers.ModelSerializer):
    from_user = serializers.SerializerMethodField()
    attachment = serializers.SerializerMethodField()

    class Meta:
        model = ChatMessage
        fields = ['id', 'body', 'from_user', 'attachment', 'viewed_at', 'created_at']

    def get_from_user(self, chat_message):
        return UserSerializer(chat_message.from_user).data

    def get_attachment(self, chat_message):
        if chat_message.attachment_code == 'FILE':
            file_attachment = FileAttachment.objects.filter(
                id=chat_message.attachment_id
            ).first()

            if not file_attachment:
                return None

            return {
                "file": FileAttachmentSerializer(file_attachment).data
            }

        if chat_message.attachment_code == 'AUDIO':
            audio_attachment = AudioAttachment.objects.filter(
                id=chat_message.attachment_id
            )

            if not audio_attachment:
                return None

            return {
                "file": AudioAttachmentSerializer(audio_attachment).data
            }
