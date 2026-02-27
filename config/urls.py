from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from .views import home, GoogleLogin
from pages.views import create_admin
create_admin()

urlpatterns = [
    path('', home),
    path('admin/', admin.site.urls),

    # Authentication
    path('api/auth/', include('dj_rest_auth.urls')),
    path('api/auth/registration/', include('dj_rest_auth.registration.urls')),
    path('api/auth/google/', GoogleLogin.as_view(), name='google_login'),
    path('accounts/', include('allauth.urls')),

    # Other Apps
    path('api/', include('products.urls')),
    path('api/', include('pages.urls')),
    path('api/payments/', include('payments.urls')),  # Razorpay here
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)