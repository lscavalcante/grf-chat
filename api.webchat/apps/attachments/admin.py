from django.contrib import admin

from apps.attachments.models import FileAttachment, AudioAttachment

admin.site.register(FileAttachment)
admin.site.register(AudioAttachment)
