from django.http import HttpResponse
from dj_rest_auth.registration.views import SocialLoginView
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter


def home(request):
    return HttpResponse("Backend is running")


class GoogleLogin(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter