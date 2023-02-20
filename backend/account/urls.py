from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token
from .views import UserViewSet


urlpatterns = [
    path('api-token-auth/', obtain_auth_token, name='api_token_auth'),
    path('user/', UserViewSet.as_view(), name='user'),
]
