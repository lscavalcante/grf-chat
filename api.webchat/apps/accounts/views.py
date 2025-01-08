from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.exceptions import AuthenticationFailed

from django.core.files.storage import FileSystemStorage
from django.utils.timezone import now

from rest_framework_simplejwt.tokens import RefreshToken

from apps.accounts.auth import Authentication
from apps.accounts.serializers import UserSerializer
from apps.accounts.models import User
from core import settings

from core.utils.exceptions import ValidationError

import uuid


class SignInView(APIView, Authentication):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get('email', '')
        password = request.data.get('password', '')

        sign_in = self.sign_in(email, password)

        if not sign_in:
            raise AuthenticationFailed

        user = UserSerializer(sign_in).data
        access_token = RefreshToken.for_user(sign_in).access_token

        return Response({
            'user': user,
            'access_token': str(access_token)
        })


class SignUpView(APIView, Authentication):
    permission_classes = [AllowAny]

    def post(self, request):
        name = request.data.get('name', '')
        email = request.data.get('email', '')
        password = request.data.get('password', '')

        sign_up = self.sign_up(name, email, password)

        if not sign_up:
            raise AuthenticationFailed

        user = UserSerializer(sign_up).data
        access_token = RefreshToken.for_user(sign_up).access_token

        return Response({
            'user': user,
            'access_token': str(access_token)
        })


class UserView(APIView):
    def get(self, request):
        # update last_access
        User.objects.filter(id=request.user.id).update(last_access=now())

        user = UserSerializer(request.user).data

        return Response({
            "user": user
        })

    def put(self, request):
        name = request.data.get('name')
        email = request.data.get('email')
        password = request.data.get('password')
        avatar = request.FILES.get('avatar')

        # initialize storage
        storage = FileSystemStorage(
            settings.MEDIA_ROOT / "avatars",
            settings.MEDIA_URL + "avatars"
        )

        if avatar:
            content_type = avatar.content_type
            extension = avatar.name.split('.')[-1]

            # Validate avatar
            if not content_type == 'image/png' and not content_type == 'image/jpeg':
                raise ValidationError("You must use a png or jpeg image")

            # Save new avatar
            file = storage.save(f'{uuid.uuid4()}.{extension}', avatar)
            avatar = storage.url(file)

        serializer = UserSerializer(request.user, data={
            "name": name,
            "email": email,
            "avatar": avatar or request.user.avatar
        })

        if not serializer.is_valid():
            # delete uploaded file
            if avatar:
                storage.delete(avatar.split('/')[-1])

            error = list(serializer.errors.values())[0][0]

            raise ValidationError(error)

        if avatar and request.user.avatar != '/media/avatars/default-avatar.png':
            storage.delete(request.user.avatar.split('/')[-1])

        # update password
        if password:
            request.user.set_password(password)

        serializer.save()

        return Response({
            'user': serializer.data
        })
