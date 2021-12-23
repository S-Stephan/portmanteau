from django.shortcuts import render
from .serializers import *
from .models import *
from rest_framework.viewsets import ModelViewSet

class CapsuleViewSet(ModelViewSet):
  queryset = Capsule.objects.all()
  serializer_class = CapsuleSerializer

class TypeViewSet(ModelViewSet):
  queryset = Type.objects.all()
  serializer_class = TypeSerializer

class WeatherViewSet(ModelViewSet):
  queryset = Weather.objects.all()
  serializer_class = WeatherSerializer  

class ItemViewSet(ModelViewSet):
  queryset = Item.objects.all()
  serializer_class = ItemSerializer

class UserViewSet(ModelViewSet):
  queryset = User.objects.all()
  serializer_class = UserSerializer



