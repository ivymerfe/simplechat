# Generated by Django 4.2.4 on 2023-09-06 14:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authorization', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='email_code',
            field=models.CharField(blank=True, max_length=6),
        ),
    ]
