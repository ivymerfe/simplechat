from django.contrib.auth.models import AbstractUser
from django.db import models
from django.db.models.signals import post_save

# Create your models here.
class User(AbstractUser):
    username = models.CharField(max_length=16, unique=True)
    is_verified = models.BooleanField(default=False)
    email_code = models.CharField(max_length=6, blank=True)


class UserProfile(models.Model):
    user = models.OneToOneField(User, related_name='profile', on_delete=models.CASCADE)
    avatarUrl = models.URLField()


def create_user_profile(sender, instance, created, **kwargs):
    if created:
        UserProfile.objects.create(user=instance)


post_save.connect(create_user_profile, sender=User)
