from django.urls import path

from apps.accounts.views import SignInView, SignUpView, UserView

urlpatterns = [
    path('sign-in', SignInView.as_view()),
    path('sign-up', SignUpView.as_view()),
    path('me', UserView.as_view())
]
