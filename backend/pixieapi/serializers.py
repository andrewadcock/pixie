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
