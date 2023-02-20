from django.contrib.auth.models import User
from django.shortcuts import render
from rest_framework import generics, permissions, viewsets
from .serializers import MovieSerializer, UserSerializer
from .models import Movie


class ListMovie(generics.ListAPIView):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer


class CreateMovie(generics.CreateAPIView):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer


class UpdateMovie(generics.RetrieveUpdateDestroyAPIView):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer


class UserViewSet(generics.ListAPIView):
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]
