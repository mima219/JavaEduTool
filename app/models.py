"""
    author: Michaela Jalakšová
    date: May 2024
"""

from django.db import models
from django.contrib.auth.models import User
from PIL import Image


# Create your models here.
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    image = models.ImageField(default='default.jpg', upload_to='profile_pics')

    def __str__(self):
        return f'{self.user.username} Profile'


class CustomUser(User):
    class Meta:
        proxy = True

    def save(self, *args, **kwargs):
        created = not self.pk
        super().save(*args, **kwargs)
        if created:
            Profile.objects.create(user=self)


class TestRecord(models.Model):
    title = models.CharField(max_length=100)
    date_completed = models.DateField(auto_now_add=True)
    score = models.IntegerField()
    author = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.title
