# Generated by Django 4.2.4 on 2023-09-08 11:42

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authorization', '0002_user_email_code'),
    ]

    operations = [
        migrations.AddField(
            model_name='userprofile',
            name='dialog_users',
            field=models.ManyToManyField(related_name='+', to=settings.AUTH_USER_MODEL),
        ),
    ]
