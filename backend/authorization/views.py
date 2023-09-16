from rest_framework.exceptions import APIException
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView

from .models import User
from .serializers import *
from random import randint

# Create your views here.

def wrap_errors(errors):
    return Response({"errors": [f"{key}:{detail.code}" for key, errors in errors.items() for detail in errors]}, status=400)


class EmailTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


class RegisterView(APIView):
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if not serializer.is_valid():
            return wrap_errors(serializer.errors)
        serializer.save()
        return Response()


class MyselfView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        serializer = MyUserSerializer(request.user)
        return Response(serializer.data)


class CheckUsernameView(APIView):
    permission_classes = (AllowAny,)

    def post(self, request):
        serializer = UsernameSerializer(data=request.data)
        if not serializer.is_valid():
            return wrap_errors(serializer.errors)
        used = User.objects.filter(username=serializer.validated_data.get('username')).exists()
        return Response({"used": used})


class SendCodeView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        if request.user.is_verified:
            return Response({"errors": ["already_verified"]}, status=400)
        
        code = ''.join(str(randint(0, 9)) for _ in range(6))
        # Send email
        request.user.email_code = code
        request.user.save()
        return Response()


class CheckCodeView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        serializer = EmailCodeSerializer(data=request.data)
        if not serializer.is_valid():
            return wrap_errors(serializer.errors)
        code = serializer.validated_data.get('code')
        # Do not check
        request.user.is_verified = True
        request.user.save()
        return Response()


class ChangeNameView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        serializer = NameSerializer(data=request.data)
        if not serializer.is_valid():
            return wrap_errors(serializer.errors)

        name = serializer.validated_data['name']
        request.user.first_name = name
        request.user.save()
        return Response()


class ChangeAvatarView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        serializer = AvatarURLSerializer(data=request.data)
        if not serializer.is_valid():
            return wrap_errors(serializer.errors)
        
        avatarUrl = serializer.validated_data.get('avatarUrl', '')
        request.user.profile.avatarUrl = avatarUrl
        request.user.profile.save()
        return Response()


class ChangeUsernameView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        serializer = UsernameSerializer(data=request.data)
        if not serializer.is_valid():
            return wrap_errors(serializer.errors)

        username = serializer.validated_data.get('username')
        used = User.objects.filter(username=username).exists()
        if used:
            return Response({"errors": ['username:already_used']}, status=400)
        request.user.username = username
        request.user.save()
        return Response()


class ChangePasswordView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        serializer = ChangePasswordSerializer(data=request.data)
        if not serializer.is_valid():
            return wrap_errors(serializer.errors)

        new_password = serializer.validated_data['new_password']
        old_password = serializer.validated_data['old_password']
        if not request.user.check_password(old_password):
            return Response({"errors": ["invalid_old_password"]}, status=400)
        
        request.user.set_password(new_password)
        request.user.save()
        return Response()


class ChangeEmailView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        serializer = ChangeEmailSerializer(data=request.data)
        if not serializer.is_valid():
            return wrap_errors(serializer.errors)
        
        if 'email_code' not in serializer.validated_data:
            # Send code to email
            return Response({"message": "Email code sent."})
        if 'new_email' not in serializer.validated_data:
            return Response({"errors": ["email:blank"]}, status=400)
        
        new_email = serializer.validated_data['new_email']
        # Dont check code
        request.user.email = new_email
        request.user.save()
        return Response()


class PasswordResetView(APIView):
    permission_classes = (AllowAny,)

    def post(self, request):
        serializer = PasswordResetSerializer(data=request.data)
        if not serializer.is_valid():
            return wrap_errors(serializer.errors)

        email = serializer.validated_data['email']
        user = User.objects.filter(email=email).first()
        if 'email_code' not in serializer.validated_data:
            if user is None:
                return Response({"errors": ["user_not_found"]}, status=400)
            # Send code to email
            return Response({"message": "Email code sent."})
        if 'new_password' not in serializer.validated_data:
            return Response({"errors": ["password:blank"]}, status=400)
        
        email_code = serializer.validated_data['email_code']
        new_password = serializer.validated_data['new_password']
        # Dont check code
        user.set_password(new_password)
        user.save()
        return Response()
