from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token
from .views import UpdateMovie, ListMovie, CreateMovie


urlpatterns = [
    path('', ListMovie.as_view()),
    path('<int:pk>/', UpdateMovie.as_view()),
    path('create', CreateMovie.as_view()),

    path('api-token-auth/', obtain_auth_token, name='api_token_auth'),
]
