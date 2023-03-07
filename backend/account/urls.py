from django.urls import path
from rest_framework_simplejwt import views as jwt_views
from .views import UserViewSet, RegisterUserView, UserRetrieveUpdateAPIView


urlpatterns = [
    path('user/', UserViewSet.as_view(), name='user'),
    path('register/', RegisterUserView.as_view(), name='register'),
    path('update-profile/', UserRetrieveUpdateAPIView.as_view(), name='updateProfile'),
    path('token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
]
