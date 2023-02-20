from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Movie, Genre


class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = ('id', 'title', 'genres', 'viewed', 'viewedTime')


class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        field = ('id', 'name')


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email']
