from django.db import models
from django.utils import timezone


class Genre(models.Model):
    name = models.CharField(max_length=120, blank=False)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name


class Movie(models.Model):
    title = models.CharField(max_length=120, blank=False)
    genres = models.ManyToManyField(Genre)
    added = models.DateTimeField(default=timezone.now, blank=False)
    viewed = models.BooleanField(default=False)
    viewedTime = models.DateTimeField(blank=True, null=True)

    class Meta:
        ordering = ['added']

    def __str__(self):
        return self.title
