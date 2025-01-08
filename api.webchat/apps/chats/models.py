from django.db import models

from apps.accounts.models import User


class Chat(models.Model):
    from_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='chats_from_user')
    to_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='chats_to_user')
    viewed_at = models.DateTimeField(null=True)
    deleted_at = models.DateTimeField(null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'chats'


class ChatMessage(models.Model):
    body = models.TextField()
    attachment_code = models.CharField(
        choices=[('FILE', 'FILE'), ('AUDIO', 'AUDIO')],
        max_length=10,
        null=True
    )
    attachment_id = models.IntegerField(null=True)
    viewed_at = models.DateTimeField(null=True)
    deleted_at = models.DateTimeField(null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    chat = models.ForeignKey(Chat, on_delete=models.CASCADE)
    from_user = models.ForeignKey(User, on_delete=models.CASCADE)

    class Meta:
        db_table = 'chat_messages'
        ordering = ['-created_at']
