from rest_framework.exceptions import APIException
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

def generate_response(result=None, errors=None):
    response = {"success": errors is None}
    if result:
        response['result'] = result
    if errors:
        response['errors'] = {field: list(error.code for error in field_errors) for (field, field_errors) in errors.items()}
    return Response(response, status=(400 if errors is not None else 200))


class EmailTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


class RegisterView(CreateAPIView):
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer

    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return generate_response()
        return generate_response(errors=serializer.errors)


class MyselfView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        serializer = MyUserSerializer(request.user)
        return Response(serializer.data)


class CheckUsernameView(APIView):
    permission_classes = (AllowAny,)

    def get(self, request):
        serializer = UsernameSerializer(data=request.data)
        if serializer.is_valid():
            used = User.objects.filter(username=serializer.validated_data.get('username')).exists()
            return generate_response({"used": used})
        return generate_response(errors=serializer.errors)


class SendCodeView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        code = ''.join(str(randint(0, 9)) for _ in range(6))
        # Send email
        request.user.email_code = code
        request.user.save()
        return generate_response()


class CheckCodeView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        serializer = EmailCodeSerializer(data=request.data)
        if serializer.is_valid():
            code = serializer.validated_data.get('code')
            # Do not check
            request.user.is_active = True
            request.user.save()
            return generate_response()
        return generate_response(errors=serializer.errors)


class UpdateUsernameView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        serializer = UsernameSerializer(data=request.data)
        if serializer.is_valid():
            username = serializer.validated_data.get('username')
            used = User.objects.filter(username=username).exists()
            if used:
                return generate_response(errors=[APIException(code='already_used')])
            request.user.username = username
            request.user.save()
            return generate_response()
        return generate_response(errors=serializer.errors)
