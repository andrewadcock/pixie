from django.urls import path
from .views import UpdateMovie, ListMovie, CreateMovie


urlpatterns = [
    path('', ListMovie.as_view()),
    path('<int:pk>/', UpdateMovie.as_view()),
    path('create', CreateMovie.as_view()),
]
