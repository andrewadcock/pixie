from django.shortcuts import render
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from django.contrib.auth.models import User
from .serializers import UserSerializer, RegisterUserSerializer, ChangePasswordSerializer
from django.contrib.auth.hashers import check_password


class UserViewSet(generics.ListAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return User.objects.filter(username=self.request.user)


class RegisterUserView(generics.CreateAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = RegisterUserSerializer


class UserRetrieveUpdateAPIView(generics.RetrieveUpdateAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return User.objects.filter(username=self.request.user)

    def update(self, request, *args, **kwargs):
        serializer = self.serializer_class(request.user, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)


class ChangePasswordView(generics.UpdateAPIView):
    serializer_class = ChangePasswordSerializer
    permission_classes = [permissions.IsAuthenticated, ]

    def get_object(self, queryset=None):
        obj = self.request.user
        return obj

    def update(self, request, *args, **kwargs):
        self.object = self.get_object
        serializer = self.get_serializer(data=request.data)
        user = request.user

        if user is None:
            return Response({"response": "No User exist"})

        if serializer.is_valid():

            if not check_password(serializer.data.get("old_password"), user.password):
                return Response(
                    {"old_password": ["Wrong Password."]},
                    status=status.HTTP_400_BAD_REQUEST
                )

            user.set_password(serializer.data.get("new_password"))
            user.save()

            response = {
                'status': 'success',
                'code': status.HTTP_200_OK,
                'message': 'Password updated successfully.',
                'data': []
            }

            return Response(response)

        return Response(serializer.error, status=status.HTTP_400_BAD_REQUEST)
