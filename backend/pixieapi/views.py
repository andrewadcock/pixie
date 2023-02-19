from rest_framework.permissions import IsAuthenticated
from django.shortcuts import render
from rest_framework import generics
from .serializers import MovieSerializer
from .models import Movie


class ListMovie(generics.ListAPIView):
    permission_classes = (IsAuthenticated,)
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer


class CreateMovie(generics.CreateAPIView):
    permission_classes = (IsAuthenticated,)
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer


class UpdateMovie(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (IsAuthenticated,)
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer
