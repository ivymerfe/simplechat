from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from rest_framework_simplejwt.tokens import RefreshToken

from .validators import EmailCodeValidator, UsernameValidator
from .models import User, UserProfile
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainSerializer

class EmailTokenObtainSerializer(TokenObtainSerializer):
    username_field = User.EMAIL_FIELD


class CustomTokenObtainPairSerializer(EmailTokenObtainSerializer):
    @classmethod
    def get_token(cls, user):
        return RefreshToken.for_user(user)

    def validate(self, attrs):
        data = super().validate(attrs)

        refresh = self.get_token(self.user)

        data["refresh"] = str(refresh)
        data["access"] = str(refresh.access_token)

        return data


class RegisterSerializer(serializers.ModelSerializer):
    username = serializers.CharField(required=True, validators=[UsernameValidator(), UniqueValidator(queryset=User.objects.all(), message='Username already in use')])
    email = serializers.EmailField(required=True, validators=[UniqueValidator(queryset=User.objects.all(), message='Email already in use')])
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    name = serializers.CharField(required=True, max_length=32)

    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'name')

    def create(self, validated_data):
        user = User.objects.create(**validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user


class MyUserSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source='first_name')
    username = serializers.CharField()
    avatarUrl = serializers.SerializerMethodField('get_avatar_url')

    class Meta:
        model = User
        fields = ('name', 'username', 'email', 'avatarUrl')

    def get_avatar_url(self, user):
        return user.profile.avatarUrl


class OtherUserSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source='first_name')
    username = serializers.CharField()
    avatarUrl = serializers.SerializerMethodField('get_avatar_url')

    class Meta:
        model = User
        fields = ('name', 'username', 'avatarUrl')

    def get_avatar_url(self, user):
        return user.profile.avatarUrl


class UsernameSerializer(serializers.Serializer):
    id = serializers.CharField(validators=[UsernameValidator()])


class EmailCodeSerializer(serializers.Serializer):
    code = serializers.CharField(validators=[EmailCodeValidator()])
