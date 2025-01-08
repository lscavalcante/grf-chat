from django.contrib import admin

from apps.chats.models import Chat, ChatMessage

admin.site.register(Chat)
admin.site.register(ChatMessage)
