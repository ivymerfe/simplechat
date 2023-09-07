from rest_framework.exceptions import APIException, ErrorDetail
from rest_framework.generics import CreateAPIView
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView

from .models import User
from .serializers import *
from random import randint

# Create your views here.

class EmailTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


class RegisterView(CreateAPIView):
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer

    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({"success": True})


class MyselfView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        serializer = MyUserSerializer(request.user)
        return Response(serializer.data)


class CheckUsernameView(APIView):
    permission_classes = (AllowAny,)

    def get(self, request):
        serializer = UsernameSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        used = User.objects.filter(username=serializer.validated_data.get('username')).exists()
        return Response({"used": used})


class SendCodeView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        code = ''.join(str(randint(0, 9)) for _ in range(6))
        # Send email
        request.user.email_code = code
        request.user.save()
        return Response({"success": True})


class CheckCodeView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        serializer = EmailCodeSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        code = serializer.validated_data.get('code')
        # Do not check
        request.user.is_active = True
        request.user.save()
        return Response({"success": True})


class ChangeNameView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        serializer = NameSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        name = serializer.validated_data['name']
        request.user.first_name = name
        request.user.save()
        return Response({"success": True})


class ChangeAvatarView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        serializer = AvatarURLSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        avatarUrl = serializer.validated_data['avatarUrl']
        request.user.profile.avatarUrl = avatarUrl
        request.user.profile.save()
        return Response({"success": True})


class ChangeUsernameView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        serializer = UsernameSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        username = serializer.validated_data.get('username')
        used = User.objects.filter(username=username).exists()
        if used:
            return Response({"username": ['already_used']}, status=400)
        request.user.username = username
        request.user.save()
        return Response({"success": True})


class ChangePasswordView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        serializer = ChangePasswordSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        new_password = serializer.validated_data['new_password']
        old_password = serializer.validated_data['old_password']
        if not request.user.check_password(old_password):
            raise APIException("Old password is not correct", code="invalid_old_password")
        
        request.user.set_password(new_password)
        request.user.save()
        return Response({"success": True})


class ChangeEmailView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        serializer = ChangeEmailSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        if 'email_code' not in serializer.validated_data:
            # Send code to email
            return Response({"success": True, "message": "Email code sent."})
        
        new_email = serializer.validated_data['new_email']
        # Dont check code
        request.user.email = new_email
        request.user.save()
        return Response({"success": True})


class PasswordResetView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        serializer = PasswordResetSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        email = serializer.validated_data['email']
        user = User.objects.filter(email=email).first()
        if 'email_code' not in serializer.validated_data:
            if user is None:
                raise APIException("No user associated with this email", "user_not_found")
            # Send code to email
            return Response({"success": True, "message": "Email code sent."})
        
        email_code = serializer.validated_data['email_code']
        new_password = serializer.validated_data['new_password']
        # Dont check code
        user.set_password(new_password)
        user.save()
        return Response({"success": True})

